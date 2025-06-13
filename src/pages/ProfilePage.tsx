import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ReviewCard from '@/components/ReviewCard'
import { UserCard } from '@/components/UserCard'
import WishToRegister from '@/components/WishToRegister'


export default function ProfilePage() {
  return (
    <>
      <Header />
      <UserCard />
      <ReviewCard />
      <WishToRegister />
      <Footer />
    </>
  )
}
