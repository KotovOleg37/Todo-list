import React from 'react';
import { FaTrash } from 'react-icons/fa';
import styles from './NoteList.module.css';

const stripHtmlTags = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

function NoteList({ notes, onAddNote, onDeleteNote, onSelectNote, activeNote }) {
  return (
    <div className={styles.noteList}>
      <button className={styles.button} onClick={onAddNote}>
        Добавить заметку
      </button>
      {notes.map((note) => (
        <div
          key={note.id}
          className={`${styles.noteItem} ${note.id === activeNote ? styles.noteItemActive : ''}`}
          onClick={() => onSelectNote(note.id)}
        >
          <h3 className={styles.noteTitle}>{note.title}</h3> {/* Отображаем заголовок */}
          <p className={styles.noteText}>{stripHtmlTags(note.text.substring(0, 50))}...</p> {/* Отображаем текст без тегов */}
          <button
            className={styles.deleteButton}
            onClick={(e) => {
              e.stopPropagation();
              onDeleteNote(note.id);
            }}
          >
            <FaTrash size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default NoteList;