import { ReactNode } from "react";

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export default DefaultLayout;
