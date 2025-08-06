// Get references to input, button, list, and empty message
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');

// Load todos from localStorage or start with an empty array
let todoItems = JSON.parse(localStorage.getItem('todos')) || [];

// Render the entire list based on the todoItems array
function renderList() {
  list.innerHTML = '';

  // Show or hide empty message
  if (todoItems.length === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
  }

  // Render each todo item
  todoItems.forEach((todo) => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    if (todo.checked) li.classList.add('completed');

    const span = document.createElement('span');
    span.textContent = todo.text;

    const actions = document.createElement('div');
    actions.className = 'actions';

    const checkBtn = document.createElement('button');
    checkBtn.className = 'check';
    checkBtn.textContent = '✔';
    checkBtn.onclick = () => toggleCheck(todo.key);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete';
    deleteBtn.textContent = '✖';
    deleteBtn.onclick = () => deleteTodo(todo.key);

    actions.appendChild(checkBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);

    list.appendChild(li);
  });

  // Save to localStorage
  localStorage.setItem('todos', JSON.stringify(todoItems));
}

// Add a new todo item
function addTodo() {
  const text = input.value.trim();
  if (text !== '') {
    const newTodo = {
      text,
      checked: false,
      key: Date.now()
    };
    todoItems.push(newTodo);
    input.value = '';
    renderList();
  }
}

// Toggle completion state
function toggleCheck(key) {
  const index = todoItems.findIndex((item) => item.key === key);
  if (index !== -1) {
    todoItems[index].checked = !todoItems[index].checked;
    renderList();
  }
}

// Delete a todo
function deleteTodo(key) {
  todoItems = todoItems.filter((item) => item.key !== key);
  renderList();
}

// Add on button click or Enter key press
addBtn.addEventListener('click', addTodo);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTodo();
  }
});

// Render on load
document.addEventListener('DOMContentLoaded', renderList);
