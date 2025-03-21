import React, { useState, useEffect } from 'react';

function NoteEditor({ note, onUpdateNote }) {
  const [text, setText] = useState('');

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
    <div className="note-editor">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите текст заметки..."
      />
      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
}

export default NoteEditor;