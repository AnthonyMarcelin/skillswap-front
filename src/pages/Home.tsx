import Homepage from '../components/Homepage';
import Header from '../components/Header';
import FormSection from '../components/FormSection';


export default function Home() {
  return (
    <div>
        {/* Header */}
        <Header />

        {/* MainContent */}
        <Homepage />
        <FormSection />

        {/* Footer */}
    </div>
  );
};
