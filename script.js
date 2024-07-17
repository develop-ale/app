document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('new-task');
    const todoList = document.getElementById('todo-list');
    const doneList = document.getElementById('done-list');

    // Funzione per aggiungere una nuova task alla lista "To-Do"
    function addTask(taskText, isDone = false) {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;
        taskItem.addEventListener('click', () => moveTask(taskItem));
        if (isDone) {
            doneList.appendChild(taskItem);
            addDeleteButton(taskItem);
        } else {
            todoList.appendChild(taskItem);
        }
    }

    // Funzione per spostare una task tra le liste "To-Do" e "Done"
    function moveTask(taskItem) {
        if (taskItem.parentElement.id === 'todo-list') {
            doneList.appendChild(taskItem);
            addDeleteButton(taskItem);
        } else {
            todoList.appendChild(taskItem);
            removeDeleteButton(taskItem);
        }
        saveTasks();
    }

    // Funzione per aggiungere il pulsante di eliminazione
    function addDeleteButton(taskItem) {
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✖';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Previene lo spostamento della task al click del pulsante
            taskItem.remove();
            saveTasks();
        });
        taskItem.appendChild(deleteBtn);
    }

    // Funzione per rimuovere il pulsante di eliminazione
    function removeDeleteButton(taskItem) {
        const deleteBtn = taskItem.querySelector('.delete-btn');
        if (deleteBtn) {
            deleteBtn.remove();
        }
    }

    // Gestione dell'evento "keypress" per aggiungere una nuova task premendo il tasto Invio
    newTaskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && newTaskInput.value.trim() !== '') {
            addTask(newTaskInput.value.trim());
            newTaskInput.value = ''; // Resetta il campo di input
            saveTasks();
        }
    });

    // Funzione per salvare le task nel localStorage
    function saveTasks() {
        const todoTasks = [];
        const doneTasks = [];

        todoList.querySelectorAll('li').forEach(task => {
            todoTasks.push(task.textContent.replace('✖', '').trim());
        });

        doneList.querySelectorAll('li').forEach(task => {
            doneTasks.push(task.textContent.replace('✖', '').trim());
        });

        localStorage.setItem('todoTasks', JSON.stringify(todoTasks));
        localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
    }

    // Funzione per caricare le task dal localStorage
    function loadTasks() {
        const todoTasks = JSON.parse(localStorage.getItem('todoTasks')) || [];
        const doneTasks = JSON.parse(localStorage.getItem('doneTasks')) || [];

        todoTasks.forEach(taskText => addTask(taskText, false));
        doneTasks.forEach(taskText => addTask(taskText, true));
    }

    // Carica le task quando la pagina viene caricata
    loadTasks();
});
