"use client";

import React, { useState, useEffect } from "react";

interface Props {
  id: string;
}

export default function UpdateTodo({ id }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("TODO");

  useEffect(() => {
    // Fetch todo by ID (mock for now)
    setTitle("Sample Todo " + id);
    setDescription("Sample description");
    setStatus("TODO");
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Todo:", { id, title, description, status });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="TODO">TODO</option>
        <option value="IN_PROGRESS">IN PROGRESS</option>
        <option value="DONE">DONE</option>
        <option value="CANCELLED">CANCELLED</option>
      </select>
      <button type="submit">Update Todo</button>
    </form>
  );
}
