import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import styles from './styles.module.scss'

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export const Button = ({ className, ...rest }: ButtonProps) => {
  return <button {...rest} className={`${styles.button} ${className}`} />
}
