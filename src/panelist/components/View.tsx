type ViewProps = {
  style?: { [key: string]: any };
  children: React.ReactElement | React.ReactElement[];
};

const View = ({ children, style = {} }: ViewProps) => {
  return <div style={style}>{children}</div>;
};

export default View;
