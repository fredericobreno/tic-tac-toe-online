import styles from './login.module.scss'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { GithubLoginButton, GoogleLoginButton } from './components'
import { authOptions } from '@/lib/authOptions'

const LoginPage = async () => {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/play')
  }

  return (
    <div className={styles.wrapper}>
      <GithubLoginButton />
      <GoogleLoginButton />
    </div>
  )
}

export default LoginPage
