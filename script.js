const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

addBtn.addEventListener('click', addTask);
taskList.addEventListener('click', handleTaskAction);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;
    const li = document.createElement('li');
    li.innerHTML = `${taskText} <button class="deleteBtn">X</button>`;
    taskList.appendChild(li);
    saveTasks();
    taskInput.value = '';
}

function handleTaskAction(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('completed');
        saveTasks();
    } else if (e.target.classList.contains('deleteBtn')) {
        e.target.parentElement.remove();
        saveTasks();
    }
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        tasks.push({ text: li.firstChild.textContent.trim(), completed: li.classList.contains('completed') });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');
        li.innerHTML = `${task.text} <button class="deleteBtn">X</button>`;
        taskList.appendChild(li);
    });
}

loadTasks();