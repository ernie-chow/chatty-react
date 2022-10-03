import React, { useState } from "react";
import { Button } from "primereact/button";
import { Message } from "../../data/Message";
import { gql, useMutation } from "@apollo/client";

const LikeMessage = gql`
  mutation likeMessage($id: ID!) {
    likeMessage(id: $id) {
      likes
    }
  }
`;

const DislikeMessage = gql`
  mutation dislikeMessage($id: ID!) {
    dislikeMessage(id: $id) {
      dislikes
    }
  }
`;

// TODO: Add reply popup or input element
// TODO: Convert like += 1 and dislike += 1 to callback function
// const MessageBlock = (props: {key: String, message: Message, callback: Function}) => {
const MessageBlock = (props: { key: String; message: Message }) => {
  const message = props.message;
  const timeStamp = new Date(message.timeStamp);

  const [like] = useMutation(LikeMessage);
  const [dislike] = useMutation(DislikeMessage);

  return (
    <div
      key={message.id}
      className="message-block-wrapper p-2 border-1 border-400 border-round-sm pb-0"
    >
      <div className="grid">
        <div className="col-10">
          <span className="text-500">Posted by: </span>
          {message.sender}
        </div>
        <div className="col-2 text-right text-600">
          {timeStamp.toLocaleString()}
        </div>
        <div className="col-12">{message.content}</div>
        <div className="col-2 col-offset-8">
          <Button
            icon="pi pi-send"
            label="Reply"
            className="w-full p-button-secondary"
          />
        </div>
        <div className="col-1">
          <Button
            icon="pi pi-thumbs-up"
            label={`${message.likes}`}
            className="w-full p-button-success"
            onClick={async () => {
              await like({ variables: { id: message.id } });
              message.likes += 1;
            }}
          />
        </div>
        <div className="col-1">
          <Button
            icon="pi pi-thumbs-down"
            label={`${message.dislikes}`}
            className="w-full p-button-danger"
            onClick={async () => {
              await dislike({ variables: { id: message.id } });
              message.dislikes += 1;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageBlock;
