import React from "react";
import { FaTrash } from "react-icons/fa";
import styles from "./NoteList.module.css";

function NoteList({
  notes,
  onAddNote,
  onDeleteNote,
  onSelectNote,
  activeNote,
}) {
  return (
    <div className={styles.noteList}>
      <button className={styles.button} onClick={onAddNote}>
        Добавить заметку
      </button>
      {notes.map((note) => (
        <div
          key={note.id}
          className={`${styles.noteItem} ${
            note.id === activeNote ? styles.noteItemActive : ""
          }`}
          onClick={() => onSelectNote(note.id)}
        >
          <h3 className={styles.noteTitle}>{note.title}</h3>{" "}
          <p className={styles.noteText} title={note.text}>
            {note.text.substring(0, 50)}...
          </p>{" "}
          <button
            className={styles.deleteButton}
            onClick={(e) => {
              e.stopPropagation();
              onDeleteNote(note.id);
            }}
          >
            <FaTrash />
          </button>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
