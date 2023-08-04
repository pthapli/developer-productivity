export const Row = (props: { children: React.ReactNode }) => {
  return <div className="row">{props.children}</div>;
};

export const RowEvenlySpace = (props: { children: React.ReactNode }) => {
  return <div className="row-evenly-spaced">{props.children}</div>;
};
