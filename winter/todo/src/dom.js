import { format } from "date-fns";
import { createTodo } from "./todo.js";
import { createProject, addTodo, removeTodo, findTodo } from "./project.js";
import { saveData } from "./storage.js";

let projects = [];
let activeProjectId = null;

// --- helpers ---

function getActiveProject() {
  return projects.find((p) => p.id === activeProjectId);
}

function save() {
  saveData(projects);
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return format(new Date(dateStr + "T00:00:00"), "MMM d, yyyy");
}

// --- sidebar ---

function renderSidebar() {
  const list = document.getElementById("project-list");
  list.innerHTML = "";

  projects.forEach((project) => {
    const div = document.createElement("div");
    div.classList.add("project-item");
    if (project.id === activeProjectId) div.classList.add("active");

    const name = document.createElement("span");
    name.textContent = project.name;
    name.addEventListener("click", () => {
      activeProjectId = project.id;
      render();
    });

    div.appendChild(name);

    // Don't allow deleting the default project
    if (project.id !== projects[0].id) {
      const del = document.createElement("button");
      del.textContent = "x";
      del.classList.add("delete-project");
      del.addEventListener("click", (e) => {
        e.stopPropagation();
        projects = projects.filter((p) => p.id !== project.id);
        if (activeProjectId === project.id) {
          activeProjectId = projects[0].id;
        }
        save();
        render();
      });
      div.appendChild(del);
    }

    list.appendChild(div);
  });
}

// --- todos ---

function renderTodos() {
  const project = getActiveProject();
  document.getElementById("project-title").textContent = project.name;

  const list = document.getElementById("todo-list");
  list.innerHTML = "";

  project.todos.forEach((todo) => {
    const item = document.createElement("div");
    item.classList.add("todo-item");
    item.classList.add("priority-" + todo.priority);
    if (todo.completed) item.classList.add("completed");

    // Top row: checkbox, title, date, delete
    const row = document.createElement("div");
    row.classList.add("todo-row");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      save();
      renderTodos();
    });

    const title = document.createElement("span");
    title.classList.add("todo-title");
    title.textContent = todo.title;

    const date = document.createElement("span");
    date.classList.add("todo-date");
    date.textContent = formatDate(todo.dueDate);

    const del = document.createElement("button");
    del.textContent = "x";
    del.classList.add("delete-todo");
    del.addEventListener("click", (e) => {
      e.stopPropagation();
      removeTodo(project, todo.id);
      save();
      renderTodos();
    });

    row.appendChild(checkbox);
    row.appendChild(title);
    row.appendChild(date);
    row.appendChild(del);

    // Detail section (hidden by default, toggled on click)
    const details = document.createElement("div");
    details.classList.add("todo-details");
    details.classList.add("hidden");

    if (todo.description) {
      const desc = document.createElement("p");
      desc.textContent = todo.description;
      details.appendChild(desc);
    }

    const prio = document.createElement("p");
    prio.textContent = "Priority: " + todo.priority;
    details.appendChild(prio);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openEditDialog(todo);
    });
    details.appendChild(editBtn);

    // Toggle expand
    row.addEventListener("click", () => {
      details.classList.toggle("hidden");
    });

    item.appendChild(row);
    item.appendChild(details);
    list.appendChild(item);
  });
}

// --- dialogs ---

function openEditDialog(todo) {
  const dialog = document.getElementById("todo-dialog");
  document.getElementById("todo-dialog-title").textContent = "Edit Todo";
  document.getElementById("todo-title").value = todo.title;
  document.getElementById("todo-desc").value = todo.description;
  document.getElementById("todo-date").value = todo.dueDate;
  document.getElementById("todo-priority").value = todo.priority;

  dialog.dataset.editId = todo.id;
  dialog.showModal();
}

function setupDialogs() {
  const todoDialog = document.getElementById("todo-dialog");
  const todoForm = document.getElementById("todo-form");
  const projectDialog = document.getElementById("project-dialog");
  const projectForm = document.getElementById("project-form");

  // Add todo button
  document.getElementById("add-todo-btn").addEventListener("click", () => {
    document.getElementById("todo-dialog-title").textContent = "New Todo";
    todoForm.reset();
    delete todoDialog.dataset.editId;
    todoDialog.showModal();
  });

  // Todo cancel
  document.getElementById("todo-cancel").addEventListener("click", () => {
    todoDialog.close();
  });

  // Todo submit
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("todo-title").value.trim();
    if (!title) return;

    const desc = document.getElementById("todo-desc").value.trim();
    const date = document.getElementById("todo-date").value;
    const priority = document.getElementById("todo-priority").value;

    const project = getActiveProject();

    if (todoDialog.dataset.editId) {
      // Edit existing
      const todo = findTodo(project, Number(todoDialog.dataset.editId));
      if (todo) {
        todo.title = title;
        todo.description = desc;
        todo.dueDate = date;
        todo.priority = priority;
      }
    } else {
      // Create new
      const todo = createTodo(title, desc, date, priority);
      addTodo(project, todo);
    }

    save();
    todoDialog.close();
    renderTodos();
  });

  // Add project button
  document.getElementById("add-project-btn").addEventListener("click", () => {
    projectForm.reset();
    projectDialog.showModal();
  });

  // Project cancel
  document.getElementById("project-cancel").addEventListener("click", () => {
    projectDialog.close();
  });

  // Project submit
  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("project-name").value.trim();
    if (!name) return;

    const project = createProject(name);
    projects.push(project);
    activeProjectId = project.id;
    save();
    projectDialog.close();
    render();
  });
}

// --- main render ---

function render() {
  renderSidebar();
  renderTodos();
}

export function init(loadedProjects) {
  if (loadedProjects && loadedProjects.length > 0) {
    projects = loadedProjects;
  } else {
    const defaultProject = createProject("Default");
    projects = [defaultProject];
  }

  activeProjectId = projects[0].id;
  setupDialogs();
  render();
}
