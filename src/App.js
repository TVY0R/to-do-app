import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import TodoApp from "./TodoApp";
import CreateTodo from "./components/CRUD/CreateTodo";
import UpdateTodo from "./components/CRUD/UpdateTodo";
import ViewDetails from "./components/CRUD/ViewDetails";
import NotFound from "./components/Error handling/NotFound";
import ErrorTest from "./components/Error handling/ErrorTest";
import ErrorBoundary from "./components/Error handling/Errorboundary";

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<TodoApp />}></Route>
          <Route path="/todo/create" element={<CreateTodo />}></Route>
          <Route path="/todo/update/:todoid" element={<UpdateTodo />}></Route>
          <Route path="/todo/view/:todoid" element={<ViewDetails />}></Route>
          <Route path="/error-test" element={<ErrorTest />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
