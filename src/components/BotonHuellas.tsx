import React, { useEffect, useState } from "react";
import { db } from "@/src/services/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import styles from "@/src/interfaces/RegistroU.module.css";
interface BotonHuellasProps {
  userID: string;
  huellaCampo: "huella1" | "huella2";
}

const BotonHuellas: React.FC<BotonHuellasProps> = ({ userID, huellaCampo }) => {
  const [huellaRegistrada, setHuellaRegistrada] = useState<boolean | null>(
    null
  );
  const [mensaje, setMensaje] = useState<string>("");

  useEffect(() => {
    const verificarHuella = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", userID));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setHuellaRegistrada(!!userData[huellaCampo]);
        } else {
          setHuellaRegistrada(false);
        }
      } catch (error) {
        console.error("Error al verificar la huella:", error);
        setHuellaRegistrada(false);
      }
    };

    verificarHuella();
  }, [userID, huellaCampo]);

  const registrarHuella = async () => {
    try {
      setMensaje("Coloca tu dedo en el sensor...");

      const response = await fetch("http://192.168.1.28/obtenerHuella");
      const result = await response.json();

      if (result.status === "success") {
        const userDocRef = doc(db, "users", userID);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          await setDoc(userDocRef, { [huellaCampo]: result.huella });
        } else {
          await updateDoc(userDocRef, { [huellaCampo]: result.huella });
        }

        setHuellaRegistrada(true);
        setMensaje("✅ Huella registrada con éxito");
      } else {
        setMensaje("❌ Error al registrar la huella");
      }
    } catch (error) {
      console.error("Error al registrar la huella:", error);
      setMensaje("❌ Error al registrar la huella");
    }
  };

  return (
    <div>
      <button onClick={registrarHuella} className={styles.registroHuellas}>
        {huellaRegistrada ? "Actualizar Huella" : "Registrar Huella"}
      </button>
      <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
        {huellaRegistrada ? "✔ Huella registrada" : "❌ Sin huella"}
      </span>
      {mensaje && (
        <div style={{ marginTop: "10px", fontWeight: "bold" }}>{mensaje}</div>
      )}
    </div>
  );
};

export default BotonHuellas;
