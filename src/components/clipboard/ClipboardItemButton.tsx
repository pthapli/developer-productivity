type Props = {
  onClick: any;
  onMouseOver: any;
  onMouseOut: any;
  text: string;
};

export const ClipboardItemButton: React.FC<Props> = ({
  onClick,
  onMouseOver,
  onMouseOut,
  text,
}) => {
  return (
    <button
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      style={{ width: "100%" }}
    >
      {text}
    </button>
  );
};
