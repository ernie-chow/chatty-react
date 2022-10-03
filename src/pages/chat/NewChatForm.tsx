import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { gql, useMutation } from "@apollo/client";

const NewChatForm = (props: {
  nameValue: string;
  setNameValue: Function;
  messageValue: string;
  setMessageValue: Function;
}) => {
  return (
    <div className="create-chat-wrapper">
      <div className="field">
        <label htmlFor="name">Display Name</label>
        <InputText
          value={props.nameValue}
          onChange={(e) => props.setNameValue(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="field">
        <label htmlFor="name">Message</label>
        <InputTextarea
          value={props.messageValue}
          onChange={(e) => props.setMessageValue(e.target.value)}
          className="w-full"
          autoResize
        />
      </div>
    </div>
  );
};

export default NewChatForm;
