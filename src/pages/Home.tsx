import Homepage from '../components/Homepage';
import Header from '../components/Header';
import { UserCard } from '@/components/UserCard';
import ReviewCard from '@/components/ReviewCard';
import SignupForm from '@/components/Forms/SignupForm';
import LoginForm from '../components/Forms/LoginForm';


export default function Home() {
  return (
    <div>
        {/* Header */}
        <Header />

        {/* MainContent */}
        <Homepage />
        <UserCard />
        <ReviewCard />
        <LoginForm />
        <SignupForm />

        {/* Footer */}
    </div>
  );
};
