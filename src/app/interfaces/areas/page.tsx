import styles from "./page.module.css"

export const metadata = {
  title: "Permiso Áreas",
  description: "Asignar permisos a usuarios para las áreas",
};

export default function AccesoAreas() {
  const areas = [
    { id: 1, nombre: "Laboratorio 1" },
    { id: 2, nombre: "Laboratorio 2" },
    { id: 3, nombre: "Biblioteca" },
    { id: 4, nombre: "Auditorio A" },
    { id: 5, nombre: "Salón TI"},
  ];

  return (
    <div className={styles.container}>
      {/* Encabezado */}
      <div className={styles.header}>
        {/* Buscador */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar área..."
            className="search-input"
          />
        </div>

        {/* Botón de agregar nueva área 
        <button className="add-button">Agregar nueva área</button>
        */}
      </div>

      {/* Tabla */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Áreas</th>
            <th>Permisos</th>
          </tr>
        </thead>
        <tbody>
          {areas.map((area) => (
            <tr key={area.id}>
              <td>{area.nombre}</td>
              <td>
                <button className="permission-button">Permisos</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
}
