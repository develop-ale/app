document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('new-task');
    const todoList = document.getElementById('todo-list');
    const doneList = document.getElementById('done-list');

    // Carica le task iniziali dal server
    loadTasksFromServer();

    // Funzione per caricare le task dal server
    function loadTasksFromServer() {
        fetch('load_tasks.php')
            .then(response => response.json())
            .then(data => {
                data.todoTasks.forEach(taskText => addTask(taskText, false));
                data.doneTasks.forEach(taskText => addTask(taskText, true));
            })
            .catch(error => console.error('Errore nel caricamento delle task:', error));
    }

    // Funzione per aggiungere una nuova task alla lista "To-Do"
    function addTask(taskText, isDone = false) {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;
        taskItem.dataset.taskText = taskText; // Salva il testo della task nei data-attributes
        taskItem.dataset.isDone = isDone ? '1' : '0'; // Salva lo stato della task nei data-attributes
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
        const taskText = taskItem.dataset.taskText;
        const isDone = taskItem.dataset.isDone === '1';

        fetch('update_task.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ taskText, isDone: !isDone }),
        })
        .then(() => {
            if (!isDone) {
                doneList.appendChild(taskItem);
                addDeleteButton(taskItem);
            } else {
                todoList.appendChild(taskItem);
                removeDeleteButton(taskItem);
            }
            taskItem.dataset.isDone = isDone ? '0' : '1';
        })
        .catch(error => console.error('Errore nel salvataggio della task:', error));
    }

    // Funzione per aggiungere il pulsante di eliminazione
    function addDeleteButton(taskItem) {
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✖';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Previene lo spostamento della task al click del pulsante
            deleteTask(taskItem);
        });
        taskItem.appendChild(deleteBtn);
    }

    // Funzione per eliminare una task
    function deleteTask(taskItem) {
        const taskText = taskItem.dataset.taskText;

        fetch('delete_task.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ taskText }),
        })
        .then(() => {
            taskItem.remove();
        })
        .catch(error => console.error('Errore nell\'eliminazione della task:', error));
    }

    // Gestione dell'evento "keypress" per aggiungere una nuova task premendo il tasto Invio
    newTaskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && newTaskInput.value.trim() !== '') {
            const taskText = newTaskInput.value.trim();

            fetch('add_task.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ taskText }),
            })
            .then(() => {
                addTask(taskText);
                newTaskInput.value = ''; // Resetta il campo di input
            })
            .catch(error => console.error('Errore nell\'aggiunta della task:', error));
        }
    });
});
