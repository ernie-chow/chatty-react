import React, { ReactElement, useState } from "react";

const ChatBoard = (props: { messageList: React.ReactNode }) => {
  return (
    <div className="chat-board-wrapper">
      {/* <MessageList messageList={props.messageList} /> */}
      {props.messageList}
    </div>
  );
};

export default ChatBoard;
