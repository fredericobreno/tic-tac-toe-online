import { User } from 'next-auth'

export type MatchType = {
  player1: User
  player2: User
  winner: string
  moveHistory: string
}
