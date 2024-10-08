'use client'
import { useCallback, useEffect, useState } from 'react'
import styles from './index.module.scss'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase/firestore'
import { makeMove } from '@/actions/match'
import { MatchType } from '@/types'
import { useSession } from 'next-auth/react'

type TicTacToeProps = {
  matchId: string
}

export const TicTacToe = ({ matchId }: TicTacToeProps) => {
  const session = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const [match, setMatch] = useState<MatchType>()
  const [player, setPlayer] = useState('O')
  const [board, setBoard] = useState(Array(9).fill(null))
  const [winner, setWinner] = useState('')

  const handleCellClick = useCallback(
    async (index: number) => {
      const disabled = !match?.player2
      const isMyTurn =
        (board.filter(Boolean).length % 2 === 0 &&
          session.data?.user.id === match?.player1.id) ||
        (board.filter(Boolean).length % 2 === 1 &&
          session.data?.user.id === match?.player2.id)

      if (!isMyTurn || disabled || winner) return

      await makeMove({
        matchId,
        position: index,
      })
    },
    [
      board,
      match?.player1.id,
      match?.player2,
      matchId,
      session.data?.user.id,
      winner,
    ],
  )

  useEffect(() => {
    const docRef = doc(db, 'matches', matchId)

    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const _match = doc.data()

        setMatch(_match as MatchType)
      }
    })

    return () => unsubscribe()
  }, [matchId])

  useEffect(() => {
    if (match?.moveHistory) {
      setIsLoading(false)

      const moveHistory = JSON.parse(match.moveHistory) as string[]
      const newBoard = Array(9).fill(null)

      moveHistory.forEach((position, i) => {
        newBoard[+position] = i % 2 === 0 ? 'O' : 'X'
      })

      setBoard(newBoard)
      setPlayer(moveHistory.length % 2 === 0 ? 'O' : 'X')
    }

    if (match?.winner) {
      setWinner(match.winner)
    }
  }, [match])

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= '9') {
        const number = parseInt(e.key, 10)
        handleCellClick(number)
      }
    }

    window.addEventListener('keydown', listener)

    return () => window.removeEventListener('keydown', listener)
  }, [handleCellClick])

  if (isLoading) return null

  return (
    <div className={styles.wrapper}>
      <div className={styles.nextPlayer}>
        Next player:
        <span className={styles.currentPlayer}> {player}</span>
      </div>
      <div className={styles.board}>
        {board.map?.((value, i) => (
          <div
            key={i}
            className={styles.cell}
            onClick={() => handleCellClick(i)}
          >
            {value}
          </div>
        ))}
      </div>
      {winner && (
        <div className={styles.winnerWrapper}>
          🎉 Winner: <span className={styles.winner}>{winner}</span> 🥳
        </div>
      )}
    </div>
  )
}
