import React from 'react';

function TodoFilter({ filter, setFilter }) {
    const filters = ['all', 'active', 'completed'];

    return (
        <div style={styles.wrapper}>
            {filters.map(f => (
                <button
                    key={f}
                    onClick={() => setFilter(f)}
                    style={{
                        ...styles.btn,
                        background: filter === f
                            ? 'linear-gradient(135deg, #7c4dff, #448aff)'
                            : 'rgba(255,255,255,0.08)',
                        color: filter === f ? '#ffffff' : 'rgba(255,255,255,0.5)'
                    }}
                >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
            ))}
        </div>
    );
}

const styles = {
    wrapper: {
        display: 'flex',
        gap: '8px',
        marginTop: '16px'
    },
    btn: {
        padding: '8px 20px',
        border: 'none',
        borderRadius: '20px',
        fontSize: '13px',
        cursor: 'pointer',
        fontWeight: '500'
    }
};

export default TodoFilter;