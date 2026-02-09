let nextProjectId = 1;

export function createProject(name) {
  return {
    id: nextProjectId++,
    name,
    todos: [],
  };
}

export function setNextProjectId(id) {
  nextProjectId = id;
}

export function addTodo(project, todo) {
  project.todos.push(todo);
}

export function removeTodo(project, todoId) {
  project.todos = project.todos.filter((t) => t.id !== todoId);
}

export function findTodo(project, todoId) {
  return project.todos.find((t) => t.id === todoId);
}
