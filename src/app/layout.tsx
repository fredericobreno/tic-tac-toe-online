import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import styles from './styles.module.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tic Tac Toe Online',
  description: 'Play tic tac toe online with your friends',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${styles.wrapper}`}>{children}</body>
    </html>
  )
}
