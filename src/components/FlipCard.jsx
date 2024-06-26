import React, { useState, useEffect } from "react";
import Card from "./Card";
import styled from "styled-components";
import Popup from "./Popup";
import useStore, { createShuffledCards } from "../store/useStore";
import { initialWords } from "../data/initialWords";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    justify-items: center;
    align-items: center;
    padding: 20px;
    background-color: #f0f0f0;
`;

const FlipCard = () => {
    const { cards, setCards } = useStore();
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [gameEnded, setGameEnded] = useState(false);
    const [timeElapsed,setTimeElapsed] = useState(0);

    useEffect(() => {
        const shuffledCards = createShuffledCards(initialWords);
        setCards(shuffledCards);
    }, []);

    const handleCardClick = (id) => {
        if (flipped.length === 2 || matched.includes(id) || flipped.includes(id)) return;
    
        const clickedCard = cards.find(card => card.id === id);
        const matchingFlippedCard = flipped
            .map(flippedId => cards.find(card => card.id === flippedId))
            .find(flippedCard => {
                const isMeaningMatch = (
                    (flippedCard?.isKorean && clickedCard?.isKorean && flippedCard.id.split('_')[0] === clickedCard?.id.split('_')[0]) ||
                    (!flippedCard?.isKorean && !clickedCard?.isKorean && flippedCard.id.split('_')[0] === clickedCard?.id.split('_')[0])
                );
                return isMeaningMatch;
            });
        if (matchingFlippedCard) {
            setMatched(prev => [...prev, matchingFlippedCard.id, clickedCard.id]);
        }
        setFlipped(prev => [...prev, id]);
    };

    const handleRestart = () => {
        setGameEnded(false);
        setTimeElapsed(0);
        setFlipped([]);
        setMatched([]);
        let getWordsFromStorage = localStorage.getItem('combineWords');
        if (getWordsFromStorage === null || getWordsFromStorage.length === 0) {
            const shuffledCards = createShuffledCards(initialWords);
            setCards(shuffledCards);
        } else {
            const shuffledCards = createShuffledCards(JSON.parse(getWordsFromStorage));
            setCards(shuffledCards);
        }
    };

    useEffect(() => {
        if (flipped.length === 2) {
            const [firstCard, secondCard] = flipped.map(id => cards.find(card => card.id === id));
            if (
                (firstCard.isKorean && secondCard.id.split('_')[0] === firstCard.id.split('_')[1]) ||
                (!firstCard.isKorean && secondCard.isKorean && firstCard.id.split('_')[1] === secondCard.id.split('_')[0])
            ) {
                setMatched(prev => [...prev, firstCard.id, secondCard.id]);
            }
            setTimeout(() => setFlipped([]), 1000);
        }
    }, [flipped, cards]);

    useEffect(() => {
        const matchedIds = matched.map(id => id.split('_')[0]);
        if (matchedIds.length === initialWords.length * 2) {
            setGameEnded(true);
        }
    }, [matched, initialWords.length]);

    return (
        <>
            <GridContainer>
                {cards.map(card => (
                    <Card
                        key={card.id}
                        card={card}
                        isFlipped={flipped.includes(card.id) || matched.includes(card.id)}
                        isMatched={matched.includes(card.id)}
                        onClick={() => handleCardClick(card.id)}
                    />
                ))}
            </GridContainer>
            
            {gameEnded && (
                <Popup handleRestart={handleRestart} timeElapsed={timeElapsed} />
            )}
        </>
    );
}

export default FlipCard;
