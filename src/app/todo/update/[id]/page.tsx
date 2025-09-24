"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function UpdateTodoPage() {
  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("TODO");

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
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`https://api.oluwasetemi.dev/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, status }),
    });

    alert("Todo updated!");
    router.push("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Update Todo</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
