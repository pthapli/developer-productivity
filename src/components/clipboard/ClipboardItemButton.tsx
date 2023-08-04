type Props = {
  onClick: any;
  text: string;
};

export const ClipboardItemButton: React.FC<Props> = ({ onClick, text }) => {
  return (
    <button onClick={onClick} style={{ width: "100%" }}>
      {text}
    </button>
  );
};
