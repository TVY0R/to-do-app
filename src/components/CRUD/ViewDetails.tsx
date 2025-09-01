import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type Todo = {
  id: string;
  name: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";
};

export default function ViewDetails() {
  const { todoid } = useParams<{ todoid: string }>();
  const [todoData, setTodoData] = useState<Todo | null>(null);

  useEffect(() => {
    fetch(`https://api.oluwasetemi.dev/tasks/${todoid}`)
      .then((res) => res.json())
      .then((data) => setTodoData(data))
      .catch((err) => console.log("Failed to fetch todo:", err.message));
  }, [todoid]);

  return (
    <div className="container">
      <h1>Todo Details</h1>
      {todoData ? (
        <div className="details">
          <p>
            <strong>ID: </strong> {todoData.id}
          </p>
          <p>
            <strong>Name: </strong> {todoData.name}
          </p>
          <p>
            <strong>Description: </strong> {todoData.description}
          </p>
          <p>
            <strong>Status: </strong> {todoData.status}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/" className="btn btn-back">
        Back
      </Link>
    </div>
  );
}
