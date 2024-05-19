import React from "react";
import styled from "styled-components";
import Button from '@mui/material/Button';

const PopupContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border: 2px solid #ccc;
`

const PopupContent = styled.div`
    text-align: center;
`;

const Popup = ({
    handleRestart,
    timeElapsed
}) => {
    return (
        <>
            <PopupContainer>
                <PopupContent>
                    <h2>Congratulations!!</h2>
                    <p>You have matched all the cards.</p>
                    <Button variant="contained" color="success" onClick={handleRestart}>Play Again</Button>
                </PopupContent>
            </PopupContainer>
        </>
    )
}

export default Popup;