/**
 * Formulaire d'inscription
 * @returns JSX.Element
 */

export function FormSection() {
  return (
    <div className="bg-[var(--color-secondary)] text-white">
      <section
        className="
      py-8"
      >
        <h1 className="mb-6 text-center text-2xl font-bold">
          Ca Commence ici !
        </h1>
        <h2 className="mb-6 text-center text-xl font-bold">
          Inscrivez-vous pour partager vos compétences
        </h2>
        {/* Carte responsive */}
        <form
          className="
          mx-auto w-full
          sm:max-w-sm
          md:max-w-md
          lg:max-w-lg
          px-6 py-8
        "
        >
          {/* Insciption */}
          {/* Prénom */}
          <input
            className="mb-3 w-full rounded border px-3 py-2 focus:outline-none bg-white text-black"
            placeholder="FirstName"
          />

          {/* Nom */}
          <input
            className="mb-3 w-full rounded border px-3 py-2 focus:outline-none  bg-white text-black"
            placeholder="LastName"
          />

          {/* Email */}
          <input
            type="email"
            className="mb-3 w-full rounded border px-3 py-2 focus:outline-none  bg-white  text-black"
            placeholder="Email address"
          />

          {/* Mot de passe */}
          <input
            type="password"
            className="mb-3 w-full rounded border px-3 py-2 focus:outline-none bg-white text-black"
            placeholder="Password"
          />

          {/* Sélects : 1 colonne mobile → 2 colonnes dès md */}
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Compétences */}
            <label className="mb-1 block text-sm font-medium ">
              Compétences :
            </label>
            <select className="mb-3 w-full rounded border px-3 py-2 focus:outline-none  bg-white text-black">
              <option selected>Compétences 1</option>
              <option>Compétences 2</option>
              <option>Compétences 3</option>
            </select>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Disponibilités */}
            <label className="mb-1 block text-sm font-medium">
              Disponibilités :
            </label>
            <select className="mb-3 w-full rounded border px-3 py-2 focus:outline-none  bg-white text-black">
              <option selected>Disponibilités 1</option>
              <option>Disponibilités 2</option>
              <option>Disponibilités 3</option>
            </select>
          </div>

          {/* À propos */}
          <label className="mt-4 mb-1 block text-sm font-medium">
            À propos :
          </label>
          <textarea
            rows={3}
            className="mb-4 w-full resize-none rounded border px-3 py-2 focus:outline-none  bg-white text-black"
            placeholder="Parle-nous de toi"
          />

          {/* Bouton */}
          <button
            type="submit"
            className="
            mb-3
            block w-full rounded bg-[var(--color-accent)]
            py-2 font-semibold text-white transition
            hover:opacity-90 focus:outline-none
            focus-visible:ring-4 focus-visible:ring-[var(--color-secondary)]/40
          "
          >
            S’inscrire
          </button>

          {/* Connexion */}
          {/* Email */}
          <div>
            <h2 className="m-6 text-center text-xl font-bold">Vous avez déjà un compte ?</h2>
            <input
              type="email"
              className="mb-3 w-full rounded border px-3 py-2 focus:outline-none bg-white text-black"
              placeholder="Email address"
            />

            {/* Mot de passe */}
            <input
              type="password"
              className="mb-3 w-full rounded border px-3 py-2 focus:outline-none bg-white text-black"
              placeholder="Password"
            />
            <button
              type="submit"
              className="
            block w-full rounded bg-[var(--color-accent)]
            py-2 font-semibold text-white transition
            hover:opacity-90 focus:outline-none
            focus-visible:ring-4 focus-visible:ring-[var(--color-secondary)]/40
          "
            >
              Se connecter
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default FormSection;
