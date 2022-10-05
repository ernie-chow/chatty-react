export interface Message {
  id: string;
  sender: string;
  parentMessageId: string;
  subject: string;
  content: string;
  timeStamp: string;
  likes: number;
  dislikes: number;
  replies: [Message];
}
