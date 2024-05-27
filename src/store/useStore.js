import { toast } from "react-toastify";
import { create } from "zustand";

// create cards handler
export const createShuffledCards = (words) => {
    const englishCards = words.map(word => ({ id: `${word.english}_${word.korean}_en`, text: word.english, isKorean: false })); // english words
    const koreanCards = words.map(word => ({ id: `${word.korean}_${word.english}_kr`, text: word.korean, isKorean: true })); // korean words
    const allCards = [...englishCards, ...koreanCards].sort(() => 0.5 - Math.random()); // random position
    return allCards;
};

const useStore = create((set) => ({
    cards: [],
    setCards: (cards) => set({ cards }),

    showModal: false,
    setShowModal: (showModal) => set({ showModal }),

    newWords: Array(8).fill({ english: '', korean: '' }),
    setNewWords: (newWords) => set({ newWords }),

    loadInitialWords: (initialWords) => {
        let getWordsFromStorage = localStorage.getItem('combineWords');
        if (getWordsFromStorage === null || getWordsFromStorage.length === 0) {
            const shuffledCards = createShuffledCards(initialWords);
            set({ cards: shuffledCards });
        } else {
            const shuffledCards = createShuffledCards(JSON.parse(getWordsFromStorage));
            set({ cards: shuffledCards });
        }
    },

    addWords: (newWords) => {
        const newWordsToAdd = newWords.filter(word => word.english && word.korean);
        if (newWordsToAdd.length === 8) {
            const combinedWords = [...newWordsToAdd];
            localStorage.setItem('combineWords', JSON.stringify(combinedWords));
            set({ cards: createShuffledCards(combinedWords), showModal: false });
            toast("단어가 추가되었습니다.");
        } else {
            alert("8세트를 입력해주세요.");
        }
    },

    shuffleCards: (initialWords) => {
        let getWordsFromStorage = localStorage.getItem('combineWords');
        if (getWordsFromStorage === null || getWordsFromStorage.length === 0) {
            const shuffledCards = createShuffledCards(initialWords);
            set({ cards : shuffledCards });
        } else {
            const shuffledCards = createShuffledCards(JSON.parse(getWordsFromStorage));
            set({ cards : shuffledCards });
        }
        toast("Complete!");
    }
}))

export default useStore;