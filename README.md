# React Todo App supporting CRUD operations

A simple and responsive Todo List application built with **React**, supporting **CRUD** operations, **search & filter** and **pagination**

---

## Features

- Create, Read, Update, and Delete (CRUD) todos
- Search todos by title and filter by status
- Paginate todo list for better UI
- WCAG AA-compliant styling for accessibility
- Fully responsive and mobile-friendly
- Simple routing using `react-router-dom`

---

## Installation & Setup

### Prerequisites

- Node.js & npm installed
- JSON Server (for mock backend)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/to-do-app.git
cd to-do-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the mock API server

Ensure you have a `db.json` file in the root with todo data.

```bash
npx json-server --watch db.json --port 2000
```

### 4. Run the React app

```bash
npm start
```

The app will be available at (https://to-do-app-qyky.vercel.app/)

---

## Available Scripts

| Command           | Description                     |
| ----------------- | ------------------------------- |
| `npm start`       | Starts the development server   |
| `npm run build`   | Builds the app for production   |
| `npx json-server` | Starts the mock REST API server |

---

## Technology Stack

- **React** – Frontend framework
- **React Router DOM** – Page routing
- **JSON Server** – Mock RESTful API
- **CSS (App.css)** – Centralized and accessible styling

### 🔧 Architecture Decisions

- Centralized UI styling in `App.css` for maintainability.
- Adopted paginated listing and filtering to manage large data efficiently.

---

## 🛠 API Documentation

### Base URL

```
api.oluwasetemi.dev
```

### Endpoints

| Method | Endpoint     | Description         |
| ------ | ------------ | ------------------- |
| GET    | `/tasks`     | Fetch all todos     |
| GET    | `/tasks/:id` | Fetch a single todo |
| POST   | `/tasks`     | Create a new todo   |
| PATCH  | `/tasks/:id` | Update a todo       |
| DELETE | `/tasks/:id` | Delete a todo       |

#### Sample Payload

```json
{
  "title": "Learn React",
  "description": "Complete React basics tutorial",
  "status": "Pending"
}
```

---

## Screenshots

### Main Todo List with Search, Filter, and Pagination

![Main View](./screenshots/todo-main.png)

### Create Todo Form

![Create Page](./screenshots/CreateTodoForm.png)

### View Details Page

![View Details](./screenshots/ViewTodoDetails.png)

---

## Known Issues

- No routing to the newly created To-do page immediately after its been created.

---

## 🔮 Future Improvements

- Add user authentication
- Add dashboard analytics for completed tasks
- Push/browser notifications for reminders

---

## 👩🏽‍💻 Author

**Mariam Lawal** – [GitHub](https://github.com/tvy0r) | Alt School ID: `ALT/SOE/024/0468`

---
