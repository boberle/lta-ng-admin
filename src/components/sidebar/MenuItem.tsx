import { NavLink } from "react-router-dom";
import { ReactNode } from "react";
import styles from "./MenuItem.module.css";

type MenuItemProps = {
  to: string;
  children: ReactNode | ReactNode[];
};

const MenuItem = ({ to, children }: MenuItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? styles.active : "")}
    >
      {children}
    </NavLink>
  );
};

export default MenuItem;
