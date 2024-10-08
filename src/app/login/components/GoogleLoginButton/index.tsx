'use client'
import { signIn } from 'next-auth/react'
import { GoogleLoginButton as GoogleLoginButtonMain } from 'react-social-login-buttons'
import styles from './styles.module.scss'

export const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: `/play` })
  }

  return (
    <GoogleLoginButtonMain
      className={styles.button}
      onClick={handleGoogleLogin}
    />
  )
}
