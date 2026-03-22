import React, { useReducer, useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';
import TodoFilter from './components/TodoFilter';

function reducer(state, action) {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, {
                id: Date.now(),
                text: action.payload,
                completed: false,
                completedAt: null
            }];
        case 'DELETE_TODO':
            return state.filter(todo => todo.id !== action.payload);
        case 'TOGGLE_TODO':
            return state.map(todo =>
                todo.id === action.payload
                    ? {
                        ...todo,
                        completed: !todo.completed,
                        completedAt: !todo.completed ? Date.now() : null
                    }
                    : todo
            );
        case 'PURGE_EXPIRED':
            const sevenDays = 7 * 24 * 60 * 60 * 1000;
            return state.filter(todo =>
                !todo.completed ||
                !todo.completedAt ||
                Date.now() - todo.completedAt < sevenDays
            );
        default:
            return state;
    }
}

function App() {
    const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    const [todos, dispatch] = useReducer(reducer, savedTodos);
    const [filter, setFilter] = useState('all');

    React.useEffect(() => {
        dispatch({ type: 'PURGE_EXPIRED' });
    }, []);

    React.useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>My Todos</h1>
            <TodoInput dispatch={dispatch} />
            <TodoFilter filter={filter} setFilter={setFilter} />
            <div style={styles.list}>
                {filteredTodos.length === 0
                    ? <p style={styles.empty}>No todos here.</p>
                    : filteredTodos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            dispatch={dispatch}
                        />
                    ))
                }
            </div>
            {filter === 'completed' && todos.some(t => t.completed) && (
                <p style={styles.expiry}>
                    Completed todos are automatically removed after 7 days.
                </p>
            )}
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '60px 20px',
        fontFamily: 'Segoe UI, sans-serif',
        color: '#ffffff'
    },
    heading: {
        fontSize: '32px',
        marginBottom: '24px',
        background: 'linear-gradient(90deg, #e040fb, #7c4dff, #448aff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
    },
    list: {
        width: '100%',
        maxWidth: '480px',
        marginTop: '16px'
    },
    empty: {
        textAlign: 'center',
        color: 'rgba(255,255,255,0.4)',
        fontSize: '14px'
    },
    expiry: {
        marginTop: '16px',
        fontSize: '12px',
        color: 'rgba(255,255,255,0.3)',
        textAlign: 'center'
    }
};

export default App;