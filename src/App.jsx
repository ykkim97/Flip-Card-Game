import { useEffect, useState } from 'react'
import styles from "./App.module.css";
import FlipCard from './components/FlipCard'
import Button from '@mui/material/Button';
import AddWordModal from './components/AddWordModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// create cards handler
const createShuffledCards = (words) => {
  const englishCards = words.map(word => ({ id: `${word.english}_${word.korean}_en`, text: word.english, isKorean: false })); // english words
  const koreanCards = words.map(word => ({ id: `${word.korean}_${word.english}_kr`, text: word.korean, isKorean: true })); // korean words
  const allCards = [...englishCards, ...koreanCards].sort(() => 0.5 - Math.random()); // random position
  return allCards;
};

// initial words
const initialWords = [
  { english: 'apple', korean: '사과' },
  { english: 'banana', korean: '바나나' },
  { english: 'cat', korean: '고양이' },
  { english: 'dog', korean: '개' },
  { english: 'car', korean: '자동차' },
  { english: 'house', korean: '집' },
  { english: 'book', korean: '책' },
  { english: 'tree', korean: '나무' }
];

function App() {
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // During initial rendering
  useEffect(() => {
    let getWordsFromStorage = localStorage.getItem('combineWords');
    if (getWordsFromStorage === null || getWordsFromStorage.length === 0) {
      const shuffledCards = createShuffledCards(initialWords);
      setCards(shuffledCards);
    } else {
      const shuffledCards = createShuffledCards(JSON.parse(getWordsFromStorage));
      setCards(shuffledCards);
    }
  }, [])

  // modal click handler
  const handleModal = () => {
    setShowModal(!showModal);
  }

  // words state
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

  // formdata change handler
  const handleNewWordChange = (index, key, value) => {
    if (key === 'english' && /[^a-zA-Z]/.test(value)) {
      toast("영어단어를 입력해주세요.");
      return;
    }
    if (key === 'korean' && /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(value)) {
      toast("한국어를 입력해주세요.");
      return;
    }

    const updatedNewWords = newWords.map((word, i) => {
      if (i === index) {
        return { ...word, [key]: value };
      }
      return word;
    });
    setNewWords(updatedNewWords);
  };

  // add words handler
  const handleAddWords = () => {
    const newWordsToAdd = newWords.filter(word => word.english && word.korean);
    if (newWordsToAdd.length === 8) {
      const combinedWords = [...newWordsToAdd];
      localStorage.setItem('combineWords', JSON.stringify(combinedWords));
      setCards(createShuffledCards(combinedWords));
      setShowModal(!showModal)
      toast("단어가 추가되었습니다.");
    } else {
      alert("8세트를 입력해주세요.");
    }
  };

  // shuffle cards handler
  const handleShuffle = () => {
    let getWordsFromStorage = localStorage.getItem('combineWords');
    if (getWordsFromStorage === null || getWordsFromStorage.length === 0) {
      const shuffledCards = createShuffledCards(initialWords);
      setCards(shuffledCards);
    } else {
      const shuffledCards = createShuffledCards(JSON.parse(getWordsFromStorage));
      setCards(shuffledCards);
    }
    toast("Complete!");
  }

  return (
    <>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Flip Word Card!</h1>
      </div>
      <div className={styles.menuContainer}>
        {/* Add button */}
        <Button 
          className={styles.addWordButton}
          onClick={handleModal}
          color='success'
          variant='contained'
        >
          Add
        </Button>

        <div className={styles.gap}></div>

        {/* Shuffle button */}
        <Button 
          className={styles.shuffledCardsButton}
          onClick={handleShuffle} 
          color='info'
          variant='contained'
        >
          Shuffle
        </Button>
      </div>

      {/* Cards Component */}
      <div className={styles.container}>
        <div className={styles.CardContainer}>
          <FlipCard cards={cards} setCards={setCards}/>
        </div>
      </div>

      {/* Modal Component */}
      {showModal ? (
        <AddWordModal 
          newWords={newWords}
          handleNewWordChange={handleNewWordChange}
          handleAddWords={handleAddWords}
          setShowModal={setShowModal}
        />
      ) : null}

      {/* Toast Message Container */}
      <ToastContainer />
    </>
  )
}

export default App
