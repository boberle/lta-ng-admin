import styles from "./ContentTitle.module.css";

type ContentTitleProps = {
  title: string;
};

const ContentTitle = ({ title }: ContentTitleProps) => {
  return <div className={styles.title}>{title}</div>;
};

export default ContentTitle;
