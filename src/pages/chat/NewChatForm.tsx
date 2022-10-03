import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { gql, useMutation } from "@apollo/client";

const CREATE_MESSAGE = gql`
  mutation newMessage($sender: String!, $content: String!) {
    newMessage(sender: $sender, content: $content) {
      id
      sender
      timeStamp
    }
  }
`;

const NewChatForm = (props: { callback: Function }) => {
  const [nameValue, setNameValue] = useState("");
  const [messageValue, setMessageValue] = useState("");

  const [create, data] = useMutation(CREATE_MESSAGE, {
    update: props.callback(),
  });

  return (
    <div className="create-chat-wrapper">
      <div className="field">
        <label htmlFor="name">Display Name</label>
        <InputText
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="field">
        <label htmlFor="name">Message</label>
        <InputTextarea
          value={messageValue}
          onChange={(e) => setMessageValue(e.target.value)}
          className="w-full"
          autoResize
        />
      </div>
      <div>
        <Button
          label="Send"
          icon="pi pi-send"
          onClick={async () => {
            await create({
              variables: { sender: nameValue, content: messageValue },
            });
            props.callback();
          }}
          autoFocus
        />
      </div>
    </div>
  );
};

export default NewChatForm;
