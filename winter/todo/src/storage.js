import { setNextId } from "./todo.js";
import { setNextProjectId } from "./project.js";

const STORAGE_KEY = "todo-app-data";

export function saveData(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const projects = JSON.parse(raw);

    // Restore next IDs so new items don't collide
    let maxTodoId = 0;
    let maxProjectId = 0;
    projects.forEach((p) => {
      if (p.id > maxProjectId) maxProjectId = p.id;
      p.todos.forEach((t) => {
        if (t.id > maxTodoId) maxTodoId = t.id;
      });
    });
    setNextId(maxTodoId + 1);
    setNextProjectId(maxProjectId + 1);

    return projects;
  } catch (e) {
    return null;
  }
}
