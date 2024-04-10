window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value.trim();
        if (!task) return; // Don't add empty tasks

        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = task;
        task_input_el.setAttribute('readonly', 'readonly');
        task_content_el.appendChild(task_input_el);

        const task_status_el = document.createElement('select');
        task_status_el.classList.add('task-status');
        ['Planned', 'In Progress', 'Completed'].forEach(status => {
            const option = document.createElement('option');
            option.value = status.toLowerCase().replace(' ', '-');
            option.innerText = status;
            task_status_el.appendChild(option);
        });
        task_content_el.appendChild(task_status_el);


        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');
        
        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerText = 'Edit';

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerText = 'Delete';

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        list_el.appendChild(task_el);

        input.value = ''; // Clear the input field after adding

        task_edit_el.addEventListener('click', () => {
			// I added if, else statements here 
            if (task_edit_el.innerText.toLowerCase() === "edit") {
                task_edit_el.innerText = "Save";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
            } else {
                task_edit_el.innerText = "Edit";
                task_input_el.setAttribute("readonly", "readonly");
            }
        });

        task_delete_el.addEventListener('click', () => {
            list_el.removeChild(task_el);
        });
        task_status_el.addEventListener('change', () => {
            task_el.className = 'task ' + task_status_el.value;  
        });
    });

    const suggestBtn = document.getElementById('suggest-task-btn');
    suggestBtn.addEventListener('click', () => {
        const randomTask = getRandomTask();
        alert(`Suggested Task: ${randomTask}`);
    });
});

function getRandomTask() {
    const randomIndex = Math.floor(Math.random() * suggestedTasks.length);
    return suggestedTasks[randomIndex];
}

document.addEventListener('DOMContentLoaded', () => {
    const suggestBtn = document.getElementById('suggest-task-btn');
    suggestBtn.addEventListener('click', () => {
        const randomTask = getRandomTask();
        alert(`What about? ${randomTask}`);
		appendChild(randomTask);
    });
});


function filterTasks(status) {
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
        if (status === 'all' || task.classList.contains(status)) {
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    });
}
