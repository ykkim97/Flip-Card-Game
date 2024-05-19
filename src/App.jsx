import { useState } from 'react'
import styles from "./App.module.css";
import FlipCard from './components/FlipCard'




function App() {
  return (
    <>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Flip Word Card!</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.CardContainer}>
          <FlipCard />
        </div>
      </div>
    </>
  )
}

export default App
