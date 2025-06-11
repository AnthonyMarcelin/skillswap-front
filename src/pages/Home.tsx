<<<<<<< HEAD
import Homepage from "../components/Homepage";
import Header from "../components/Header";
import { UserCard } from "@/components/UserCard";
import ReviewCard from "@/components/ReviewCard";
import SignupForm from "@/components/Forms/SignupForm";
import LoginForm from "../components/Forms/LoginForm";
=======
import Homepage from '../components/Homepage';
import Header from '../components/Header';
import { UserCard } from '@/components/UserCard';
import ReviewCard from '@/components/ReviewCard';
import Footer from '@/components/Footer';


>>>>>>> fc6c6a0077ebcbe91899e68210640c28f1a99c26

export default function Home() {
  return (
    <div>
      {/* Header */}
      <Header />

<<<<<<< HEAD
      {/* MainContent */}
      <Homepage />
      <UserCard />
      <ReviewCard />
      <LoginForm />
      <SignupForm />

      {/* Footer */}
=======
        {/* MainContent */}
        <Homepage />
  
        {/* Footer */}
        <Footer />
>>>>>>> fc6c6a0077ebcbe91899e68210640c28f1a99c26
    </div>
  );
}
