import { getMatchesByUserId } from '@/actions/match'
import styles from './styles.module.scss'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import Image from 'next/image'

const HistoryPage = async () => {
  const session = await getServerSession(authOptions)
  const matches = await getMatchesByUserId(session?.user.id || '')
  console.log(matches)
  return (
    <div className={styles.wrapper}>
      <h2>History</h2>
      <div className={styles.matchesWrapper}>
        {matches.map((match, index) => (
          <div key={index} className={styles.matchWrapper}>
            <div className={styles.images}>
              <Image
                alt="player 1 image"
                src={match.player1.image}
                width={64}
                height={64}
              />
              vs
              {match.player2?.image ? (
                <Image
                  alt="player 2 image"
                  src={match.player2.image}
                  width={64}
                  height={64}
                />
              ) : (
                <div className={styles.emptyImage} />
              )}
            </div>
            {match.winner && (
              <p>
                <strong>{match.winner}</strong> winner 🎉
              </p>
            )}
            {(JSON.parse(match.moveHistory) as string[]).map((move, index) => (
              <p key={index}>
                {index % 2 === 0 ? 'Player 1' : 'Player 2'}: {move}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default HistoryPage
