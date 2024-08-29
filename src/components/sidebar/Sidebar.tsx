import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import Menu from "./Menu.tsx";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Header />
      <Menu />
      <Footer />
    </div>
  );
};

export default Sidebar;
