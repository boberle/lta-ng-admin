type TextProps = {
  style?: { [key: string]: any };
  children: React.ReactNode | React.ReactNode[];
};
const Text = ({ children, style = {} }: TextProps) => {
  return <div style={style}>{children}</div>;
};

export default Text;
