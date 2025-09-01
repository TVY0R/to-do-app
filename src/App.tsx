import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import TodoApp from "./TodoApp";
import CreateTodo from "./components/CRUD/CreateTodo";
import UpdateTodo from "./components/CRUD/UpdateTodo";
import ViewDetails from "./components/CRUD/ViewDetails";
import NotFound from "./components/Errorhandling/NotFound";
import ErrorTest from "./components/Errorhandling/ErrorTest";
import ErrorBoundary from "./components/Errorhandling/ErrorBoundary";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<TodoApp />} />
          <Route path="/todo/create" element={<CreateTodo />} />
          <Route path="/todo/update/:todoid" element={<UpdateTodo />} />
          <Route path="/todo/view/:todoid" element={<ViewDetails />} />
          <Route path="/error-test" element={<ErrorTest />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
