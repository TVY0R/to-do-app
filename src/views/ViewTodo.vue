<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { db, Todo } from "../db";
import { useRouter } from "vue-router";

const todos = ref<Todo[]>([]);
const router = useRouter();

async function loadTodos() {
  todos.value = await db.todos.toArray();
}

onMounted(loadTodos);

function goToEdit(id: number) {
  router.push(`/update/${id}`);
}
</script>

<template>
  <div>
    <h1>My Todos</h1>
    <ul>
      <li v-for="t in todos" :key="t.id">
        <strong>{{ t.title }}</strong> - {{ t.status }}
        <span v-if="!t.synced">(offline)</span>
        <button @click="goToEdit(t.id!)">Edit</button>
      </li>
    </ul>
  </div>
</template>
