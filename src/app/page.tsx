//import LoginForm from "../components/LoginForm";
import RegistroUsers from "../interfaces/RegistroUsers";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <RegistroUsers />
    </div>
  );
}
