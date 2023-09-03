import { useState } from "react";

type Props = {
  onClick: any;
  text: string;
  context: string;
  allowHover?: boolean;
  // setContextValue?: any;
  // setShowContext?: any;
};

type HoverComponentProps = { context: string };
const HoverComponent: React.FC<HoverComponentProps> = ({ context }) => {
  return (
    <p
      style={{
        position: "fixed",
        backgroundColor: "#000",
        color: "#fff",
        padding: "8px 12px",
        borderRadius: "4px",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
        fontSize: "14px",
        zIndex: 1000,
      }}
    >
      {context}
    </p>
  );
};

export const ClipboardItemButton: React.FC<Props> = ({
  onClick,
  text,
  context,
  allowHover,
  // setContextValue,
  // setShowContext,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [contextValue, setContextValue] = useState(context);
  const [showContext, setShowContext] = useState(false);

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
      {isHovered && <HoverComponent context={context} />}
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
