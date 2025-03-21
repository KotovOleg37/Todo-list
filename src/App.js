import React, { useState } from "react";
import useLocalStorage from "./useLocalStorage";
import NoteList from "./NoteList";
import NoteEditor from "./NoteEditor";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  // как вариант, чтобы показать, что ты знаешь структуры данных, можешь использовать
  // для хранения notes Map(), а не объект. Тогда, например, при добавлении заметки
  //не надо будет спредить существующий массив, не будет перебора массива при удалении и апдейте заметки
  const [notes, setNotes] = useLocalStorage("notes", [
    { id: uuidv4(), text: "Это ваша первая заметка!" },
  ]);
  const [activeNote, setActiveNote] = useState(null);

  // я бы передавал в NoteList notes, setNotes и setActiveNote, а addNote, updateNote, deleteNote
  // объявил бы внутри NoteList
  const addNote = () => {
    const newNote = { id: uuidv4(), text: "Новая заметка" };
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
    <div className="app">
      <NoteList
        notes={notes}
        onAddNote={addNote}
        onDeleteNote={deleteNote}
        onSelectNote={setActiveNote}
        activeNote={activeNote}
      />
      {activeNoteData && ( // Проверяем, существует ли активная заметка
        <NoteEditor note={activeNoteData} onUpdateNote={updateNote} />
      )}
    </div>
  );
}

export default App;
