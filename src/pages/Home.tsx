import Homepage from '../components/Homepage';
import Header from '../components/Header';
import FormSection from '../components/Forms/LoginForm';
import { UserCard } from '@/components/UserCard';
import ReviewCard from '@/components/ReviewCard';
import SignupForm from '@/components/Forms/SignupForm';


export default function Home() {
  return (
    <div>
        {/* Header */}
        <Header />

        {/* MainContent */}
        <Homepage />
        <UserCard />
        <ReviewCard />
        <FormSection />
        <SignupForm />

        {/* Footer */}
    </div>
  );
};
