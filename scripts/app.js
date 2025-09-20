'use strict';

console.log('🎯 JavaScript loaded!');

const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');

console.log('Form:', taskForm);
console.log('Input:', taskInput);
console.log('Button:', addBtn);
console.log('List:', taskList);

//Enhanced form submission
taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const taskText = taskInput.value.trim();
    console.log('Task text:', taskText);
    
    if (taskText === '') {
        console.log('❌ Empty task - doing nothing');
        return;
    }
    
    // Create the task!
    addTask(taskText);
    
    // Clear the input
    taskInput.value = '';
});

//add a task to the list
function addTask(taskText) {
    console.log('🎯 Adding task:', taskText);
    
    //for main list item
    const listItem = document.createElement('li');
    listItem.className = 'task-item';
    
    //for text span
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    taskSpan.className = 'task-text';
    
    //button
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'task-buttons';
    
    //complete button
    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = '✅';
    completeBtn.className = 'complete-btn';
    completeBtn.onclick = () => toggleComplete(listItem);
    
    //delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = () => deleteTask(listItem);
    
    //all together
    buttonContainer.appendChild(completeBtn);
    buttonContainer.appendChild(deleteBtn);
    listItem.appendChild(taskSpan);
    listItem.appendChild(buttonContainer);
    
    // Add to list
    taskList.appendChild(listItem);
    
    updateTaskCounter();
    updateEmptyState();
    console.log('✅ Task added with buttons!');
    saveTasks(); //save in local storage
}

function toggleComplete(listItem) {
    listItem.classList.toggle('completed');
    const taskText = listItem.querySelector('.task-text').textContent;
    
    if (listItem.classList.contains('completed')) {
        console.log('✅ Task completed:', taskText);
    } else {
        console.log('↩️ Task uncompleted:', taskText);
    }
    saveTasks(); 
}

// Function to delete a task
function deleteTask(listItem) {
    const taskText = listItem.querySelector('.task-text').textContent;
    console.log('🗑️ Deleting task:', taskText);
    
    listItem.remove();
    updateTaskCounter();
    updateEmptyState();
    saveTasks(); 
}

//Function to update task counter
function updateTaskCounter() {
    const taskCount = taskList.children.length;
    const taskCounter = document.getElementById('taskCounter');
    
    if (taskCount === 0) {
        taskCounter.textContent = 'No tasks';
    } else if (taskCount === 1) {
        taskCounter.textContent = '1 task';
    } else {
        taskCounter.textContent = taskCount + ' tasks';
    }
    
    console.log('📊 Counter updated:', taskCount, 'tasks');
}

// Function to show/hide empty state
function updateEmptyState() {
    const taskCount = taskList.children.length;
    
    if (taskCount === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
    }
}
// Save tasks to browser storage
function saveTasks() {
    const tasks = [];
    const taskItems = taskList.querySelectorAll('.task-item');
    
    taskItems.forEach(item => {
        tasks.push({
            text: item.querySelector('.task-text').textContent,
            completed: item.classList.contains('completed')
        });
    });
    
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

//Load tasks from storage
function loadTasks() {
    const savedTasks = localStorage.getItem('todoTasks');
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach(task => {
            addTask(task.text);
            if (task.completed) {
                const lastItem = taskList.lastElementChild;
                lastItem.classList.add('completed');
            }
        });
    }
}

// Load saved tasks when page starts
loadTasks();