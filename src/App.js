import React, { useState } from 'react';
import useLocalStorage from './useLocalStorage';
import NoteList from './NoteList';
import NoteEditor from './NoteEditor';
import { v4 as uuidv4 } from 'uuid';
import styles from './App.module.css'; 

function App() {
  const [notes, setNotes] = useLocalStorage('notes', [
    { id: uuidv4(), text: 'Это ваша первая заметка!' },
  ]);
  const [activeNote, setActiveNote] = useState(null);

  const addNote = () => {
    const newNote = { id: uuidv4(), text: 'Новая заметка' };
    setNotes([...notes, newNote]);
    setActiveNote(newNote.id);
  };

  const updateNote = (updatedNote) => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
  };

  const deleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
    setActiveNote(null); // Сбрасываем activeNote после удаления
  };

  const activeNoteData = notes.find((note) => note.id === activeNote);

  return (
    <div className={styles.app}>
      <NoteList
        notes={notes}
        onAddNote={addNote}
        onDeleteNote={deleteNote}
        onSelectNote={setActiveNote}
        activeNote={activeNote}
      />
      {activeNoteData && ( // Проверяем, существует ли активная заметка
        <NoteEditor note={activeNoteData} onUpdateNote={updateNote}
        />
      )}
    </div>
  );
}

export default App;