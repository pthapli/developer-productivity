import { invoke } from "@tauri-apps/api";
import { useState } from "react";

type Props = {
  text: string;
  context: string;
  showModal: boolean;
  updateShowModal: any;
};

export const ContextModal: React.FC<Props> = ({
  text,
  context,
  showModal,
  updateShowModal,
}) => {
  console.log({ showModal });
  const [inputContext, setInputContext] = useState(context);

  const handleSubmitClick = () => {
    console.log("handleSubmitClick method running inside the ContextModal");
    console.log({ text, context, showModal, inputContext });
    invoke("save_bookmark", {
      item: { value: text, context: inputContext },
    })
      .then(() => {
        console.log("Bookmark saved from ContextModal");
      })
      .catch((error) => {
        console.log("Error ", error);
      });
    updateShowModal();
  };

  const handleChange = (event: any) => {
    setInputContext(event.target.value);
  };

  return (
    { showModal } && (
      <>
        <p style={{ display: "flex", alignContent: "center" }}>
          Hello brother this is the modal
        </p>
        <input type="text" value={inputContext} onChange={handleChange} />
        <button onClick={handleSubmitClick}>submit</button>
      </>
    )
  );
};
