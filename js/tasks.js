/**
 * V7 Smart Daily Planner - Tasks Module
 * Manages task CRUD operations, filtering, and localStorage persistence
 */

const TasksModule = (function() {
  // Constants
  const STORAGE_KEY = 'v7-tasks';
  
  // State
  let tasks = [];
  let currentFilter = 'all';
  
  // DOM Elements (will be cached on init)
  let elements = {};
  
  /**
   * Initialize the tasks module
   */
  function init() {
    cacheElements();
    loadTasks();
    bindEvents();
    render();
  }
  
  /**
   * Cache DOM elements for performance
   */
  function cacheElements() {
    elements = {
      taskList: document.getElementById('taskList'),
      tasksEmpty: document.getElementById('tasksEmpty'),
      addTaskBtn: document.getElementById('addTaskBtn'),
      taskModal: document.getElementById('taskModal'),
      taskModalTitle: document.getElementById('taskModalTitle'),
      taskModalClose: document.getElementById('taskModalClose'),
      taskModalCancel: document.getElementById('taskModalCancel'),
      taskModalSave: document.getElementById('taskModalSave'),
      taskForm: document.getElementById('taskForm'),
      taskId: document.getElementById('taskId'),
      taskTitle: document.getElementById('taskTitle'),
      taskPriority: document.getElementById('taskPriority'),
      taskDate: document.getElementById('taskDate'),
      filterBtns: document.querySelectorAll('.task-filters .filter-btn')
    };
  }
  
  /**
   * Bind event listeners
   */
  function bindEvents() {
    // Add task button
    elements.addTaskBtn.addEventListener('click', () => openModal());
    
    // Modal controls
    elements.taskModalClose.addEventListener('click', closeModal);
    elements.taskModalCancel.addEventListener('click', closeModal);
    elements.taskModalSave.addEventListener('click', saveTask);
    elements.taskModal.addEventListener('click', (e) => {
      if (e.target === elements.taskModal) closeModal();
    });
    
    // Filter buttons
    elements.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        currentFilter = btn.dataset.filter;
        updateFilterButtons();
        render();
      });
    });
    
    // Form submit prevention
    elements.taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      saveTask();
    });
    
    // Task list delegation
    elements.taskList.addEventListener('click', handleTaskClick);
  }
  
  /**
   * Handle clicks on task items (toggle, edit, delete)
   */
  function handleTaskClick(e) {
    const taskCard = e.target.closest('.task-card');
    if (!taskCard) return;
    
    const taskId = taskCard.dataset.id;
    
    // Toggle complete
    if (e.target.closest('.checkbox')) {
      toggleTask(taskId);
      return;
    }
    
    // Edit button
    if (e.target.closest('.edit-btn')) {
      const task = tasks.find(t => t.id === taskId);
      if (task) openModal(task);
      return;
    }
    
    // Delete button
    if (e.target.closest('.delete-btn')) {
      deleteTask(taskId);
      return;
    }
  }
  
  /**
   * Load tasks from localStorage
   */
  function loadTasks() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      tasks = stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading tasks:', error);
      tasks = [];
    }
  }
  
  /**
   * Save tasks to localStorage
   */
  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  }
  
  /**
   * Open task modal for add/edit
   */
  function openModal(task = null) {
    elements.taskModalTitle.textContent = task ? 'Edit Task' : 'Add New Task';
    elements.taskId.value = task ? task.id : '';
    elements.taskTitle.value = task ? task.title : '';
    elements.taskPriority.value = task ? task.priority : 'medium';
    elements.taskDate.value = task ? task.dueDate || '' : '';
    elements.taskModal.classList.add('active');
    elements.taskTitle.focus();
  }
  
  /**
   * Close task modal
   */
  function closeModal() {
    elements.taskModal.classList.remove('active');
    elements.taskForm.reset();
  }
  
  /**
   * Save task (create or update)
   */
  function saveTask() {
    const title = elements.taskTitle.value.trim();
    if (!title) {
      elements.taskTitle.focus();
      return;
    }
    
    const taskId = elements.taskId.value;
    const taskData = {
      title,
      priority: elements.taskPriority.value,
      dueDate: elements.taskDate.value || null
    };
    
    if (taskId) {
      // Update existing task
      const index = tasks.findIndex(t => t.id === taskId);
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...taskData, updatedAt: new Date().toISOString() };
      }
    } else {
      // Create new task
      const newTask = {
        id: generateId(),
        ...taskData,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      tasks.unshift(newTask);
    }
    
    saveTasks();
    render();
    closeModal();
    
    // Notify calendar to update task counts
    if (typeof CalendarModule !== 'undefined' && CalendarModule.render) {
      CalendarModule.render();
    }
  }
  
  /**
   * Toggle task completion status
   */
  function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      task.updatedAt = new Date().toISOString();
      saveTasks();
      render();
    }
  }
  
  /**
   * Delete a task
   */
  function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    render();
    
    // Notify calendar to update task counts
    if (typeof CalendarModule !== 'undefined' && CalendarModule.render) {
      CalendarModule.render();
    }
  }
  
  /**
   * Filter tasks based on current filter
   */
  function getFilteredTasks() {
    switch (currentFilter) {
      case 'active':
        return tasks.filter(t => !t.completed);
      case 'completed':
        return tasks.filter(t => t.completed);
      case 'high':
        return tasks.filter(t => t.priority === 'high' && !t.completed);
      default:
        return tasks;
    }
  }
  
  /**
   * Update filter button active states
   */
  function updateFilterButtons() {
    elements.filterBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === currentFilter);
    });
  }
  
  /**
   * Render tasks to DOM
   */
  function render() {
    const filteredTasks = getFilteredTasks();
    
    if (filteredTasks.length === 0) {
      elements.taskList.innerHTML = '';
      elements.tasksEmpty.classList.remove('hidden');
      return;
    }
    
    elements.tasksEmpty.classList.add('hidden');
    
    elements.taskList.innerHTML = filteredTasks.map(task => `
      <div class="task-card ${task.completed ? 'completed' : ''}" data-id="${task.id}">
        <div class="checkbox ${task.completed ? 'checked' : ''}">
          ${task.completed ? `
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20,6 9,17 4,12"></polyline>
            </svg>
          ` : ''}
        </div>
        <div class="task-content">
          <div class="task-title">${escapeHtml(task.title)}</div>
          <div class="task-meta">
            <span class="task-priority ${task.priority}">${task.priority}</span>
            ${task.dueDate ? `<span class="task-date">${formatDate(task.dueDate)}</span>` : ''}
          </div>
        </div>
        <div class="task-actions">
          <button class="btn btn-icon btn-ghost edit-btn" title="Edit">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button class="btn btn-icon btn-ghost delete-btn" title="Delete">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3,6 5,6 21,6"></polyline>
              <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    `).join('');
  }
  
  /**
   * Get tasks for a specific date (for calendar integration)
   */
  function getTasksForDate(dateString) {
    return tasks.filter(t => t.dueDate === dateString);
  }
  
  /**
   * Get all tasks (for calendar integration)
   */
  function getAllTasks() {
    return tasks;
  }
  
  /**
   * Generate unique ID
   */
  function generateId() {
    return 'task_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
  
  /**
   * Escape HTML to prevent XSS
   */
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  /**
   * Format date for display
   */
  function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (dateString === today.toISOString().split('T')[0]) {
      return 'Today';
    }
    if (dateString === tomorrow.toISOString().split('T')[0]) {
      return 'Tomorrow';
    }
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  
  // Public API
  return {
    init,
    render,
    getTasksForDate,
    getAllTasks
  };
})();
