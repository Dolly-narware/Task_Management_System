import { useState } from "react";
import "./ToDoForm.css";
import { addTask } from "../TodoService";
function ToDoForm({ onCreateTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    onCreateTodo(title,description);
    setTitle(""); 
    setDescription(""); 
  };

  return (
    <div className="container">
      
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo Title"
      />
      <input
        type="text"
        className="form-control mb-3"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter todo Description"
      />
      <button className= "btn btn-success float-end create" type="submit">Create Todo</button>
    </form>
    </div>
  );
}

export default ToDoForm;
