//Inicio de sesion para supervisores
import LoginForm from "@/app/interfaces/componentes/LoginForm";

export const metadata = {
  title: "Inicio de sesión",
  description: "Interfaz de inicio para ingresar al gestor",
};

export default function InicioSession() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
