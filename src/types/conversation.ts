import type { IUser } from "./user";
import type { IMessage } from "./message";

// Structure d'une conversation : combine un message et les infos utilisateur
export interface IConversation {
  id: number;
  lastMessage: IMessage;
  sender_id: number;
  receiver_id: number;
  body: string;
  user: IUser;
}
