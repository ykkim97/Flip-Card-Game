import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const bounce = keyframes`
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
`;

const CardContainer = styled.div`
    width: 100px;
    height: 150px;
    perspective: 1000px;
    &:hover {
        animation: ${bounce} 0.3s linear;
    }
    cursor: pointer;
`;

const CardInner = styled.div`
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    position: relative;
    transform: ${({ isFlipped }) => (isFlipped ? 'rotateY(180deg)' : 'rotateY(0)')};
`;

const CardFace = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.35), 
                0 6px 20px rgba(0, 0, 0, 0.35);
    transition: background-color 1s ease-in-out;
`;

const CardFront = styled(CardFace)`
    // background-color: #ffcc00;
    background-color: ${({ isMatched }) => (isMatched ? '#2bc71d' : '#ffcc00')};
    font-size: 17px;
    transform: rotateY(180deg);
`;

const CardBack = styled(CardFace)`
    background-color: #333;
    font-size: 17px;
    color: white;
`;

const Card = ({ card, isFlipped, onClick, isMatched }) => {

    return (
        <CardContainer onClick={onClick}>
            <CardInner isFlipped={isFlipped}>
                <CardFront isMatched={isMatched}>
                    {card.text}
                </CardFront>
                <CardBack>
                    ❓
                </CardBack>
            </CardInner>
        </CardContainer>
    );
}

export default Card;
