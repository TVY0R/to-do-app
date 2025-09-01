import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type Todo = {
  id: string;
  title: string;
  description: string;
  status: string;
};

export default function UpdateTodo() {
  const { todoid } = useParams<{ todoid: string }>();
  const navigate = useNavigate();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.oluwasetemi.dev/tasks/${todoid}`)
      .then((res) => res.json())
      .then((data) => {
        setTodo(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [todoid]);

  if (loading) return <p>Loading...</p>;
  if (!todo) return <p>Todo not found</p>;

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    fetch(`https://api.oluwasetemi.dev/tasks/${todoid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    }).then(() => navigate("/"));
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Update Todo</h2>

      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={todo.title ?? ""}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={todo.description ?? ""}
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={todo.status ?? "TODO"}
          onChange={(e) => setTodo({ ...todo, status: e.target.value })}
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="DONE">DONE</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
      </div>

      <button type="submit">Update</button>
    </form>
  );
}
