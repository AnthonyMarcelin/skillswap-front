import {
  Card,
  CardHeader,
  CardContent,
  CardAction,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function UserCard() {
  const user = {
    name: "Anthony Marcelin",
    email: "anthony@example.com",
    photo: "https://avatar.iran.liara.run/public/37",
    skills: ["Bricolage", "Informatique", "Apprentissage"],
    availability: "Semaine / week-end",
    bio: `Salut ! Moi c'est Anthony, je bosse côté backend parce que…`,
  };

  return (
    <Card className="border-0 shadow-md">
      {/* --- En-tête : photo, nom, bouton --- */}
      <CardHeader className="flex items-center gap-4 border-0">
        {/* Zone photo  */}
        <img
          src={user.photo}
          alt={user.name}
          className="h-16 w-16 rounded-full object-cover"
        />

        {/* Nom + email */}
        <div className="flex-1">
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </div>

        {/* Bouton action */}
        <CardAction>
          <Button
            size="sm"
            className="block w-full rounded bg-[var(--color-accent)] text-white"
          >
            Contacte-Moi
          </Button>
        </CardAction>
      </CardHeader>

      {/* --- Contenu : compétences, dispo, bio --- */}
      <CardContent className="space-y-4">
        {/* Compétences */}
        <section>
          <h4 className="font-semibold text-sm">Compétences</h4>
          <ul className="mt-1 flex flex-wrap gap-2">
            {user.skills.map((s) => (
              <span
                key={s}
                className="rounded border px-2 py-1 text-xs font-medium"
              >
                {s}
              </span>
            ))}
          </ul>
        </section>

        {/* Disponibilités */}
        <section>
          <h4 className="font-semibold text-sm">Disponibilités</h4>
          <p className="mt-1 inline-block rounded border px-2 py-1 text-xs">
            {user.availability}
          </p>
        </section>

        {/* Bio */}
        <section>
          <h4 className="font-semibold text-sm">À propos</h4>
          <p className="whitespace-pre-line text-sm leading-relaxed">
            {user.bio}
          </p>
        </section>
      </CardContent>
    </Card>
  );
}
