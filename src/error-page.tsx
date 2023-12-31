import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p></p>
      <button
        onClick={() => {
          navigate("/");
        }}
      ></button>
    </div>
  );
}
