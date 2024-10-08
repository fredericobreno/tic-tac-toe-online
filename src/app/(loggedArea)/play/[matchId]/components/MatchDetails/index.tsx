'use client'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase/firestore'
import { MatchType } from '@/types'

type MatchDetailsProps = {
  matchId: string
}

export const MatchDetails = ({ matchId }: MatchDetailsProps) => {
  const [match, setMatch] = useState<MatchType>()

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

  if (!match) return null

  return (
    <div className={styles.matchDetails}>
      <h2>Match Details</h2>
      <p>
        <span>0:</span> {match.player1.name || 'Loading...'}
      </p>
      <p>
        <span>X:</span> {match.player2?.name || 'Waiting for player 2'}
      </p>
    </div>
  )
}
