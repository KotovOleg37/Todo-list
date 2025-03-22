import React, { useState, useEffect } from "react";
import RichTextEditor from "./RichTextEditor";
import styles from "./NoteEditor.module.css";

function NoteEditor({ note, onUpdateNote }) {
  const [content, setContent] = useState(note.text);

  useEffect(() => {
    setContent(note.text);
  }, [note]);

  const handleSave = () => {
    onUpdateNote({ ...note, text: content });
  };

  return (
    <div className={styles.noteEditor}>
      <RichTextEditor content={content} onUpdate={setContent} />
      <button className={styles.button} onClick={handleSave}>
        Сохранить
      </button>
    </div>
  );
}

export default NoteEditor;
