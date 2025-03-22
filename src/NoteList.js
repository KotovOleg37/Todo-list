import React from 'react';
import styles from './NoteList.module.css';

function NoteList({ notes, onAddNote, onDeleteNote, onSelectNote, activeNote }) {
  return (
    <div className={styles.noteList}> 
      <button className={styles.button} onClick={onAddNote}>Добавить заметку</button>
      {notes.map((note) => (
        <div
          key={note.id}
          className={`note-item ${note.id === activeNote ? 'active' : ''}`}
          onClick={() => onSelectNote(note.id)}
        >
          <span>{note.text.substring(0, 20)}...</span>
          <button className={`${styles.button} ${styles.deleteButton}`} onClick={() => onDeleteNote(note.id)}>Удалить</button>
        </div>
      ))}
    </div>
  );
}

export default NoteList;