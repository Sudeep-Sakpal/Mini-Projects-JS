class TodoApp {
  constructor() {
    this.todos = this.loadFromLocalStorage();
    this.nextId = 1;
    this.initElements();
    this.bindEvents();
    this.render();
  }

  initElements() {
    this.todoInput = document.getElementById("todoInput");
    this.addBtn = document.getElementById("addBtn");
    this.todoList = document.getElementById("todoList");
    this.emptyState = document.getElementById("emptyState");
    this.stats = document.getElementById("stats");
    this.totalTasks = document.getElementById("totalTasks");
    this.completedTasks = document.getElementById("completedTasks");
  }

  bindEvents() {
    this.addBtn.addEventListener("click", () => this.addTodo());
    this.todoInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.addTodo();
    });
  }

  addTodo() {
    const text = this.todoInput.value.trim();
    if (!text) return;

    const todo = {
      id: this.nextId++,
      text: text,
      completed: false,
      createdAt: new Date(),
    };

    this.todos.push(todo);
    this.todoInput.value = "";
    this.saveToLocalStorage();
    this.render();
  }

  toggleTodo(id) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveToLocalStorage();
      this.render();
    }
  }

  deleteTodo(id) {
    this.todos = this.todos.filter((t) => t.id !== id);
    this.saveToLocalStorage();
    this.render();
  }

  render() {
    // Clear current todos (except empty state)
    const todoItems = this.todoList.querySelectorAll(".todo-item");
    todoItems.forEach((item) => item.remove());

    if (this.todos.length === 0) {
      this.emptyState.style.display = "block";
    } else {
      this.emptyState.style.display = "none";

      this.todos.forEach((todo) => {
        const todoElement = this.createTodoElement(todo);
        this.todoList.appendChild(todoElement);
      });
    }

    this.updateStats();
  }

  createTodoElement(todo) {
    const div = document.createElement("div");
    div.className = `todo-item ${todo.completed ? "completed" : ""}`;

    div.innerHTML = `
                    <input 
                        type="checkbox" 
                        class="todo-checkbox" 
                        ${todo.completed ? "checked" : ""}
                    >
                    <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                    <button class="delete-btn">Delete</button>
                `;

    // Bind events
    const checkbox = div.querySelector(".todo-checkbox");
    const deleteBtn = div.querySelector(".delete-btn");

    checkbox.addEventListener("change", () => this.toggleTodo(todo.id));
    deleteBtn.addEventListener("click", () => this.deleteTodo(todo.id));

    return div;
  }

  updateStats() {
    const total = this.todos.length;
    const completed = this.todos.filter((t) => t.completed).length;

    this.totalTasks.textContent = `${total} task${total !== 1 ? "s" : ""}`;
    this.completedTasks.textContent = `${completed} completed`;
  }

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
    localStorage.setItem("nextId", this.nextId);
  }

  loadFromLocalStorage() {
    const savedTodos = localStorage.getItem("todos");
    const savedId = localStorage.getItem("nextId");
    this.nextId = savedId ? parseInt(savedId) : 1;
    return savedTodos ? JSON.parse(savedTodos) : [];
  }
}

// Initialize the app
const app = new TodoApp();
