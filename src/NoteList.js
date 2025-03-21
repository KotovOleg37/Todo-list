import React from 'react';

function NoteList({ notes, onAddNote, onDeleteNote, onSelectNote, activeNote }) {
  return (
    <div className="note-list">
      <button onClick={onAddNote}>Добавить заметку</button>
      {notes.map((note) => (
        <div
          key={note.id}
          className={`note-item ${note.id === activeNote ? 'active' : ''}`}
          onClick={() => onSelectNote(note.id)}
        >
          <span>{note.text.substring(0, 20)}...</span>
          <button onClick={() => onDeleteNote(note.id)}>Удалить</button>
        </div>
      ))}
    </div>
  );
}

export default NoteList;