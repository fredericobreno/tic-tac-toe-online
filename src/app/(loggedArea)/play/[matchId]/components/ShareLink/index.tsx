'use client'
import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase/firestore'

type ShareLinkProps = {
  matchId: string
}

export const ShareLink = ({ matchId }: ShareLinkProps) => {
  const [hasSecondPlayer, setHasSecondPlayer] = useState(true)

  useEffect(() => {
    const docRef = doc(db, 'matches', matchId)

    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const match = doc.data()

        setHasSecondPlayer(!!match.player2)
      }
    })

    return () => unsubscribe()
  }, [matchId])

  if (hasSecondPlayer) return null

  return (
    <div className={styles.shareLink}>
      <h3>Share this link with your friend to start playing:</h3>
      <h2>{typeof window !== 'undefined' && window.location.href}</h2>
    </div>
  )
}
