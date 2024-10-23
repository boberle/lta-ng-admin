type ViewProps = {
  style?: { [key: string]: any };
  children: any;
};

const View = ({ children, style = {} }: ViewProps) => {
  return <div style={style}>{children}</div>;
};

export default View;
