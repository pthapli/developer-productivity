import { useState } from "react";

type Props = {
  onClick: any;
  text: string;
  context: string;
  allowHover?: boolean;
};

export const ClipboardItemButton: React.FC<Props> = ({
  onClick,
  text,
  context,
  allowHover,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    console.log("handleMouseOver");
    allowHover && setIsHovered(true);
  };

  const handleMouseOut = () => {
    console.log("handleMouseOut");
    allowHover && setIsHovered(false);
  };
  return (
    <>
      <button
        onClick={onClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        style={{ width: "100%" }}
      >
        {text}
      </button>

      {isHovered && <div> {context || "bero"}</div>}
    </>
  );
};
