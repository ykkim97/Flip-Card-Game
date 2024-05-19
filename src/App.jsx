import { useState } from 'react'
import styles from "./App.module.css";
import FlipCard from './components/FlipCard'
import Button from '@mui/material/Button';
import AddWordModal from './components/AddWordModal';

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  }

  return (
    <>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Flip Word Card!</h1>
      </div>
      <div className={styles.menuContainer}>
        <Button 
          className={styles.addWordButton}
          onClick={handleModal}
          color='success'
          variant='contained'
        >
          단어 등록
        </Button>
      </div>
      <div className={styles.container}>
        <div className={styles.CardContainer}>
          <FlipCard />
        </div>
      </div>
      {showModal ? (
        <AddWordModal />
      ) : null}
    </>
  )
}

export default App
