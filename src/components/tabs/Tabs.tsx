import React, { ReactElement, useState } from "react";
import { TabTitle } from "./TabTitle";
import { Row } from "../wrappers/row";

type Props = {
  children: ReactElement[];
};

const Tabs: React.FC<Props> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div>
      <Row>
        {children.map((item, index) => (
          <TabTitle
            key={index}
            title={item.props.title}
            index={index}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Row>
      {children[selectedTab]}
    </div>
  );
};

export default Tabs;
