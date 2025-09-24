<template>
  <div class="container">
    <h2>Welcome to the Todo App!</h2>

    <div class="table-container">
      <RouterLink to="/create" class="btn btn-create">
        Create a new Todo
      </RouterLink>
    </div>

    <div>
      <input
        type="text"
        placeholder="Search by title"
        v-model="searchTitle"
        style="margin-right: 10px"
      />
      <select v-model="statusFilter">
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
        <tr v-for="(todo, index) in paginatedTodos" :key="todo.id">
          <td>{{ index + 1 }}</td>
          <td>{{ todo.name }}</td>
          <td>{{ todo.description }}</td>
          <td>{{ todo.status }}</td>
          <td>
            <RouterLink :to="`/view/${todo.id}`" class="btn btn-info">View</RouterLink>
            <RouterLink :to="`/update/${todo.id}`" class="btn btn-update">Update</RouterLink>
            <button @click="removeTodo(todo.id)" class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button @click="goToFirstPage" :disabled="currentPage === 1">Main</button>
      <button @click="goToPrevPage" :disabled="currentPage === 1">Prev</button>
      <span>{{ currentPage }} of {{ totalPages }}</span>
      <button @click="goToNextPage" :disabled="currentPage === totalPages">Next</button>
      <button @click="goToLastPage" :disabled="currentPage === totalPages">Last</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";

type Todo = {
  id: number;
  name: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";
};

const todos = ref<Todo[]>([]);
const searchTitle = ref("");
const statusFilter = ref("All");
const currentPage = ref(1);
const todosPerPage = 10;

const filteredTodos = computed(() => {
  let result = todos.value;

  if (searchTitle.value.trim() !== "") {
    result = result.filter((todo) =>
      todo.name.toLowerCase().includes(searchTitle.value.toLowerCase())
    );
  }

  if (statusFilter.value !== "All") {
    result = result.filter((todo) => todo.status === statusFilter.value);
  }

  return result;
});

const totalPages = computed(() =>
  Math.ceil(filteredTodos.value.length / todosPerPage)
);

const paginatedTodos = computed(() =>
  filteredTodos.value.slice(
    (currentPage.value - 1) * todosPerPage,
    currentPage.value * todosPerPage
  )
);

const goToFirstPage = () => (currentPage.value = 1);
const goToPrevPage = () => (currentPage.value = Math.max(currentPage.value - 1, 1));
const goToNextPage = () =>
  (currentPage.value = Math.min(currentPage.value + 1, totalPages.value));
const goToLastPage = () => (currentPage.value = totalPages.value);

const removeTodo = async (id: number) => {
  if (confirm("Are you sure you want to delete?")) {
    try {
      await fetch(`https://api.oluwasetemi.dev/tasks/${id}`, {
        method: "DELETE",
      });
      alert("Todo removed successfully");
      todos.value = todos.value.filter((todo) => todo.id !== id);
    } catch (err) {
      console.error(err);
    }
  }
};

onMounted(async () => {
  try {
    const res = await fetch("https://api.oluwasetemi.dev/tasks");
    const data = await res.json();
    todos.value = data.data;
  } catch (err) {
    console.error(err);
  }
});
</script>

<style scoped>
</style>
