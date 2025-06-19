import { createMessage } from "@/services/message.service";
import { useEffect, useState } from "react";

export default function MessageModal({ 
    onClose,
    receiverId }: {
    onClose: () => void;
    receiverId: number;
}) {
  useEffect(() => {
    // Bloque le scroll du body quand la modale est ouverte
    document.body.style.overflow = "hidden";

    return () => {
      // Restaure le scroll quand la modale est fermée
      document.body.style.overflow = "auto";
    };
  }, []);
  const [error, setError] = useState<Error | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState("");
  

    const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

     try {
    const messageData = {
      sender_id: id,
      receiver_id: selectedConversation,
      body: newMessage,
    };
    console.log("Sending message data:", messageData); // Log des données envoyées

    const newMsg = await createMessage(messageData, selectedConversation.toString());
    console.log("Received new message:", newMsg); // Log de la réponse
    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");
  } catch (error) {
    console.error("Error sending message:", error); // Log de l'erreur
    setError(error as Error);
  }

    return (
    <div
      className="fixed inset-0 flex justify-center items-start z-50 p-4 overflow-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-3xl max-h-[80vh] overflow-y-auto p-6 relative shadow-lg mt-20"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 hover:text-accent text-2xl font-bold"
          aria-label="Fermer"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center">Contactez-moi</h2>

        <section className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Votre message ici :</h3>

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
        </section> 
        </div>   
        </div>
  )}
