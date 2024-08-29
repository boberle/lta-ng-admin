import styles from "./Footer.module.css";
import { logout } from "../../actions/firebase.ts";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Footer;
