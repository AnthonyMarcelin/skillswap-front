import Homepage from '../components/Homepage';
import Header from '../components/Header';
import FormSection from '../components/FormSection';
import { UserCard } from '@/components/UserCard';


export default function Home() {
  return (
    <div>
        {/* Header */}
        <Header />

        {/* MainContent */}
        <Homepage />
        <UserCard />
        <FormSection />

        {/* Footer */}
    </div>
  );
};
