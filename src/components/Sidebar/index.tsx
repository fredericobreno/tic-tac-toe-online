import { getServerSession } from 'next-auth'
import styles from './styles.module.scss'
import Image from 'next/image'
import { StartNewMatchButton } from './StartNewGameButton'
import Link from 'next/link'
import { Button } from '..'
import { Logout } from '../Logout'
import { authOptions } from '@/lib/authOptions'

export const Sidebar = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <h1>Tic Tac Toe Online</h1>
        <StartNewMatchButton />
        <Link href="/history" passHref>
          <Button>History</Button>
        </Link>
        <Logout />
      </div>
      <div className={styles.profile}>
        <Image
          alt="profile image"
          src={session?.user?.image || ''}
          className={styles.image}
          width={64}
          height={64}
        />
        <p className={styles.name}>{session?.user?.name}</p>
      </div>
    </div>
  )
}
