#include <Adafruit_Fingerprint.h>
#include <SoftwareSerial.h>

SoftwareSerial mySerial(2, 3);
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);

void setup() {
    Serial.begin(9600);
    finger.begin(57600);
    if (finger.verifyPassword()) {
        Serial.println("Sensor de huella detectado.");
    } else {
        Serial.println("No se detectó el sensor.");
        while (1);
    }
}

void loop() {
    Serial.println("Coloca tu dedo en el sensor...");
    int id = getFingerprintID();
    if (id > 0) {
        Serial.print("Huella detectada, ID: ");
        Serial.println(id);
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
