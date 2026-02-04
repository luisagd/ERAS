import React, { useState } from 'react';

export default function CardEditor({ cards, onAdd, onDelete }) {
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');

    function handleAdd(e) {
        e && e.preventDefault();
        if (front.trim() === '' || back.trim() === '') {
            // simple feedback - could be improved with inline validation
            alert('Both front and back text are required (non-empty).');
            return;
        }
        onAdd({ front: front.trim(), back: back.trim() });
        setFront('');
        setBack('');
    }

    return (
        <div className="card-editor">
            <h2>Card Editor</h2>

            <table className="cards-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Front</th>
                        <th>Back</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cards.map((c, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{c.front}</td>
                            <td>{c.back}</td>
                            <td>
                                <button onClick={() => onDelete(i)} disabled={cards.length <= 1}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <form className="add-form" onSubmit={handleAdd}>
                <input
                    aria-label="front"
                    placeholder="Front"
                    value={front}
                    onChange={(e) => setFront(e.target.value)}
                />
                <input
                    aria-label="back"
                    placeholder="Back"
                    value={back}
                    onChange={(e) => setBack(e.target.value)}
                />
                <button type="submit">Add Card</button>
            </form>
        </div>
    );
}
