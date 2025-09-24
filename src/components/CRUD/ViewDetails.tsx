"use client";

import React, { useState } from "react";

interface Todo {
  id: number;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";
}

export default function ViewDetails() {
  const [todos] = useState<Todo[]>([
    { id: 1, title: "First Todo", description: "Sample task", status: "TODO" },
  ]);

  return (
    <div>
      <h2>Todo List</h2>
      {todos.map((todo) => (
        <div key={todo.id}>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <span>Status: {todo.status}</span>
        </div>
      ))}
    </div>
  );
}
