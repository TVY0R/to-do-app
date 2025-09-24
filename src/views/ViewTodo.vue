<template>
  <div style="padding:20px">
    <h2>View Todo</h2>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <p><strong>Name:</strong> {{ name }}</p>
      <p><strong>Description:</strong> {{ description }}</p>
      <p><strong>Status:</strong> {{ status }}</p>
      <button @click="back">Back to list</button>
    </div>
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
const loading = ref(true);

onMounted(async () => {
  if (!id) return;
  try {
    const res = await fetch(`https://api.oluwasetemi.dev/tasks/${id}`);
    const data = await res.json();
    const todo = data.data ?? data; // depends on API shape
    name.value = todo?.name ?? "";
    description.value = todo?.description ?? "";
    status.value = todo?.status ?? "TODO";
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
});

const back = () => router.push("/");
</script>
