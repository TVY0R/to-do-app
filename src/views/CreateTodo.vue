<template>
  <div style="padding:20px">
    <h2>Create a New Todo</h2>
    <form @submit.prevent="handleSubmit" style="display:flex; flex-direction:column; gap:10px">
      <input v-model="name" placeholder="Enter task name" required />
      <textarea v-model="description" placeholder="Enter task description" required />
      <select v-model="status">
        <option value="TODO">TODO</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="DONE">DONE</option>
        <option value="CANCELLED">CANCELLED</option>
      </select>
      <div>
        <button type="submit">Create</button>
        <router-link to="/" style="margin-left:10px">Back</router-link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const name = ref("");
const description = ref("");
const status = ref("TODO");
const router = useRouter();

const handleSubmit = async () => {
  try {
    await fetch("https://api.oluwasetemi.dev/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.value, description: description.value, status: status.value }),
    });
    alert("Todo created!");
    router.push("/");
  } catch (err) {
    console.error(err);
  }
};
</script>
