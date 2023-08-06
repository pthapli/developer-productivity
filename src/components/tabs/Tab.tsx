import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

const Tab: any = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default Tab;
