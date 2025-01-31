import { useEffect, useState } from "react";
import { getTasks, updateTask, deleteTask } from "../TodoService";
import "./ToDoList.css"

function ToDoList() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const data = await getTasks();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, [todos]);

  const handleUpdate = async (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "completed" : "pending";
    await updateTask(id, newStatus);
    fetchTodos();
  };


  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTodos();
  };

  return (
    <div className="todo-container">
      <h2 className="todo-list">Todo List</h2>
      
      {/* Table Structure */}
      <table className="todo-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Iterate over todos and display each task in a row */}
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>{todo.status}</td>
              <td>
                {/* Mark as Completed/Pending Button */}
                <button
                  className={todo.status === "pending" ? "mark-completed" : "mark-pending"}
                  onClick={() => handleUpdate(todo.id, todo.status)}
                >
                  {todo.status === "pending" ? "Mark as Completed" : "Mark as Pending"}
                </button>
                
                {/* Delete Button */}
                <button className="delete-btn" onClick={() => handleDelete(todo.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ToDoList;
