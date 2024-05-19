import { useState } from 'react'
import styles from "./App.module.css";
import FlipCard from './components/FlipCard'
import Button from '@mui/material/Button';
import AddWordModal from './components/AddWordModal';

const createShuffledCards = (words) => {
  const englishCards = words.map(word => ({ id: `${word.english}_${word.korean}_en`, text: word.english, isKorean: false }));
  const koreanCards = words.map(word => ({ id: `${word.korean}_${word.english}_kr`, text: word.korean, isKorean: true }));
  const allCards = [...englishCards, ...koreanCards].sort(() => 0.5 - Math.random());
  return allCards;
};

function App() {
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  }

  const [newWords, setNewWords] = useState([
    { english: '', korean: '' },
    { english: '', korean: '' },
    { english: '', korean: '' },
    { english: '', korean: '' },
    { english: '', korean: '' },
    { english: '', korean: '' },
    { english: '', korean: '' },
    { english: '', korean: '' },
  ]);

  const handleNewWordChange = (index, key, value) => {
    const updatedNewWords = newWords.map((word, i) => {
        if (i === index) {
            return { ...word, [key]: value };
        }
        return word;
    });
    setNewWords(updatedNewWords);
  };

  const handleAddWords = () => {
      const newWordsToAdd = newWords.filter(word => word.english && word.korean);
      if (newWordsToAdd.length === 8) {
          const combinedWords = [...newWordsToAdd];
          setCards(createShuffledCards(combinedWords));
      } else {
          alert("Please fill in all 8 word pairs.");
      }
  };

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
          <FlipCard cards={cards} setCards={setCards}/>
        </div>
      </div>
      {showModal ? (
        <AddWordModal 
          newWords={newWords}
          handleNewWordChange={handleNewWordChange}
          handleAddWords={handleAddWords}
          setShowModal={setShowModal}
        />
      ) : null}
    </>
  )
}

export default App
