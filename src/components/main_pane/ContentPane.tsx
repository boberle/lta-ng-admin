import Content from "./Content.tsx";
import { ReactNode } from "react";
import ContentTitle from "./ContentTitle.tsx";

type ContentPaneProps = {
  title: string;
  children: ReactNode;
};

const ContentPane = ({ title, children }: ContentPaneProps) => {
  return (
    <>
      <ContentTitle title={title} />
      <Content>{children}</Content>
    </>
  );
};

export default ContentPane;
