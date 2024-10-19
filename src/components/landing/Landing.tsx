import styles from "./Landing.module.css";
import { Link, Outlet } from "react-router-dom";

const Landing = () => {
  return (
    <div className={styles.landing}>
      <Header />
      <div className={styles.content}>
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <>
      <div className={styles.header}>Lang Track App NG</div>
    </>
  );
};

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Link to="privacy-policy/">Politique de confidentialité</Link>
      <Link to="legal/">Mentions légales</Link>
      <Link to="/console/">Connexion</Link>
    </div>
  );
};

export default Landing;
