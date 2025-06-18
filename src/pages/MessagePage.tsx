import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/Card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getConversation, getLatestMessagesForUser } from "@/services/message.service";

import type { IMessage } from "@/types/message";
import type { IUser } from "@/types/user";
import type { IConversation } from "@/types/conversation";
import { useAllUsers } from "@/hooks/useAllUsers";

export default function MessagePage() {
  const [selectedConversation, setSelectedConversation] = useState<
    number | null
  >(null);
  const [activeUser, setActiveUser] = useState<IUser | null>(null);
  const { id } = useParams();
  console.log(id);

  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const {users} = useAllUsers();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await getLatestMessagesForUser(id!);
        if (Array.isArray(response)) {
          setConversations(response);
        } else {
          // Si response est une conversation unique
          setConversations([response as IConversation]);
        }
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, [id]);


  const handleConversationClick = async (userId: string, contactId: number, user:IUser) => {
    setSelectedConversation(contactId);
    setActiveUser(user);
    try {
    const response = await getConversation(userId, contactId.toString());
    setMessages(Array.isArray(response) ? response : [response]);
  } catch (error) {
    setError(error as Error);
  }
};

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    // Simuler l'ajout d'un nouveau message
    const newMsg: IMessage = {
      id: messages.length + 1,
      body: newMessage,
      sending_date: new Date(),
      updated_at: new Date(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");
  };
  console.log('conversations:', conversations);

  return (
    <>
      <Header />
      <section className="flex flex-col min-h-screen bg-secondary text-white">
        <div className="container mx-auto px-4 py-4 md:py-8 flex flex-col flex-grow">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            Mes Derniers Messages
          </h1>

          {loading && <p>Chargement des conversations...</p>}
          {error && <p className="text-red-500">Erreur : {error.message}</p>}

          <div className="grid grid-rows-[auto,1fr] md:grid-rows-1 md:grid-cols-3 gap-4 md:gap-6 flex-grow">
            {/* Liste des conversations */}
            <Card className="bg-white h-[30vh] md:h-[calc(100vh-12rem)] overflow-y-auto">
              <div className="space-y-4 md:space-y-6 p-2">
                {conversations
                .filter((conversation) => conversation)
                .map((conversation) => {
                  const userId = Number(id);
                  const contactId = conversation.sender_id === userId
                    ? conversation.receiver_id
                    : conversation.sender_id;
                  // Trouver l'utilisateur correspondant à la conversation
                  const user = users.find(
                    (user) => user.id === contactId,
                  );

                  // Si l'utilisateur n'est pas trouvé, on continue
                  if (!user) return null;
              
                  return (
                  <div
                    key={conversation.id}
                    onClick={() => {
                      handleConversationClick(id!, user.id, user);
                      setActiveUser(user);
                    }}
                    className={`p-4 rounded-lg cursor-pointer transition-colors bg-primary ${
                      selectedConversation === conversation.id
                        ? "opacity-80"
                        : "hover:opacity-90"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      {user.profile_picture ? (
                        <img
                          src={user.profile_picture}
                          alt={`${user.firstname} ${user.lastname}`}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xl font-bold text-gray-500">
                            {conversation.sender_id}
                          </span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {conversation.sender_id}{" "}
                          {user.firstname}
                        </h3>
                        <p className="text-sm text-gray-500 truncate max-w-full">
                          {conversation.body}
                        </p>
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>
            </Card>

            {/* Zone de conversation */}
            <Card className="bg-white md:col-span-2 p-4 h-[calc(100vh-12rem)] flex flex-col">
              {selectedConversation ? (
                <>
                  {/* En-tête de la conversation */}
                  {activeUser && (
                    <div className="border-b pb-4 mb-4">
                      <div className="flex items-center space-x-4">
                        {activeUser.profile_picture ? (
                          <img
                            src={activeUser.profile_picture}
                            alt={`${activeUser.firstname} ${activeUser.lastname}`}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-lg font-bold text-gray-500">
                              {activeUser.firstname.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div>
                          <h2 className="font-semibold text-gray-900">
                            {activeUser.firstname} {activeUser.lastname}
                          </h2>
                          <p className="text-sm text-gray-500">
                            {activeUser.city}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Messages */}
                  <div className="text-black flex-1 overflow-y-auto space-y-4 mb-4">
                    {messages.map((message) => {
                      const sender = users.find(
                        (user) => user.id === message.sender_id);
                      return (
                      <div key={message.id} className="flex justify-start">
                        {sender && sender.profile_picture? (
                          <img
                            src={sender.profile_picture || ""}
                            alt={`${sender.firstname} ${sender.lastname}`}
                            className="w-8 h-8 rounded-full object-cover mr-2"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-base font-bold text-gray-500">
                              {sender ? sender.firstname.charAt(0) : "?"}
                            </span>
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-primary">
                              {sender ? sender.firstname : "Utilisateur"}
                            </span>
                          </div>
                          <div className="max-w-[70%] p-3 rounded-lg bg-gray-100">
                            <p>{message.body}</p>
                            <span className="text-xs text-gray-500 mt-1 block">
                              {new Date(message.sending_date).toLocaleString("fr-FR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                              })}
                            </span>
                          </div>
                      </div>
                  </div>
                );
                    })}
                </div>

                  {/* Zone de saisie */}
                  <div className="border-t pt-4">
                    <div className="flex space-x-4">
                      <input
                        type="text"
                        placeholder="Écrivez votre message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-black"
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleSendMessage()
                        }
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-primary text-secondary px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                      >
                        Envoyer
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-gray-500">
                    Sélectionnez une conversation pour commencer à discuter
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
