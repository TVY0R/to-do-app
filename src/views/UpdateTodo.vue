<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { db, Todo } from "../db";

const route = useRoute();
const router = useRouter();
const todo = ref<Todo | null>(null);

onMounted(async () => {
  const id = Number(route.params.id);
  todo.value = await db.todos.get(id);
});

async function updateTodo() {
  if (!todo.value?.id) return;

  await db.todos.update(todo.value.id, {
    title: todo.value.title,
    description: todo.value.description,
    status: todo.value.status,
    synced: navigator.onLine,
  });

  alert("Todo updated!");
  router.push("/");
}
</script>

<template>
  <div v-if="todo">
    <h2>Edit Todo</h2>
    <input v-model="todo.title" />
    <textarea v-model="todo.description"></textarea>
    <select v-model="todo.status">
      <option value="TODO">TODO</option>
      <option value="IN_PROGRESS">IN PROGRESS</option>
      <option value="DONE">DONE</option>
      <option value="CANCELLED">CANCELLED</option>
    </select>
    <button @click="updateTodo">Update</button>
  </div>
</template>
