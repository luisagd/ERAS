import React, { useState } from 'react';

export default function CardViewer({ cards }) {
    const [index, setIndex] = useState(0);
    const [showFront, setShowFront] = useState(true);

    function toggleFlip() {
        setShowFront((s) => !s);
    }

    function next() {
        setIndex((i) => Math.min(cards.length - 1, i + 1));
        setShowFront(true);
    }

    function prev() {
        setIndex((i) => Math.max(0, i - 1));
        setShowFront(true);
    }

    if (!cards || cards.length === 0) {
        return <div>No cards to view.</div>;
    }

    return (
        <div className="card-viewer">
            <h2>Card Viewer</h2>
            <div className="flashcard" onClick={toggleFlip} role="button" tabIndex={0}>
                <div className="card-content">{showFront ? cards[index].front : cards[index].back}</div>
            </div>

            <div className="viewer-controls">
                <button onClick={prev} disabled={index === 0}>
                    Previous
                </button>

                <div className="progress">Card {index + 1}/{cards.length}</div>

                <button onClick={next} disabled={index === cards.length - 1}>
                    Next
                </button>
            </div>
        </div>
    );
}
