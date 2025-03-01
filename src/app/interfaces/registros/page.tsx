//interfas para registrar usuarios

import { useState } from "react";
import { db, collection, addDoc } from "../../../firebaseConfig"; // Ajusta la ruta si es necesario

const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [huella, setHuella] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "usuarios"), {
        nombre,
        correo,
        huella,
      });
      alert("Datos registrados correctamente");
      setNombre("");
      setCorreo("");
      setHuella(null);
    } catch (error) {
      console.error("Error al registrar: ", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-black">
      <form className="bg-gray-900 p-8 rounded-lg shadow-2xl w-96 border border-blue-500" onSubmit={handleSubmit}>
        <h2 className="text-blue-400 text-2xl font-bold mb-4 text-center">Registro de Huellas</h2>
        <label className="block text-white mb-2">Nombre:</label>
        <input
          type="text"
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <label className="block text-white mt-4 mb-2">Correo:</label>
        <input
          type="email"
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <label className="block text-white mt-4 mb-2">Huella:</label>
        <button
          type="button"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mt-2 transition transform hover:scale-105 shadow-md"
          onClick={() => setHuella("huella_capturada")}
        >
          Capturar Huella
        </button>
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded mt-4 transition transform hover:scale-105 shadow-md"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default Formulario;
