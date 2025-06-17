import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UpdateTodo(){
  const{todoid}=useParams();
  const [id, setId]=useState("");
  const [name, setName]=useState("");
  const [description, setDescription]=useState("");
  const [status, setStatus]=useState("");
  const [validation, setValidation]=useState(false);
  const navigate = useNavigate();
  
    //const [todoData,setTodoData]=useState({}
    useEffect(()=>{
        fetch("https://api.oluwasetemi.dev/tasks/"+todoid)
        .then((res)=>res.json())
        .then((data)=>{
          setId(data.id)
          setName(data.name)
          setDescription(data.description)
          setStatus(data.status)
        })
        .catch((err)=>console.log("Failed to fetch todo:", err.message));
    },[todoid]);

  const handleSubmit=(e)=>{
    e.preventDefault();
    const todoData={id,name,description,status};

    fetch("https://api.oluwasetemi.dev/tasks/"+todoid,{
        method:'PATCH',
        headers:{
          "content-type":"application/json"
        },
        body: JSON.stringify(todoData)
      })
        .then((res)=>{
        alert("Todo updated successfully");
        navigate("/");
})
        .catch((err)=>console.log(err.message)
)

  return (
    <div className="container">
      <h2>Update Todo Details</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="ID">ID:</label>
        <input 
        type="text" 
        id="id" 
        name="id" 
        value={id} 
        onChange={e=>setId(e.target.value)}/>

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          onMouseDown={() => setValidation(true)}
        />
        {name.length === 0 && validation&& <span className="errorMsg">Please fill out this field</span>
        }

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label htmlFor="status">Status:</label>
        <select
          id="status"
          required
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          onMouseDown={() => setValidation(true)}
        >
          <option value="">Select status</option>
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>

        <div>
          <button type="submit" className="btn btn-update">
            Update Todo
          </button>
          <Link to="/" className="btn btn-back">
            Back to Todos
          </Link>
        </div>
      </form>
    </div>
  )}
}