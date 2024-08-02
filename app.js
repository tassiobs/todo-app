document.addEventListener('DOMContentLoaded', () => {
    const apiBaseUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:-20De9st';
  
    // DOM elements
    const categoryInput = document.getElementById('categoryInput');
    const taskInput = document.getElementById('taskInput');
    const categorySelect = document.getElementById('categorySelect');
    const categoryList = document.getElementById('categoryList');
    const taskList = document.getElementById('taskList');
    const addCategoryButton = document.getElementById('addCategoryButton');
    const addTaskButton = document.getElementById('addTaskButton');
  
    // Fetch functions
    async function fetchCategories() {
      try {
        const response = await fetch(`${apiBaseUrl}/category`);
        const categories = await response.json();
        
        categoryList.innerHTML = '';
        categorySelect.innerHTML = '';
  
        categories.forEach(category => {
          const li = document.createElement('li');
          li.textContent = category.name;
          li.dataset.id = category.id;
          li.addEventListener('click', () => deleteCategory(category.id));
          categoryList.appendChild(li);
  
          const option = document.createElement('option');
          option.value = category.id;
          option.textContent = category.name;
          categorySelect.appendChild(option);
        });
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
  
    async function fetchTasks() {
      try {
        const response = await fetch(`${apiBaseUrl}/tasks`);
        const tasks = await response.json();
        
        taskList.innerHTML = '';
  
        tasks.forEach(task => {
          const li = document.createElement('li');
          li.textContent = `${task.name} (Category: ${task.category})`;
          li.dataset.id = task.id;
          li.addEventListener('click', () => deleteTask(task.id));
          taskList.appendChild(li);
        });
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
  
    // Add functions
    async function addCategory() {
      const name = categoryInput.value.trim();
  
      if (name) {
        try {
          await fetch(`${apiBaseUrl}/category`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
          });
  
          categoryInput.value = '';
          await fetchCategories();
        } catch (error) {
          console.error('Error adding category:', error);
        }
      }
    }
  
    async function addTask() {
      const name = taskInput.value.trim();
      const category = categorySelect.value;
  
      if (name && category) {
        try {
          await fetch(`${apiBaseUrl}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, category })
          });
  
          taskInput.value = '';
          await fetchTasks();
        } catch (error) {
          console.error('Error adding task:', error);
        }
      }
    }
  
    // Delete functions
    async function deleteCategory(id) {
      try {
        await fetch(`${apiBaseUrl}/category/${id}`, { method: 'DELETE' });
        await fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  
    async function deleteTask(id) {
      try {
        await fetch(`${apiBaseUrl}/tasks/${id}`, { method: 'DELETE' });
        await fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  
    // Event listeners
    addCategoryButton.addEventListener('click', addCategory);
    addTaskButton.addEventListener('click', addTask);
  
    // Initial fetch
    fetchCategories();
    fetchTasks();
});
