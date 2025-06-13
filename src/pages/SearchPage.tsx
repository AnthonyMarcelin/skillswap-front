import Header from "@/components/Header";
import { ProfileCard } from "@/components/ProfileCard";
import SearchForm from "@/components/Forms/SearchForm";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { useLocation } from "react-router-dom";
import type { IUser } from "@/types/user";

export default function SearchPage() {
    const location = useLocation();
    const filteredUsers = location.state?.filteredUsers || [];

    return (
        <>
        <Header/>
        <section className="flex flex-col items-center min-h-screen bg-secondary text-white m-0 pt-5">
            <div>
                <div className="text-center p-6 pb-2 font-semibold">
                    “Des nouvelles compétences à portée de clics proches de chez vous.”
                </div>
                <div className="pb-6 w-full flex justify-center">
                <SearchForm className="w-full max-w-2xl" onSearch={() => {}} />
                </div>
                <div className="text-start pl-6 pt-6 font-semibold bg-primary text-secondary">
                    Résultat de votre recherche
                </div>
                <div className="flex flex-col p-6 gap-8 bg-primary">

                {filteredUsers.length === 0 ? (
                    <div className="text-center text-secondary">
                        Aucune compétence trouvée pour cette recherche.
                    </div>
                ) :  (
                    filteredUsers.map((user: IUser) => (
                        <ProfileCard key={user.id} user={user} />
                    ))
                )}
                <Button className="bg-accent hover:bg-secondary text-white">Voir plus</Button>
                </div>
            </div>
        </section>
        <Footer />
        </>
    )
}
