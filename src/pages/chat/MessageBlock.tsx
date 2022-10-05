import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Message } from "../../data/Message";
import { gql, useMutation } from "@apollo/client";

// Interface
interface MessageData {
  message: Message;
}

const LikeMessage = gql`
  mutation likeMessage($id: ID!) {
    likeMessage(id: $id) {
      id
      likes
    }
  }
`;

const DislikeMessage = gql`
  mutation dislikeMessage($id: ID!) {
    dislikeMessage(id: $id) {
      id
      dislikes
    }
  }
`;

// TODO: Add reply popup or input element
const MessageBlock = (props: { key: String; message: Message }) => {
  const [displayDialog, setDisplayDialog] = useState(false);
  const message = props.message;
  const timeStamp = new Date(message.timeStamp);

  const [likeMessage] = useMutation<MessageData>(LikeMessage);
  const [dislikeMessage] = useMutation<MessageData>(DislikeMessage);

  const onViewChatClick = () => {
    setDisplayDialog(true);
  };

  // const onNewChatSend = (cache: any, { data }: any) => {
  //   setDisplayDialog(false);

  //   // Update Apollo cache with new message
  //   cache.modify({
  //     fields: {
  //       getMessages(existingMessages = []) {
  //         const newMessage = data.newMessage;
  //         cache.writeQuery({
  //           query: MESSAGES,
  //           data: { ...existingMessages, newMessage },
  //         });
  //       },
  //     },
  //   });
  // };

  const onDialogHide = () => {
    setDisplayDialog(false);
  };

  return (
    <>
      <div
        key={message.id}
        className="message-block-wrapper p-2 border-1 border-400 border-round-sm pb-0"
      >
        <div key={message.id} className="grid">
          <div className="col-9">
            <span className="text-lg font-semibold mr-3">
              {message.subject}
            </span>
          </div>
          <div className="col-3 text-right text-600">
            {message.sender} on {timeStamp.toLocaleString()}
          </div>
          <div className="col-12">{message.content}</div>
          <div className="col-2 col-offset-8">
            <Button
              icon="pi pi-search"
              label="View"
              className="w-full p-button-secondary"
              onClick={() => onViewChatClick()}
            />
          </div>
          <div className="col-1">
            <Button
              icon="pi pi-thumbs-up"
              label={`${message.likes}`}
              className="w-full p-button-success"
              onClick={async () => {
                await likeMessage({
                  variables: { id: message.id, likes: message.likes },
                });
              }}
            />
          </div>
          <div className="col-1">
            <Button
              icon="pi pi-thumbs-down"
              label={`${message.dislikes}`}
              className="w-full p-button-danger"
              onClick={async () => {
                await dislikeMessage({
                  variables: { id: message.id, dislikes: message.dislikes },
                });
              }}
            />
          </div>
        </div>
      </div>
      <Dialog
        header={`${message.subject}`}
        visible={displayDialog}
        style={{ width: "50vw" }}
        onHide={() => onDialogHide()}
      ></Dialog>
    </>
  );
};

export default MessageBlock;
