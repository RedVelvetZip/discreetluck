import "./Container.css";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div id="container">{children}</div>;
};

export default Container;
