"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ViewTodoPage() {
  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("TODO");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`https://api.oluwasetemi.dev/tasks/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const todo = data.data;
        setName(todo?.name ?? "");
        setDescription(todo?.description ?? "");
        setStatus(todo?.status ?? "TODO");
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p>Loading todo...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>View Todo</h2>
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Description:</strong> {description}
      </p>
      <p>
        <strong>Status:</strong> {status}
      </p>

      <button onClick={() => router.push("/")}>Back to list</button>
    </div>
  );
}
