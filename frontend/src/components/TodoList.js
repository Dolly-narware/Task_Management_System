import React, { useEffect, useState } from 'react';
import { fetchTasks, addTask, updateTask, deleteTask } from '../api';
import TodoItem from './TodoItem';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState('');

    useEffect(() => {
        fetchTasks().then(res => setTasks(res.data)).catch(console.error);
    }, []);

    const handleAddTask = async () => {
        if (!taskTitle) return;
        await addTask(taskTitle);
        setTaskTitle('');
        fetchTasks().then(res => setTasks(res.data));
    };

    const handleToggleTask = async (id, completed) => {
        await updateTask(id, !completed);
        fetchTasks().then(res => setTasks(res.data));
    };

    const handleDeleteTask = async (id) => {
        await deleteTask(id);
        fetchTasks().then(res => setTasks(res.data));
    };

    return (
        <div>
            <h2>To-Do List</h2>
            <input 
                type="text" 
                placeholder="Add a new task..." 
                value={taskTitle} 
                onChange={(e) => setTaskTitle(e.target.value)}
            />
            <button onClick={handleAddTask}>Add</button>

            <ul>
                {tasks.map(task => (
                    <TodoItem key={task.id} task={task} onToggle={handleToggleTask} onDelete={handleDeleteTask} />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
