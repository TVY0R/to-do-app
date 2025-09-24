"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTodoPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("TODO");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("https://api.oluwasetemi.dev/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, status }),
    });

    alert("Todo created!");
    router.push("/"); // go back to homepage
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create a New Todo</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          placeholder="Enter task name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          placeholder="Enter task description"
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

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
