import React from 'react';

function TodoItem({ todo, dispatch }) {
    return (
        <div style={styles.item}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
                style={styles.checkbox}
            />
            <span style={{
                ...styles.text,
                textDecoration: todo.completed ? 'line-through' : 'none',
                opacity: todo.completed ? 0.5 : 1
            }}>
                {todo.text}
            </span>
            <button
                onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
                style={styles.deleteBtn}
            >
                ✕
            </button>
        </div>
    );
}

const styles = {
    item: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px',
        padding: '12px 16px',
        marginBottom: '8px'
    },
    checkbox: {
        width: '18px',
        height: '18px',
        cursor: 'pointer',
        accentColor: '#7c4dff'
    },
    text: {
        flex: 1,
        fontSize: '15px',
        color: '#ffffff'
    },
    deleteBtn: {
        background: 'none',
        border: 'none',
        color: 'rgba(255,255,255,0.4)',
        fontSize: '16px',
        cursor: 'pointer',
        padding: '0 4px'
    }
};

export default TodoItem;