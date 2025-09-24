import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/create",
    name: "Create",
    component: () => import("@/views/CreateTodo.vue"),
  },
  {
    path: "/view/:id",
    name: "View",
    component: () => import("@/views/ViewTodo.vue"),
  },
  {
    path: "/update/:id",
    name: "Update",
    component: () => import("@/views/UpdateTodo.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
