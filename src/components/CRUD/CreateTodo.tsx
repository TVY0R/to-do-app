"use client";

import React, { useState } from "react";

export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("TODO");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New Todo:", { title, description, status });
    setTitle("");
    setDescription("");
    setStatus("TODO");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="TODO">TODO</option>
        <option value="IN_PROGRESS">IN PROGRESS</option>
        <option value="DONE">DONE</option>
        <option value="CANCELLED">CANCELLED</option>
      </select>
      <button type="submit">Add Todo</button>
    </form>
  );
}
