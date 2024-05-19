import React from "react";
import styles from "./AddWordModal.module.css"
import TextField from '@mui/material/TextField';

const AddWordModal = () => {
    return (
        <div className={styles.container}>
            <h3>새 단어 등록</h3>
            <div className={styles.inputContainer}>
                <TextField
                    required
                    id="filled-required"
                    label="Required"
                    defaultValue="Hello World"
                    variant="filled"
                    className={styles.inputField}
                />
                <TextField
                    required
                    id="filled-required"
                    label="Required"
                    defaultValue="Hello World"
                    variant="filled"
                    className={styles.inputField}
                />
                
            </div>
        </div>
    )
}

export default AddWordModal;