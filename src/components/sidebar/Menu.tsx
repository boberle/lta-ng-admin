import MenuItem from "./MenuItem.tsx";
import styles from "./Menu.module.css";

const Menu = () => {
  return (
    <>
      <div className={styles.menu}>
        <MenuItem to="/users/">Users</MenuItem>
        <MenuItem to="/groups/">Groups</MenuItem>
      </div>
    </>
  );
};

export default Menu;
