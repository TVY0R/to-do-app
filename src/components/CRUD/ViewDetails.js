import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewDetails(){
  const {todoid} = useParams();
  const [todoData, setTodoData]=useState({});
  useEffect(() =>{
    fetch("http://localhost:3006/todos/"+todoid)
      .then((res) => res.json())
      .then((data) => setTodoData(data))
      .catch((err) => console.log(err.message))
  },[]);
  return (
      <div className="container">
        <h1>Todo Details</h1>
        { todoData && <div className="details">
        <p><strong>Title: </strong>{todoData.title}</p>
        <p><strong>Description: </strong>{todoData.description}</p>
        <p><strong>Status: </strong>{todoData.status}</p>
      </div>}
      <Link to="/" className="btn btn-back">Back</Link>
      </div>
  )
}