import React, { useState, useEffect } from "react";
import styles from "./NoteEditor.module.css";

function NoteEditor({ note, onUpdateNote }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (note) {
      setText(note.text);
    }
  }, [note]);

  const handleSave = () => {
    if (note) {
      onUpdateNote({ ...note, text });
    }
  };

  if (!note) {
    return <div>Заметка не найдена.</div>;
  }

  return (
    <div className={styles.noteEditor}>
      <textarea
        className={styles.textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите текст заметки..."
      />
      <button className={styles.button} onClick={handleSave}>Сохранить</button>
    </div>
  );
}

export default NoteEditor;
