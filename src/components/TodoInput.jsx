import React, { useState } from 'react';

function TodoInput({ dispatch }) {
    const [input, setInput] = useState('');

    const handleAdd = () => {
        if (!input.trim()) return;
        dispatch({ type: 'ADD_TODO', payload: input.trim() });
        setInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleAdd();
    };

    return (
        <div style={styles.wrapper}>
            <input
                type="text"
                placeholder="Add a new todo..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                style={styles.input}
            />
            <button onClick={handleAdd} style={styles.button}>
                Add
            </button>
        </div>
    );
}

const styles = {
    wrapper: {
        display: 'flex',
        gap: '10px',
        width: '100%',
        maxWidth: '480px'
    },
    input: {
        flex: 1,
        padding: '12px 16px',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.15)',
        background: 'rgba(255,255,255,0.08)',
        color: '#ffffff',
        fontSize: '15px',
        outline: 'none'
    },
    button: {
        padding: '12px 24px',
        background: 'linear-gradient(135deg, #7c4dff, #448aff)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '15px',
        cursor: 'pointer'
    }
};

export default TodoInput;