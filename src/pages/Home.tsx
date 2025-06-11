import Homepage from '../components/Homepage';
import Header from '../components/Header';
import { UserCard } from '@/components/UserCard';
import ReviewCard from '@/components/ReviewCard';
import Footer from '@/components/Footer';



export default function Home() {
  return (
    <div>
        {/* Header */}
        <Header />

        {/* MainContent */}
        <Homepage />
  
        {/* Footer */}
        <Footer />
    </div>
  );
};
