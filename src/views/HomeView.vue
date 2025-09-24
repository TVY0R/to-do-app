<template>
  <div class="container">
    <h2>Welcome to the Todo App!</h2>

    <div class="table-container">
      <router-link to="/todo/create" class="btn btn-create">Create a new Todo</router-link>
    </div>

    <div style="margin-top: 12px">
      <input v-model="searchTitle" placeholder="Search by title" style="margin-right:10px" />
      <select v-model="statusFilter">
        <option value="All">All Statuses</option>
        <option value="TODO">TODO</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="DONE">DONE</option>
        <option value="CANCELLED">CANCELLED</option>
      </select>
    </div>

    <table v-if="paginatedTodos.length" style="margin-top: 12px">
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
        <tr v-for="(item, index) in paginatedTodos" :key="item.id">
          <td>{{ (currentPage - 1) * todosPerPage + index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.status }}</td>
          <td>
            <button @click="displayTodo(item.id)" class="btn btn-info">View</button>
            <button @click="updateTodo(item.id)" class="btn btn-update">Update</button>
            <button @click="removeTodo(item.id)" class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else style="margin-top:12px">No todos found.</p>

    <div class="pagination" style="margin-top:12px">
      <button @click="goToFirstPage" :disabled="currentPage === 1">Main</button>
      <button @click="goToPrevPage" :disabled="currentPage === 1">Prev</button>
      <span> {{ currentPage }} of {{ totalPages }} </span>
      <button @click="goToNextPage" :disabled="currentPage === totalPages">Next</button>
      <button @click="goToLastPage" :disabled="currentPage === totalPages">Last</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

type Todo = {
  id: number;
  name: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";
};

const todos = ref<Todo[]>([]);
const currentPage = ref<number>(1);
const filteredTodos = ref<Todo[]>([]);
const searchTitle = ref<string>("");
const statusFilter = ref<string>("All");

const todosPerPage = 10;
const router = useRouter();

const fetchTodos = async () => {
  try {
    const res = await fetch("https://api.oluwasetemi.dev/tasks");
    const data = await res.json();
    todos.value = data.data || [];
    filteredTodos.value = todos.value.slice();
  } catch (err) {
    console.error(err);
  }
};

onMounted(fetchTodos);

watch([searchTitle, statusFilter, todos], () => {
  let filtered = todos.value.slice();

  if (searchTitle.value.trim() !== "") {
    filtered = filtered.filter((t) =>
      t.name.toLowerCase().includes(searchTitle.value.toLowerCase())
    );
  }

  if (statusFilter.value !== "All") {
    filtered = filtered.filter((t) => t.status === statusFilter.value);
  }

  filteredTodos.value = filtered;
  currentPage.value = 1;
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredTodos.value.length / todosPerPage))
);

const paginatedTodos = computed(() =>
  filteredTodos.value.slice(
    (currentPage.value - 1) * todosPerPage,
    currentPage.value * todosPerPage
  )
);

const displayTodo = (id: number) => router.push(`/todo/view/${id}`);
const updateTodo = (id: number) => router.push(`/todo/update/${id}`);

const removeTodo = async (id: number) => {
  if (!confirm("Are you sure you want to delete?")) return;
  try {
    await fetch(`https://api.oluwasetemi.dev/tasks/${id}`, { method: "DELETE" });
    // remove locally
    todos.value = todos.value.filter((t) => t.id !== id);
    filteredTodos.value = filteredTodos.value.filter((t) => t.id !== id);
    alert("Todo removed successfully");
  } catch (err) {
    console.error(err);
  }
};

const goToFirstPage = () => (currentPage.value = 1);
const goToPrevPage = () => (currentPage.value = Math.max(currentPage.value - 1, 1));
const goToNextPage = () =>
  (currentPage.value = Math.min(currentPage.value + 1, totalPages.value));
const goToLastPage = () => (currentPage.value = totalPages.value);
</script>

<style scoped>
.container { max-width: 900px; margin: 24px auto; padding: 12px; background: #fff; border-radius:8px; }
.table-container { margin-bottom: 12px; }
.btn { margin-right: 6px; }
.pagination { margin-top: 8px; }
</style>
