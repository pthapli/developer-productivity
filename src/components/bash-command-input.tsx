import { useState } from "react";
import { Button } from "./wrappers/button";
import { Row } from "./wrappers/row";

export const BashInput = (props: {
  buttonName: string;
  inputName: string;
  handleClick: (...args: any) => any;
}) => {
  const [inputValue, setInputValue] = useState("ls");

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    console.log("writing new value", newValue);
    setInputValue(newValue);
  };

  return (
    <>
      <Row>
        <input
          type="text"
          name={props.inputName}
          onChange={onChange}
          style={{ width: "20vh" }}
        />
        <Button
          label={props.buttonName}
          handleClick={() => props.handleClick(inputValue)}
        />
      </Row>
    </>
  );
};
