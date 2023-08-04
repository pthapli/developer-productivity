import React from "react";

type Props = {
  title: string;
  index: number;
  setSelectedTab: (index: number) => void;
};

export const TabTitle: React.FC<Props> = ({ title, setSelectedTab, index }) => {
  return <button onClick={() => setSelectedTab(index)}>{title}</button>;
};
