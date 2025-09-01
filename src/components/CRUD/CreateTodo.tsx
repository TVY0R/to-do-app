import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type Todo = {
  id: string;
  name: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";
};

const CreateTodo: React.FC = () => {
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<Todo["status"] | "">("");
  const [validation, setValidation] = useState<boolean>(false);

  const navigate = useNavigate(); 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const todoData: Todo = {
      id,
      name,
      description,
      status: status as Todo["status"], 
    };

    console.log(todoData);

    fetch("https://api.oluwasetemi.dev/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to create todo");
        }
        alert("Todo created successfully");
        navigate("/");
      })
      .catch((err) => console.log("Error:", err.message));
  };

  return (
    <div className="container">
      <h2>Create a New Todo</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          id="id"
          name="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          onMouseDown={() => setValidation(true)}
        />
        {name.length === 0 && validation && (
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
          onChange={(e) => setStatus(e.target.value as Todo["status"])}
          onMouseDown={() => setValidation(true)}
        >
          <option value="">Select status</option>
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
          <option value="CANCELLED">CANCELLED</option>
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
};

export default CreateTodo;
