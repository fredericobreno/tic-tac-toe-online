'use client'

import { createMatch } from '@/actions/match'
import { Button } from '@/components/Button'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export const StartNewMatchButton = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const handleStartNewMatchClick = async () => {
    if (session?.user?.id) {
      const matchId = await createMatch({ player1: session.user })
      router.push(`/play/${matchId}`)
    }
  }

  return <Button onClick={handleStartNewMatchClick}>Start new match</Button>
}
