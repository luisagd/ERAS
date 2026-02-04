import React, { useState } from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';
import './styles.css';

export default function App() {
  // initial sample cards
  const [cards, setCards] = useState([
    { front: 'Hello', back: 'Hola' },
    { front: 'Goodbye', back: 'Adiós' },
  ]);

  // mode: 'editor' or 'viewer'
  const [mode, setMode] = useState('editor');

  function addCard(card) {
    setCards((prev) => [...prev, card]);
  }

  function deleteCard(index) {
    // prevent removing the last card
    setCards((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  }

  return (
    <div className="app-root">
      <header>
        <h1>Flashcards</h1>
        <div className="top-controls">
          <button onClick={() => setMode((m) => (m === 'editor' ? 'viewer' : 'editor'))}>
            {mode === 'editor' ? 'Open Viewer' : 'Open Editor'}
          </button>
        </div>
      </header>

      <main>
        {mode === 'editor' ? (
          <CardEditor cards={cards} onAdd={addCard} onDelete={deleteCard} />
        ) : (
          <CardViewer cards={cards} />
        )}
      </main>
    </div>
  );
}
