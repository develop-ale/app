document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('new-task');
    const todoList = document.getElementById('todo-list');
    const doneList = document.getElementById('done-list');

    // Funzione per aggiungere una nuova task alla lista "To-Do"
    function addTask(taskText) {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;
        taskItem.addEventListener('click', () => moveTask(taskItem));
        todoList.appendChild(taskItem);
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
    }

    // Funzione per aggiungere il pulsante di eliminazione
    function addDeleteButton(taskItem) {
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✖';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Previene lo spostamento della task al click del pulsante
            taskItem.remove();
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
        }
    });
});
