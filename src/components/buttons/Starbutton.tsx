type Props = { onClick: any };

const StarButton = ({ onClick }: Props) => {
  return (
    <button onClick={onClick} className="star-button">
      <span className="star">&#9733;</span>
    </button>
  );
};

export default StarButton;
