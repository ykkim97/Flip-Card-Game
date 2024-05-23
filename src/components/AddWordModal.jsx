import React, { useRef } from "react";
import styles from "./AddWordModal.module.css";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import * as XLSX from 'xlsx';
import { toast } from "react-toastify";

const AddWordModal = ({
    setShowModal,
    newWords,
    handleNewWordChange,
    handleAddWords,
    setCards,
    createShuffledCards
}) => {
    const fileInputRef = useRef();

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const parsedWords = [];
            for (let i = 1; ; i++) {
                const englishCell = `A${i}`;
                const koreanCell = `B${i}`;
    
                if (!sheet[englishCell] && !sheet[koreanCell]) {
                    break;
                }
    
                const english = (sheet[englishCell]?.v || '').trim();
                const korean = (sheet[koreanCell]?.v || '').trim();

                parsedWords.push({ english, korean });
            }

            localStorage.setItem('combineWords', JSON.stringify(parsedWords));
            const shuffledCards = createShuffledCards(parsedWords);
            setCards(shuffledCards);
            setShowModal((prev) => !prev);
            toast("Complete!");
        };
        reader.readAsArrayBuffer(file);
    };
    
    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div className={styles.container}>
            <h3>새 단어 등록</h3>
            <input
                type="file"
                accept=".xlsx, .xls"
                ref={fileInputRef}
                onChange={handleFileUpload}
                style={{ display: 'none' }}
            />
            <div className={styles.inputContainer}>
                {newWords.map((word, index) => (
                    <div key={index} style={{ display: "flex", alignItems: "center" }}>
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
                    <Button variant="outlined" color="success" onClick={() => setShowModal(prev => !prev)}>닫기</Button>
                    <Button variant="contained" color="success" onClick={handleAddWords}>추가</Button>
                    <Button variant="contained" color="info" onClick={triggerFileInput}>Excel</Button>
                </div>
            </div>
        </div>
    );
}

export default AddWordModal;
