import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import localforage from "localforage";
import { db } from "./api/db";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const todosPerPage = 10;
  const navigate = useNavigate();
  const location = useLocation();

  const DisplayDetails = (id) => navigate("/todo/view/" + id);
  const UpdateDetails = (id) => navigate("/todo/update/" + id);
  const RemoveDetails = (id) => {
    // Remove Details Confirmation
    if (window.confirm("Are you sure you want to delete this todo?")) {
      fetch("http://localhost:3006/todos/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Todo deleted successfully!");
          window.location.reload();
        })
        .catch((err) => console.error(err.message));
    }
  };
  // Fetch todos from API and cache in localforage and IndexedDB
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const cached = await localforage.getItem("todos");
        if (cached) setTodos(cached);

        const res = await fetch("http://localhost:3006/todos");
        const data = await res.json();

        setTodos(data);
        await localforage.setItem("todos", data);
        await db.todos.clear();
        await db.todos.bulkAdd(data);
      } catch (err) {
        console.warn("Offline mode: loading from IndexedDB");
        const offlineData = await db.todos.toArray();
        setTodos(offlineData);
      }
    };

    // Fetch todos when the component location changes
    fetchTodos();
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get("page")) || 1;
    setCurrentPage(page);
  }, [location.search]);

  // Reset current page when search term or status filter changes
  useEffect(() => {
    setCurrentPage(1);
    navigate(`/?page=1`);
  }, [searchTerm, statusFilter]);
  const filteredTodos = todos.filter((todo) => {
    const matchesSearchTerm = todo.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatusFilter =
      statusFilter === "All" ||
      todo.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearchTerm && matchesStatusFilter;
  });

  // Pagination logic
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

  const paginate = (direction) => {
    let newPage;

    if (direction === "main") {
      newPage = 1;
    } else if (direction === "prev") {
      newPage = currentPage - 1;
    } else if (direction === "next") {
      newPage = currentPage + 1;
    } else if (direction === "last") {
      newPage = totalPages;
    }

    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      navigate(`/?page=${newPage}`);
    }
  };
    
  return (
    <div className="container">
      <h2>Welcome to the Todo App!</h2>
      <div className="table-container">
        <Link to="/todo/create" className="btn btn-create">
          Create a new Todo
        </Link>

        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
          
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
          <option value="On Hold">On Hold</option>
        </select>
        
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTodos &&
              currentTodos.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.status}</td>
                  <td>
                    <button
                      onClick={() => DisplayDetails(item.id)}
                      className="btn btn-info"
                    >
                      View
                    </button>
                    <button
                      onClick={() => UpdateDetails(item.id)}
                      className="btn btn-update"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => RemoveDetails(item.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            {currentTodos.length === 0 && (
              <tr>
                <td colSpan="4">No todos found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button onClick={() => paginate("main")} disabled={currentPage === 1}>
          Main
        </button>
        <button onClick={() => paginate("prev")} disabled={currentPage === 1}>
          Prev
        </button>
        <span>
          {totalPages > 0
            ? `Page ${currentPage} of ${totalPages}`
            : "No pages to display"}
        </span>

        <button
          onClick={() => paginate("next")}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
          onClick={() => paginate("last")}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Last{" "}
        </button>
      </div>
    </div>
  );
}
