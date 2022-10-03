import React, { useState } from "react";
import NewChatForm from "./NewChatForm";
import ChatBoard from "./ChatBoard";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import "../../assets/css/Chat/chat-page.scss";
import { Message } from "../../data/Message";
import MessageBlock from "./MessageBlock";
import { gql, useQuery } from "@apollo/client";

const Messages = gql`
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

const MessageList = () => {
  // TODO: Fix returns and use useQuery hook as intended
  const { loading, error, data } = useQuery(Messages);

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

  // TODO: Change mutation to Apollo cache update
  let messages = MessageList();

  const onNewChatClick = () => {
    setDisplayDialog(true);
  };

  const onNewChatSend = () => {
    setDisplayDialog(false);
    messages = MessageList();
  };

  const onDialogHide = () => {
    setDisplayDialog(false);
  };

  return (
    <div className="chat-wrapper p-5 h-full">
      <div className="grid h-full">
        <div className="col-9 flex flex-column align-items-stretch">
          <span className="text-xl">Chat Board</span>
          <div className="mt-3 h-full">
            <ChatBoard messageList={messages} />
          </div>
        </div>
        <div className="col-3 flex justify-content-center border-left-2 border-200 pl-2">
          <Button
            icon="pi pi-plus"
            label="New Chat"
            className="w-full h-4rem"
            onClick={() => onNewChatClick()}
          />
        </div>
      </div>

      <Dialog
        header="New Chat"
        visible={displayDialog}
        style={{ width: "50vw" }}
        onHide={() => onDialogHide()}
      >
        <NewChatForm callback={onNewChatSend} />
      </Dialog>
    </div>
  );
}
