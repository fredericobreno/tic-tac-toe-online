'use client'
import { signIn } from 'next-auth/react'
import { GithubLoginButton as GithubLoginButtonLib } from 'react-social-login-buttons'
import styles from './styles.module.scss'

export const GithubLoginButton = () => {
  const handleGithubLogin = () => {
    signIn('github', { callbackUrl: `/play` })
  }

  return (
    <GithubLoginButtonLib
      className={styles.button}
      onClick={handleGithubLogin}
    />
  )
}
