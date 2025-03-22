import React, { useState, useEffect } from "react";
import styles from "./NoteEditor.module.css";

function NoteEditor({ note, onUpdateNote }) {
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);

  useEffect(() => {
    setTitle(note.title);
    setText(note.text);
  }, [note]);

  const handleSave = () => {
    onUpdateNote({ ...note, title, text });
  };

  return (
    <div className={styles.noteEditor}>
      <input
        type="text"
        className={styles.titleInput}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Введите заголовок..."
      />
      <textarea
        className={styles.textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите текст заметки..."
      />
      <button className={styles.button} onClick={handleSave}>
        Сохранить
      </button>
    </div>
  );
}

export default NoteEditor;
