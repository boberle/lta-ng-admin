import styles from "./MainPane.module.css";
import { Outlet } from "react-router-dom";

const MainPane = () => {
  return (
    <div className={styles.mainPane}>
      <Outlet />
    </div>
  );
};

export default MainPane;
