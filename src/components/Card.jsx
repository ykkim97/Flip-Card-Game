import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
    width: 100px;
    height: 150px;
    perspective: 1000px;
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
`;

const CardFront = styled(CardFace)`
    background-color: #ffcc00;
    transform: rotateY(180deg);
`;

const CardBack = styled(CardFace)`
    background-color: #333;
    color: white;
`;

// const CardFront = styled(CardFace)`
//     background-color: #ffcc00;
// `;

// const CardBack = styled(CardFace)`
//     background-color: #333;
//     color: white;
//     transform: rotateY(180deg);
// `;

const Card = ({ card, isFlipped, onClick }) => {
    return (
        <CardContainer onClick={onClick}>
            <CardInner isFlipped={isFlipped}>
                <CardFront>
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
