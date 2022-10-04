import React, { useState } from "react";
import NewChatForm from "./NewChatForm";
import ChatBoard from "./ChatBoard";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import "../../assets/css/Chat/chat-page.scss";
import { Message } from "../../data/Message";
import MessageBlock from "./MessageBlock";
import { gql, useQuery, useMutation } from "@apollo/client";

// Query to get all messages
const MESSAGES = gql`
  query getMessages {
    getMessages {
      id
      sender
      timeStamp
      content
      likes
      dislikes
    }
  }
`;

// Mutation to create message
const CREATE_MESSAGE = gql`
  mutation newMessage($sender: String!, $content: String!) {
    newMessage(sender: $sender, content: $content) {
      id
      sender
      timeStamp
    }
  }
`;

// MessageList - Displays all messages in reverse chronological order
// TOOD: Add pagination
const MessageList = () => {
  const { loading, error, data } = useQuery(MESSAGES);

  if (loading) return <i className="pi pi-spinner"></i>;

  if (error) return <span>An error has occurred</span>;

  return data.getMessages
    .slice(0)
    .reverse()
    .map((message: Message) => (
      <div className="mb-2">
        {/* <MessageBlock key={message.id} message={{...message}} callback={updateMessage} /> */}
        <MessageBlock key={message.id} message={{ ...message }} />
      </div>
    ));
};

export function Chat() {
  const [displayDialog, setDisplayDialog] = useState(false);
  const messages = MessageList();

  const onNewChatClick = () => {
    setDisplayDialog(true);
  };

  const onNewChatSend = (cache: any, { data }: any) => {
    setDisplayDialog(false);

    // Update Apollo cache with new message
    cache.modify({
      fields: {
        getMessages(existingMessages = []) {
          const newMessage = data.newMessage;
          cache.writeQuery({
            query: MESSAGES,
            data: { ...existingMessages, newMessage },
          });
        },
      },
    });
  };

  const onDialogHide = () => {
    setDisplayDialog(false);
  };

  const dialogFooter = (callback: Function) => {
    return (
      <>
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => {
            onDialogHide();
          }}
          className="p-button-secondary p-button-outlined"
        />
        <Button
          label="Send"
          icon="pi pi-send"
          onClick={async () => {
            await callback({
              variables: { sender: nameValue, content: messageValue },
            });
          }}
          autoFocus
        />
      </>
    );
  };

  // Name and message fields for dialog
  const [nameValue, setNameValue] = useState("");
  const [messageValue, setMessageValue] = useState("");

  // Apollo mutation hook for sending new message
  const [create, data] = useMutation(CREATE_MESSAGE, {
    update: onNewChatSend,
  });

  return (
    <div className="chat-wrapper overflow-hidden">
      <div className="grid h-full">
        <div className="col-9 h-full">
          <div className="bg-white h-full border-round border-300 p-3 flex flex-column overflow-auto">
            <span className="text-xl mb-3">Chat Board</span>
            <ChatBoard messageList={messages} />
          </div>
        </div>
        <div className="col-3">
          <div className="flex justify-content-center border-300 border-round bg-white p-3">
            <Button
              icon="pi pi-plus"
              label="New Chat"
              className="w-full h-4rem"
              onClick={() => onNewChatClick()}
            />
          </div>
        </div>
      </div>

      <Dialog
        header="New Chat"
        footer={dialogFooter(create)}
        visible={displayDialog}
        style={{ width: "50vw" }}
        onHide={() => onDialogHide()}
      >
        <NewChatForm
          nameValue={nameValue}
          setNameValue={setNameValue}
          messageValue={messageValue}
          setMessageValue={setMessageValue}
        />
      </Dialog>
    </div>
  );
}
