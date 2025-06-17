import api from "@/api/axios";

import type { IMessage } from "@/types/message";
import type { IConversation } from "@/types/conversation";

export async function getLatestMessagesForUser(
  id: string,
): Promise<IConversation[]> {
  const res = await api.get(`/messages/last-conversations/${id}`);
  return res.data.data;
}

export async function getConversation(id: string): Promise<IMessage> {
  const res = await api.get(`/messages/${id}/${id}`);
  return res.data.data;
}

export async function createMessage(): Promise<IMessage> {
  const res = await api.post("/messages");
  return res.data.data;
}
