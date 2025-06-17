import {
  Card,
  CardHeader,
  CardContent,
  CardAction,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { IUser } from "@/types/user";

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById } from "@/services/user.service"; // à créer si pas fait
import { useAsyncState } from "@/hooks/useAsyncState"; // ton hook personnalisé

export function UserCard() {
  const { id } = useParams();
  const [user, setUser] = useState<IUser | null>(null);
  const { loading, setLoading, error, setError, reset } = useAsyncState();

  useEffect(() => {
    console.log(id);

    const fetchUser = async () => {
      reset();
      try {
        setLoading(true);
        const data = await getUserById(id!);
        setUser(data);
      } catch (err: any) {
        setError("Impossible de charger le profil.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <p className="text-white">Chargement du profil…</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return null;

  return (
    <div className="max-w-full  bg-secondary text-white">
      <Card className="border-0 shadow-md">
        {/* --- En-tête : photo, nom, bouton --- */}
        <CardHeader className="flex items-center gap-4 border-0">
          {/* Zone photo  */}
          <img
            src={user.profile_picture || "URL de secours"}
            className="h-16 w-16 rounded-full object-cover"
          />

          {/* Nom + email */}
          <div className="flex-1">
            <CardTitle>
              {user.firstname} {user.lastname}
            </CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>

          {/* Bouton action */}
          <CardAction>
            <Link to="/register">
              <Button
                size="sm"
                className="block w-full display rounded bg-[var(--color-accent)] text-white"
              >
                Contacte-Moi
              </Button>
            </Link>
          </CardAction>
        </CardHeader>

        {/* --- Contenu : compétences, dispo, bio --- */}
        <CardContent className="space-y-4">
          {/* Compétences */}
          <section>
            <h4 className="font-semibold text-sm">Compétences</h4>
            <ul className="mt-1 flex flex-wrap gap-2">
              {user.skills?.length > 0 ? (
                user.skills.map((s) => (
                  <span
                    key={s.name}
                    className="rounded border px-2 py-1 text-xs font-medium"
                  >
                    {s.name}
                  </span>
                ))
              ) : (
                <span className="text-xs italic">
                  Aucune compétence renseignée
                </span>
              )}
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
          <section className="space-y-1 bg-primary p-4 rounded max-w-full">
            <h4 className="font-semibold text-sm text-secondary">À propos</h4>
            <p className="whitespace-pre-line text-sm leading-relaxed">
              {user.description}
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
