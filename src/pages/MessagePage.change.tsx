import { Card } from "@/components/ui/Card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MessagePage() {
  return (
    <>
      <Header />
      <section className="flex flex-col min-h-screen bg-secondary text-white">
        <div className="container mx-auto px-4 py-4 md:py-8 flex flex-col flex-grow">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            Messages
          </h1>
          <div className="grid grid-rows-[auto,1fr] md:grid-rows-1 md:grid-cols-3 gap-4 md:gap-6 flex-grow">
            {/* Liste des conversations */}
            <Card className="bg-white h-[30vh] md:h-[calc(100vh-12rem)] overflow-y-auto">
              <div className="space-y-4 md:space-y-6 p-2">
                {isLoading ? (
                  <div className="flex justify-center items-center h-20">
                    <p className="text-gray-500">
                      Chargement des conversations...
                    </p>
                  </div>
                ) : error ? (
                  <div className="flex justify-center items-center h-20">
                    <p className="text-red-500">{error}</p>
                  </div>
                ) : conversations.length === 0 ? (
                  <div className="flex justify-center items-center h-20">
                    <p className="text-gray-500">Aucune conversation</p>
                  </div>
                ) : (
                  conversations.map((conversation) => (
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
                  ))
                )}
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
                    {isLoading && (
                      <div className="flex justify-center">
                        <p className="text-gray-500">Chargement...</p>
                      </div>
                    )}
                    {error && (
                      <div className="flex justify-center">
                        <p className="text-red-500">{error}</p>
                      </div>
                    )}
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
                        disabled={isLoading || !newMessage.trim()}
                        className="bg-primary text-secondary px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                      >
                        {isLoading ? "Envoi..." : "Envoyer"}
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
