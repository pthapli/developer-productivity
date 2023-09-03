import { useState } from "react";

type Props = {
  onClick: any;
  text: string;
  context: string;
  allowHover?: boolean;
  setContextValue?: any;
  setShowContext?: any;
};

export const ClipboardItemButton: React.FC<Props> = ({
  onClick,
  text,
  context,
  allowHover,
  setContextValue,
  setShowContext,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    console.log("handleMouseOver");
    if (allowHover) {
      setIsHovered(true);
      setShowContext(true);
      setContextValue(context);
    }
    // allowHover && setIsHovered(true) && setShowContext(context);
  };

  const handleMouseOut = () => {
    console.log("handleMouseOut");
    // allowHover && setIsHovered(false);
    if (allowHover) {
      setIsHovered(false);
      setShowContext(false);
      setContextValue(context); //not allowed
    }
  };
  return (
    <>
      {/* {isHovered && <div> {context || "bero"}</div>} */}
      <button
        onClick={onClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        style={{ width: "100%" }}
      >
        {text}
      </button>
    </>
  );
};
