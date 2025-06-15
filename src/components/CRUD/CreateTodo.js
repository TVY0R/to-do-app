import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [validation, setValidation] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const todoData = { title, description, status };

    try {
      const response = await fetch("http://localhost:3006/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todoData),
      });

      if (!response.ok) {
        throw new Error("Failed to create todo.");
      }

      alert("Todo created successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error creating todo:", err);
      alert("Error: Unable to create todo. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Create a New Todo</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onMouseDown={() => setValidation(true)}
        />
        {title.length === 0 && validation && (
          <span className="errorMsg">Please fill out this field</span>
        )}

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label htmlFor="status">Status:</label>
        <select
          id="status"
          required
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          onMouseDown={() => setValidation(true)}
        >
          <option value="">Select status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="in progress">In Progress</option>
          <option value="on hold">On Hold</option>
        </select>

        <div>
          <button type="submit" className="btn btn-create">
            Create Todo
          </button>
          <Link to="/" className="btn btn-back">
            Back to Todos
          </Link>
        </div>
      </form>
    </div>
  );
}
