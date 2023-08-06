import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

export const ScrollWrapper = ({ children }: Props) => {
  return <div style={{ height: "500px", overflowY: "auto" }}>{children}</div>;
};
