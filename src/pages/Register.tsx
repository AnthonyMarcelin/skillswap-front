// tu n’as plus besoin d’importer SignupForm ici
import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import FormSection from "@/components/Forms/FormSection";

export default function RegisterPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--color-secondary)]">
        <FormSection />
      </main>
      <Footer />
    </>
  );
}
