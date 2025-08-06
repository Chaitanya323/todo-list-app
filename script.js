// ✅ Grabbing DOM elements
const form = document.querySelector('.js-form');
const input = document.querySelector('.js-todo-input');
const list = document.querySelector('.js-todo-list');
const emptyMessage = document.getElementById('emptyMessage');

// ✅ Load saved todos from localStorage or initialize an empty array
let todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];

// ✅ Function to save the todos to localStorage
function saveToLocalStorage() {
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

// ✅ Function to create a todo item element and append it to the list
function renderTodo(todo) {
  // Create list item
  const li = document.createElement('li');
  li.setAttribute('data-key', todo.id);
  li.className = todo.checked ? 'done' : '';

  // ✅ Creating inner HTML content for the todo
  li.innerHTML = `
    <input type="checkbox" ${todo.checked ? 'checked' : ''} onchange="toggleDone('${todo.id}')">
    <span>${todo.text}</span>
    <button onclick="deleteTodo('${todo.id}')">❌</button>
  `;

  // ✅ Remove old item if it already exists (for toggle)
  const existingItem = document.querySelector(`[data-key='${todo.id}']`);
  if (existingItem) {
    list.replaceChild(li, existingItem);
  } else {
    list.appendChild(li);
  }

  // ✅ Toggle empty message
  emptyMessage.style.display = todoItems.length === 0 ? 'block' : 'none';
}

// ✅ Function to add a new todo
function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now().toString()
  };

  todoItems.push(todo);
  saveToLocalStorage();
  renderTodo(todo);
}

// ✅ Function to handle form submit
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form from refreshing the page
  const text = input.value.trim();
  if (text !== '') {
    addTodo(text);
    input.value = '';
    input.focus();
  }
});

// ✅ Function to toggle a todo item's "done" status
function toggleDone(key) {
  const index = todoItems.findIndex(item => item.id === key);
  if (index > -1) {
    todoItems[index].checked = !todoItems[index].checked;
    saveToLocalStorage();
    renderTodo(todoItems[index]);
  }
}

// ✅ Function to delete a todo item
function deleteTodo(key) {
  todoItems = todoItems.filter(item => item.id !== key);
  saveToLocalStorage();

  const item = document.querySelector(`[data-key='${key}']`);
  if (item) {
    list.removeChild(item);
  }

  // ✅ Show message if list becomes empty
  if (todoItems.length === 0) {
    emptyMessage.style.display = 'block';
  }
}

// ✅ Re-render all todos on initial load
todoItems.forEach(renderTodo);
