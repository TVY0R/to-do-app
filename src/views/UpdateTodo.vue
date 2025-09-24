<template>
  <div style="padding:20px">
    <h2>Update Todo</h2>
    <form @submit.prevent="handleSubmit">
      <input v-model="name" required />
      <textarea v-model="description" required />
      <select v-model="status">
        <option value="TODO">TODO</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="DONE">DONE</option>
        <option value="CANCELLED">CANCELLED</option>
      </select>
      <div style="margin-top:8px">
        <button type="submit">Update</button>
        <button type="button" @click="back" style="margin-left:8px">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

const name = ref("");
const description = ref("");
const status = ref("TODO");

onMounted(async () => {
  if (!id) return;
  try {
    const res = await fetch(`https://api.oluwasetemi.dev/tasks/${id}`);
    const data = await res.json();
    const todo = data.data ?? data;
    name.value = todo?.name ?? "";
    description.value = todo?.description ?? "";
    status.value = todo?.status ?? "TODO";
  } catch (err) {
    console.error(err);
  }
});

const handleSubmit = async () => {
  try {
    await fetch(`https://api.oluwasetemi.dev/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.value, description: description.value, status: status.value }),
    });
    alert("Todo updated!");
    router.push("/");
  } catch (err) {
    console.error(err);
  }
};

const back = () => router.push("/");
</script>
