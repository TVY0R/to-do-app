import { db, type Todo } from "./db";

export async function syncTodos() {
  if (!navigator.onLine) return;

  const unsynced = (await db.todos.toArray()).filter(todo => todo.synced === false);


  for (const todo of unsynced) {
    try {
      if (!todo.id || todo.id < 0) {
        const res = await fetch("https://api.oluwasetemi.dev/tasks", {
          method: "POST",
          body: JSON.stringify({
            name: todo.title,
            description: todo.description,
            status: todo.status,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();

        // Update Dexie with API id
        await db.todos.update(todo.id!, { 
          id: data.data?.id ?? Date.now(), 
          synced: true 
        });
      } else {
        // Existing todo -> update on API
        await fetch(`https://api.oluwasetemi.dev/tasks/${todo.id}`, {
          method: "PUT",
          body: JSON.stringify({
            name: todo.title,
            description: todo.description,
            status: todo.status,
          }),
          headers: { "Content-Type": "application/json" },
        });

        await db.todos.update(todo.id, { synced: true });
      }
    } catch (err) {
      console.error("Sync failed for todo:", todo, err);
    }
  }
}

window.addEventListener("online", () => {
  console.log("Back online, syncing...");
  syncTodos();
});
