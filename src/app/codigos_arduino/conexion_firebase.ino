#include <WiFi.h>
#include <FirebaseESP8266.h>
#include <Adafruit_Fingerprint.h>
#include <SoftwareSerial.h>

// Configuración WiFi
#define WIFI_SSID "Ares"
#define WIFI_PASSWORD "ndoei291s"

// Configuración Firebase
#define FIREBASE_HOST "https://registrohuellas-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH "5aec62cd6fba0d45fcb9e4ccc21579203625a56b"

// Configuración de huella digital
SoftwareSerial mySerial(2, 3);
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);
FirebaseData firebaseData;
WiFiClient client;

void setup() {
    Serial.begin(115200);
    mySerial.begin(57600);
    finger.begin(57600);

    if (finger.verifyPassword()) {
        Serial.println("Sensor de huella detectado.");
    } else {
        Serial.println("No se detectó el sensor.");
        while (1);
    }

    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Conectando a WiFi...");
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\nConectado a WiFi.");

    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
    Firebase.reconnectWiFi(true);
}

void loop() {
    Serial.println("Coloca tu dedo en el sensor...");
    int id = getFingerprintID();
    if (id > 0) {
        Serial.print("Huella detectada, ID: ");
        Serial.println(id);

        String path = "/personas/" + String(id);
        if (Firebase.setString(firebaseData, path, "Huella registrada")) {
            Serial.println("Huella enviada a Firebase.");
        } else {
            Serial.println("Error al enviar huella.");
        }
    }
    delay(2000);
}

int getFingerprintID() {
    uint8_t p = finger.getImage();
    if (p != FINGERPRINT_OK) return -1;

    p = finger.image2Tz();
    if (p != FINGERPRINT_OK) return -1;

    p = finger.fingerFastSearch();
    if (p != FINGERPRINT_OK) return -1;

    return finger.fingerID;
}
