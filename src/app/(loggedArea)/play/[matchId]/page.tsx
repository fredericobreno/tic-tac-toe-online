import { getMatchById, joinMatch } from '@/actions/match'
import styles from './styles.module.scss'
import { redirect } from 'next/navigation'
import { TicTacToe } from '@/components/TicTacToe'
import { getServerSession } from 'next-auth'
import { ShareLink } from './components/ShareLink'
import { MatchDetails } from './components/MatchDetails'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

type MatchPageProps = {
  params: {
    matchId: string
  }
}

const MatchPage = async ({ params: { matchId } }: MatchPageProps) => {
  const session = await getServerSession(authOptions)
  const match = await getMatchById(matchId)

  if (!match) {
    redirect('/play')
  }

  if (!match.player2 && match.player1.id !== session?.user.id) {
    const session = await getServerSession(authOptions)

    if (session?.user?.id) {
      joinMatch({
        matchId,
        player2: session?.user,
      })
    }
  }

  return (
    <div className={styles.wrapper}>
      <ShareLink matchId={matchId} />
      <MatchDetails matchId={matchId} />
      <TicTacToe matchId={matchId} />
    </div>
  )
}

export default MatchPage
