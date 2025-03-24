import React from "react";
import { db } from "@/src/services/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

interface BotonHuellasProps {
  userID: string;
  huellaCampo: "huella1" | "huella2";
}

const BotonHuellas: React.FC<BotonHuellasProps> = ({ userID, huellaCampo }) => {
  const registrarHuella = async () => {
    try {
      await setDoc(doc(db, "huella_requests", `${userID}_${huellaCampo}`), {
        huella_request: `${userID}_${huellaCampo}`,
      });
      alert("Coloca tu dedo en el lector");
    } catch (error) {
      console.error("Error al registrar la solicitud:", error);
    }
  };

  return <button onClick={registrarHuella}>Registrar Huella</button>;
};

export default BotonHuellas;
