"use client";
import React, { useState, useEffect } from "react";
import styles from "@/src/interfaces/RegistroU.module.css";

interface User {
  id: string;
  nombre: string;
  //apellido: string;
  matricula: string;
  huella1: string;
  huella2: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: Omit<User, "id"> | User) => void; // Permite guardar sin ID para nuevos usuarios
  user?: User | null;
}

const NewUserModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSave,
  user,
}) => {
  const [formData, setFormData] = useState<Omit<User, "id">>({
    nombre: "",
    //apellido: "",
    matricula: "",
    huella1: "",
    huella2: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre,
        //apellido: user.apellido,
        matricula: user.matricula,
        huella1: user.huella1,
        huella2: user.huella2,
      });
    } else {
      setFormData({
        nombre: "",
        /* apellido: ""*/ matricula: "",
        huella1: "",
        huella2: "",
      });
    }
  }, [user, isOpen]); // Se ejecutará cada vez que el modal se abra o el usuario cambie

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!formData.nombre || /*!formData.apellido ||*/ !formData.matricula) {
      alert("Por favor, llena todos los campos");
      return;
    }

    if (user) {
      // Si estamos editando, enviamos la ID del usuario
      onSave({ ...formData, id: user.id });
    } else {
      // Si es un nuevo usuario, no enviamos ID (Firestore generará una nueva)
      onSave(formData);
    }

    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>{user ? "Editar Usuario" : "Registrar Nuevo Usuario"}</h2>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          className={styles.input}
        />
        {/* 
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          className={styles.input}
        />*/}

        <input
          type="text"
          name="matricula"
          placeholder="Matrícula"
          value={formData.matricula}
          onChange={handleChange}
          className={styles.input}
        />
        <input type="checkbox" name="huella1" value={formData.huella1} />
        <button onClick={handleSave} className={styles.button}>
          Guardar
        </button>
        <button onClick={onClose} className={styles.cancelButton}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default NewUserModal;
