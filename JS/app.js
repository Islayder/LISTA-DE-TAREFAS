document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('new-task-input');
  const addTaskButton = document.getElementById('add-task-button');
  const taskList = document.getElementById('task-list');

  const loadTasks = () => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => {
          addTaskToDOM(task.text, task.completed);
      });
  };

  const saveTasks = () => {
      const tasks = [];
      document.querySelectorAll('.task-item').forEach(taskItem => {
          tasks.push({
              text: taskItem.querySelector('.task-text').textContent,
              completed: taskItem.classList.contains('completed')
          });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const addTaskToDOM = (taskText, completed = false) => {
      const taskRow = document.createElement('tr');
      taskRow.className = 'task-item';

      if (completed) {
          taskRow.classList.add('completed');
      }

      const taskTextCell = document.createElement('td');
      taskTextCell.className = 'task-text';
      taskTextCell.textContent = taskText;

      const actionsCell = document.createElement('td');

      const completeButton = document.createElement('button');
      completeButton.className = 'complete';
      completeButton.textContent = completed ? 'Desmarcar' : 'Concluir';
      completeButton.addEventListener('click', () => {
          taskRow.classList.toggle('completed');
          completeButton.textContent = taskRow.classList.contains('completed') ? 'Desmarcar' : 'Concluir';
          saveTasks();
      });

      const removeButton = document.createElement('button');
      removeButton.className = 'remove';
      removeButton.textContent = 'Remover';
      removeButton.addEventListener('click', () => {
          taskRow.remove();
          saveTasks();
      });

      actionsCell.appendChild(completeButton);
      actionsCell.appendChild(removeButton);

      taskRow.appendChild(taskTextCell);
      taskRow.appendChild(actionsCell);
      taskList.appendChild(taskRow);
  };

  addTaskButton.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText) {
          addTaskToDOM(taskText);
          taskInput.value = '';
          saveTasks();
      }
  });

  loadTasks();
});
