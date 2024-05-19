import React from "react";
import styles from "./AddWordModal.module.css";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';

const AddWordModal = ({
    setShowModal,
    newWords,
    handleNewWordChange,
    handleAddWords
}) => {
    return (
        <div className={styles.container}>
            <h3>새 단어 등록</h3>
            <div className={styles.inputContainer}>
                {newWords.map((word, index) => (
                    <div key={index} style={{ display:"flex",alignItems: "center" }}>
                        <TextField
                            required
                            id="filled-required"
                            label="Required"
                            placeholder="English"
                            variant="filled"
                            value={word.english}
                            onChange={(e) => handleNewWordChange(index, 'english', e.target.value)}
                            className={styles.inputField}
                        />
                        <div>👉</div>
                        <TextField
                            required
                            id="filled-required"
                            label="Required"
                            placeholder="한국어"
                            variant="filled"
                            value={word.korean}
                            onChange={(e) => handleNewWordChange(index, 'korean', e.target.value)}
                            className={styles.inputField}
                        />
                    </div>
                ))}

                <div className={styles.buttonContainer}>
                    <Button variant="outlined" color="success" onClick={(prev) => setShowModal(!prev)}>닫기</Button>
                    <Button variant="contained" color="success" onClick={handleAddWords}>추가</Button>
                </div>
            </div>
        </div>
    )
}

export default AddWordModal;