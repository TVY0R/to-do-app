import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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

  const RemoveDetails = async (id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      try {
        await fetch(`http://localhost:3006/todos/${id}`, {
          method: "DELETE",
        });
        alert("Todo deleted successfully!");
        window.location.reload();
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Error deleting todo.");
      }
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch("http://localhost:3006/todos");
        const data = await res.json();
        setTodos(data);
      } catch (err) {
        console.error("Failed to fetch todos:", err);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get("page")) || 1;
    setCurrentPage(page);
  }, [location.search]);

  useEffect(() => {
    setCurrentPage(1);
    navigate(`/?page=1`);
  }, [searchTerm, statusFilter]);

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      todo.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

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
            {currentTodos.map((item) => (
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
          Last
        </button>
      </div>
    </div>
  );
}
