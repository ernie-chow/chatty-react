export type Message = {
  id: string;
  sender: string;
  parentMessageId: string;
  content: string;
  timeStamp: string;
  likes: number;
  dislikes: number;
  replies: [Message];
};
