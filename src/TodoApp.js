import { useEffect, useState } from "react";
import { Link, useNavigate  } from "react-router-dom";



export default function TodoApp() {
  const [todos,setTodos]=useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  const todosPerPage = 10;
  const navigate=useNavigate();
  const DisplayTodo=(id)=>{navigate("/todo/view/"+id);

  }
  const UpdateTodo=(id)=>{navigate("/todo/update/"+id);
  }
  const RemoveTodo=(id)=>{
    if(window.confirm("Are you sure you want to delete?")){
      fetch("https://api.oluwasetemi.dev/tasks/",{
        method:'DELETE',
      })
        .then((res)=>{
        alert("Todo removed successfully");
        window.location.reload();
})
        .catch((err)=>console.log(err.message)
)
    }}


  useEffect(()=>{
    fetch('https://api.oluwasetemi.dev/tasks')
    .then((res)=>res.json())
    .then((data)=>{
      setTodos(data.data);
      setFilteredTodos(data.data);
    })
    .catch((err)=>console.log(err.message))
  },[]);

  useEffect(() => {
    let filtered = todos;

    if (searchTitle.trim() !== "") {
      filtered = filtered.filter(todo =>
        todo.name.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter(todo => todo.status === statusFilter);
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
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToLastPage = () => setCurrentPage(totalPages);


  return (
    <div className="container">
      <h2>Welcome to the Todo App!</h2>
      <div className="table-container">
        <Link to="/todo/create" className="btn btn-create">
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
          {paginatedTodos.map((item,index)=>(
            <tr key={item.id}>
              <td>{index+1}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.status}</td>
              <td>
                <button onClick={() => DisplayTodo(item.id)} className="btn btn-info">View</button>
                <button onClick={() => UpdateTodo(item.id)} className="btn btn-update">Update</button>
                <button onClick={() => RemoveTodo(item.id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
            ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={goToFirstPage} disabled={currentPage === 1}>Main</button>
        <button onClick={goToPrevPage} disabled={currentPage === 1}>Prev</button>
        <span> {currentPage} of {totalPages} </span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
        <button onClick={goToLastPage} disabled={currentPage === totalPages}>Last</button>
        </div>
    </div>
  );
}