import Sidebar from "./sidebar/Sidebar.tsx";
import MainPane from "./main_pane/MainPane.tsx";
import styles from "./AppLayout.module.css";

const AppLayout = () => {
  return (
    <div className={styles.appLayout}>
      <Sidebar />
      <MainPane />
    </div>
  );
};

export default AppLayout;
