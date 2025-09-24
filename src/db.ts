import Dexie, { type Table } from "dexie";

export interface Todo {
  id?: number;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";
  synced: boolean;
}

export class TodoDB extends Dexie {
  todos!: Table<Todo, number>;

  constructor() {
    super("TodoDB");
    this.version(1).stores({
      todos: "++id, title, status, synced", 
    });
  }
}

export const db = new TodoDB();
