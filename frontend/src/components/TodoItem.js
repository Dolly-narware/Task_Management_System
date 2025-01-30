import React from 'react';

const TodoItem = ({ task, onToggle, onDelete }) => {
    return (
        <li>
            <span 
                style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer' }}
                onClick={() => onToggle(task.id, task.completed)}
            >
                {task.title}
            </span>
            <button onClick={() => onDelete(task.id)}>Delete</button>
        </li>
    );
};

export default TodoItem;
