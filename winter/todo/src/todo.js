let nextId = 1;

export function createTodo(title, description, dueDate, priority) {
  return {
    id: nextId++,
    title,
    description: description || "",
    dueDate: dueDate || "",
    priority: priority || "low",
    completed: false,
  };
}

export function setNextId(id) {
  nextId = id;
}
