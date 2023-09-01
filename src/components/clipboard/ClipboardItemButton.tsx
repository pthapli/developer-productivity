import { useState } from "react";

type Props = {
  onClick: any;
  text: string;
  context: string;
};

export const ClipboardItemButton: React.FC<Props> = ({
  onClick,
  text,
  context,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    console.log("handleMouseOver");
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    console.log("handleMouseOut");
    setIsHovered(false);
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
