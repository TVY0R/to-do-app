<script lang="ts" setup>
import { ref } from "vue";
import { db, Todo } from "../db";

const title = ref("");
const description = ref("");

async function createTodo() {
  if (!title.value.trim()) return;

  const todo: Todo = {
    title: title.value,
    description: description.value,
    status: "TODO",
    synced: navigator.onLine,
  };

  await db.todos.add(todo);

  title.value = "";
  description.value = "";

  alert("Todo saved " + (navigator.onLine ? "online" : "offline"));
}
</script>

<template>
  <div>
    <h2>Create Todo</h2>
    <input v-model="title" placeholder="Title" />
    <textarea v-model="description" placeholder="Description"></textarea>
    <button @click="createTodo">Save</button>
  </div>
</template>
