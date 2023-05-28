type Props = { label: string; handleClick: (...args: any[]) => any };
export const Button = ({ label, handleClick }: Props) => {
  return (
    <button onClick={handleClick} className="custom-button">
      {label}
    </button>
  );
};
