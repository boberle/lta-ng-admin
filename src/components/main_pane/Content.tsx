import styles from "./Content.module.css";
import { ReactNode } from "react";

const Content = ({ children }: { children: ReactNode | ReactNode[] }) => {
  return <div className={styles.content}>{children}</div>;
};

export default Content;
