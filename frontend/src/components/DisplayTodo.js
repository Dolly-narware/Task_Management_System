import './DisplayTodo.css';
import ToDoForm from './ToDoForm/ToDoForm';
import ToDoList from './ToDoList/ToDoList';
import { useState } from 'react';
import { addTask,getTasks } from './TodoService';

function DisplayTodo() {
  const [todos, setTodos] = useState([]);
  //get


  //create
  const createTodo =async (title,description) => {
    
    await addTask(title,description);
    const todo=await getTasks();
    setTodos(todo);
  };

  

  return (
    <div>
      <h1 className='todo-header'>TO DO APP</h1>

      <ToDoForm onCreateTodo={createTodo} />
      <ToDoList  />
    </div>
  );
}

export default DisplayTodo;
