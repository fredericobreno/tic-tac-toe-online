import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const Home = async () => {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/play')
  } else {
    redirect('/login')
  }
}

export default Home
