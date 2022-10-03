import React, { ReactElement, useState } from "react";
import { Message } from "../../data/Message";
import MessageBlock from "./MessageBlock";
import { gql, useQuery } from "@apollo/client";

// TODO: Use Apollo caching for automatic update
// const MessageList = (props: { messageList: React.Component }) => {
//   return (
//     <div>
//       {props.messageList
//         .slice(0)
//         .reverse()
//         .map((message: Message) => (
//           <div className="mb-2">
//             {/* <MessageBlock key={message.id} message={{...message}} callback={updateMessage} /> */}
//             <MessageBlock key={message.id} message={{ ...message }} />
//           </div>
//         ))}
//     </div>
//   );
// };

const ChatBoard = (props: { messageList: React.ReactNode }) => {
  return (
    <div className="chat-board-wrapper overflow-scroll h-full">
      {/* <MessageList messageList={props.messageList} /> */}
      {props.messageList}
    </div>
  );
};

export default ChatBoard;
