"use client";
import React, { useState, useEffect } from "react";
import styles from "@/src/interfaces/RegistroU.module.css";

interface User {
  id: string;
  nombre: string;
  apellido: string;
  matricula: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  user?: User | null;
}

const NewUserModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSave,
  user,
}) => {
  const [formData, setFormData] = useState<User>({
    id: "",
    nombre: "",
    apellido: "",
    matricula: "",
  });

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!formData.nombre || !formData.apellido || !formData.matricula) {
      alert("Por favor, llena todos los campos");
      return;
    }
    onSave(formData);
    setFormData({ id: "", nombre: "", apellido: "", matricula: "" });
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
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="matricula"
          placeholder="Matrícula"
          value={formData.matricula}
          onChange={handleChange}
          className={styles.input}
        />
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
