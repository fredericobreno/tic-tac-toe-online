'use server'

import { db } from '@/lib/firebase/admin'
import { User } from 'next-auth'

export const createMatch = async ({ player1 }: { player1: User }) => {
  const docRef = await db.collection('matches').add({
    player1,
    player2: null,
    winner: null,
    moveHistory: JSON.stringify([]),
  })

  return docRef.id
}

export const getMatchById = async (matchId: string) => {
  const docRef = db.collection('matches').doc(matchId)
  const docSnap = await docRef.get()

  return docSnap.exists ? docSnap.data() : null
}

export const joinMatch = async ({
  matchId,
  player2,
}: {
  matchId: string
  player2: User
}) => {
  const docRef = db.collection('matches').doc(matchId)

  await docRef.update({ player2 })
}

export const makeMove = async ({
  matchId,
  position,
}: {
  matchId: string
  position: number
}) => {
  const docRef = db.collection('matches').doc(matchId)
  const docSnap = await docRef.get()
  const match = docSnap.data()

  if (match?.winner) return

  const moveHistory = JSON.parse(match?.moveHistory) as string[]
  const winningCombos = [
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8'],
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['0', '4', '8'],
    ['2', '4', '6'],
  ]
  let winner = null

  moveHistory.push(position.toString())

  if (moveHistory.length >= 5) {
    for (const combo of winningCombos) {
      const [a, b, c] = combo

      if (
        moveHistory.includes(a) &&
        moveHistory.includes(b) &&
        moveHistory.includes(c)
      ) {
        winner =
          moveHistory.indexOf(a) % 2 === 0
            ? match?.player1.name
            : match?.player2.name
        break
      }
    }
  }

  if (moveHistory.length === 9 && !winner) {
    winner = 'draw'
  }

  await docRef.update({
    moveHistory: JSON.stringify(moveHistory),
    winner,
  })
}

export const getMatchesByUserId = async (userId: string) => {
  const querySnapshot = await db
    .collection('matches')
    .where('player1.id', '==', userId)
    .get()

  return querySnapshot.docs.map((doc) => doc.data())
}
