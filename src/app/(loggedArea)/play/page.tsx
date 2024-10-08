import { StartNewMatchButton } from '../../../components/Sidebar/StartNewGameButton'
import styles from './styles.module.scss'

const PlayPage = async () => {
  return (
    <div className={styles.wrapper}>
      <StartNewMatchButton />
    </div>
  )
}

export default PlayPage
