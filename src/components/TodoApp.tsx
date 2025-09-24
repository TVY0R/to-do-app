"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Todo = {
  id: number;
  name: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";
};

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const todosPerPage = 10;
  const router = useRouter();

  const DisplayTodo = (id: number) => {
    router.push(`/todo/view/${id}`);
  };

  const UpdateTodo = (id: number) => {
    router.push(`/todo/update/${id}`);
  };

  const RemoveTodo = (id: number) => {
    if (window.confirm("Are you sure you want to delete?")) {
      fetch(`https://api.oluwasetemi.dev/tasks/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          alert("Todo removed successfully");
          setTodos((prev) => prev.filter((todo) => todo.id !== id));
        })
        .catch((err) => console.log(err.message));
    }
  };

  useEffect(() => {
    fetch("https://api.oluwasetemi.dev/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data.data);
        setFilteredTodos(data.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    let filtered = todos;

    if (searchTitle.trim() !== "") {
      filtered = filtered.filter((todo) =>
        todo.name.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter((todo) => todo.status === statusFilter);
    }

    setFilteredTodos(filtered);
    setCurrentPage(1);
  }, [searchTitle, statusFilter, todos]);

  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);
  const paginatedTodos = filteredTodos.slice(
    (currentPage - 1) * todosPerPage,
    currentPage * todosPerPage
  );

  const goToFirstPage = () => setCurrentPage(1);
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToLastPage = () => setCurrentPage(totalPages);

  return (
    <div className="container">
      <h2>Welcome to the Todo App!</h2>
      <div className="table-container">
        <Link href="/todo/create" className="btn btn-create">
          Create a new Todo
        </Link>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search by title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Sl. No</th>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTodos.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.status}</td>
              <td>
                <button
                  onClick={() => DisplayTodo(item.id)}
                  className="btn btn-info"
                >
                  View
                </button>
                <button
                  onClick={() => UpdateTodo(item.id)}
                  className="btn btn-update"
                >
                  Update
                </button>
                <button
                  onClick={() => RemoveTodo(item.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={goToFirstPage} disabled={currentPage === 1}>
          Main
        </button>
        <button onClick={goToPrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <span>
          {" "}
          {currentPage} of {totalPages}{" "}
        </span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
        <button onClick={goToLastPage} disabled={currentPage === totalPages}>
          Last
        </button>
      </div>
    </div>
  );
};

export default TodoApp;
