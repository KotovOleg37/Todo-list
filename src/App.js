import React, { useState } from 'react';
import useLocalStorage from './useLocalStorage';
import NoteList from './NoteList';
import NoteEditor from './NoteEditor';
import { v4 as uuidv4 } from 'uuid';
import styles from './App.module.css';

function App() {
  const [notes, setNotes] = useLocalStorage('notes', [
    { id: uuidv4(), title: 'Первая заметка', text: 'Это ваша первая заметка!' },
  ]);
  const [activeNote, setActiveNote] = useState(null);
  const [isCreatingNote, setIsCreatingNote] = useState(false); // Состояние для создания новой заметки
  const [newNoteTitle, setNewNoteTitle] = useState(''); // Заголовок новой заметки

  const startCreatingNote = () => {
    setIsCreatingNote(true); // Открываем модальное окно для ввода заголовка
  };

  const addNote = () => {
    const newNote = {
      id: uuidv4(),
      title: newNoteTitle || 'Новая заметка', // Используем введенный заголовок или значение по умолчанию
      text: '',
    };
    setNotes([...notes, newNote]);
    setActiveNote(newNote.id);
    setIsCreatingNote(false); // Закрываем модальное окно
    setNewNoteTitle(''); // Сбрасываем поле ввода
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
    setActiveNote(null);
  };

  const activeNoteData = notes.find((note) => note.id === activeNote);

  return (
    <div className={styles.app}>
      <NoteList
        notes={notes}
        onAddNote={startCreatingNote} // Используем новую функцию для создания заметки
        onDeleteNote={deleteNote}
        onSelectNote={setActiveNote}
        activeNote={activeNote}
      />
      {isCreatingNote && ( // Модальное окно для ввода заголовка
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Введите заголовок заметки</h2>
            <input
              type="text"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              placeholder="Заголовок заметки"
              className={styles.modalInput}
            />
            <div className={styles.modalButtons}>
              <button onClick={addNote} className={styles.modalButton}>
                Создать
              </button>
              <button
                onClick={() => setIsCreatingNote(false)}
                className={styles.modalButtonCancel}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
      {activeNoteData && (
        <NoteEditor
          note={activeNoteData}
          onUpdateNote={updateNote}
        />
      )}
    </div>
  );
}

export default App;