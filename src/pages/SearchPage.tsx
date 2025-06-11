import Header from "@/components/Header";
import { ProfileCard } from "@/components/ProfileCard";
import SearchForm from "@/components/SearchForm";

export default function SearchPage() {
    return (
        <>
        <Header/>
        <section className="flex flex-col items-center min-h-screen bg-secondary text-white m-0 pt-5">
            <div>
                <div className="text-center p-6 pb-2 font-semibold">
                    “Des nouvelles compétences à portée de clics proches de chez vous.”
                </div>
                <div className="pb-6">
                <SearchForm />
                </div>
                <div className="text-start pl-6 pt-6 font-semibold bg-primary text-secondary">
                    Résultat de votre recherche
                </div>
                <div className="flex flex-col p-6 gap-8 bg-primary">
                <ProfileCard />
                <ProfileCard />
                <ProfileCard />
                </div>
            </div>

          
        </section>
        </>
    )
}