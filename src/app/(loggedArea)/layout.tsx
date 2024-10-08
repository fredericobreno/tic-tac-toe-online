import { Sidebar } from '@/components/Sidebar'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'
import styles from './styles.module.scss'
import { SessionProvider } from '@/providers/SessionProvider'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const Layout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <SessionProvider>
      <div className={styles.wrapper}>
        <Sidebar />
        <div className={styles.content}>{children}</div>
      </div>
    </SessionProvider>
  )
}

export default Layout
