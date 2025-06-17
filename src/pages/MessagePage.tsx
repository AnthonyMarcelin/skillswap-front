import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/Card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLatestMessagesForUser } from "@/services/message.service";

import type { IMessage } from "@/types/message";
import type { IUser } from "@/types/user";
import type { IConversation } from "@/types/conversation";

export default function MessagePage() {
  const [selectedConversation, setSelectedConversation] = useState<
    number | null
  >(null);
  const [activeUser, setActiveUser] = useState<IUser | null>(null);
  const { id } = useParams();
  console.log(id);

  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

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

  // Exemple de données
  // {
  //   id: 1,
  //   user: {
  //     id: 1,
  //     firstname: "Sophie",
  //     lastname: "Martin",
  //     email: "sophie.martin@example.com",
  //     profile_picture: "https://i.pravatar.cc/150?img=1",
  //     skills: [{ id: 1, name: "React" }],
  //     availability: "Disponible",
  //     description: "Développeuse Frontend",
  //     zipcode: "75001",
  //     city: "Paris",
  //   },
  //   lastMessage: {
  //     id: 1,
  //     body: "J'aimerais en savoir plus sur vos compétences en développement web",
  //     sending_date: new Date(),
  //     updated_at: new Date(),
  //   },
  //   unreadCount: 2,
  // },
  // {
  //   id: 2,
  //   user: {
  //     id: 2,
  //     firstname: "Thomas",
  //     lastname: "Dubois",
  //     email: "thomas.dubois@example.com",
  //     profile_picture: "https://i.pravatar.cc/150?img=2",
  //     skills: [{ id: 2, name: "TypeScript" }],
  //     availability: "Disponible",
  //     description: "Développeur Backend",
  //     zipcode: "69001",
  //     city: "Lyon",
  //   },
  //   lastMessage: {
  //     id: 2,
  //     body: "Est-ce que vous êtes disponible pour une session de pair programming ?",
  //     sending_date: new Date(),
  //     updated_at: new Date(),
  //   },
  //   unreadCount: 0,
  // },
  // ]);

  const [messages, setMessages] = useState<IMessage[]>([
    // Exemple de messages
    // {
    //   id: 1,
    //   sender_id: 1,
    //   receiver_id: 2,
    //   body: "Bonjour ! J'ai vu votre profil et je suis très intéressée par vos compétences.",
    //   sending_date: new Date(),
    //   updated_at: new Date(),
    // },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleConversationClick = (conversationId: number) => {
    setSelectedConversation(conversationId);
    // Marquer les messages comme lus
    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv,
      ),
    );
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

  return (
    <>
      <Header />
      <section className="flex flex-col min-h-screen bg-secondary text-white">
        <div className="container mx-auto px-4 py-4 md:py-8 flex flex-col flex-grow">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            Messages
          </h1>

          {loading && <p>Chargement des conversations...</p>}
          {error && <p className="text-red-500">Erreur : {error.message}</p>}

          <div className="grid grid-rows-[auto,1fr] md:grid-rows-1 md:grid-cols-3 gap-4 md:gap-6 flex-grow">
            {/* Liste des conversations */}
            <Card className="bg-white h-[30vh] md:h-[calc(100vh-12rem)] overflow-y-auto">
              <div className="space-y-4 md:space-y-6 p-2">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => handleConversationClick(conversation.id)}
                    className={`p-4 rounded-lg cursor-pointer transition-colors bg-primary ${
                      selectedConversation === conversation.id
                        ? "opacity-80"
                        : "hover:opacity-90"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      {conversation.user.profile_picture ? (
                        <img
                          src={conversation.user.profile_picture}
                          alt={`${conversation.user.firstname} ${conversation.user.lastname}`}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xl font-bold text-gray-500">
                            {conversation.user.firstname.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {conversation.user.firstname}{" "}
                          {conversation.user.lastname}
                        </h3>
                        <p className="text-sm text-gray-500 truncate max-w-full">
                          {conversation.lastMessage?.body}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
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
                    {messages.map((message) => (
                      <div key={message.id} className="flex justify-start">
                        <div className="max-w-[70%] p-3 rounded-lg bg-gray-100">
                          <p>{message.body}</p>
                          <span className="text-xs text-gray-500 mt-1 block">
                            {new Date(
                              message.sending_date,
                            ).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    ))}
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
