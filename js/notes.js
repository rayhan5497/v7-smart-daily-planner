/**
 * V7 Smart Daily Planner - Notes Module
 * Manages notes CRUD, auto-save, and search functionality
 */

const NotesModule = (function () {
    // Constants
    const STORAGE_KEY = 'v7-notes';
    const AUTO_SAVE_DELAY = 500; // milliseconds

    // State
    let notes = [];
    let searchQuery = '';
    let autoSaveTimer = null;

    // DOM Elements
    let elements = {};

    /**
     * Initialize the notes module
     */
    function init() {
        cacheElements();
        loadNotes();
        bindEvents();
        render();
    }

    /**
     * Cache DOM elements
     */
    function cacheElements() {
        elements = {
            notesGrid: document.getElementById('notesGrid'),
            notesEmpty: document.getElementById('notesEmpty'),
            notesSearch: document.getElementById('notesSearch'),
            addNoteBtn: document.getElementById('addNoteBtn'),
            noteModal: document.getElementById('noteModal'),
            noteModalTitle: document.getElementById('noteModalTitle'),
            noteModalClose: document.getElementById('noteModalClose'),
            noteModalCancel: document.getElementById('noteModalCancel'),
            noteModalSave: document.getElementById('noteModalSave'),
            noteModalDelete: document.getElementById('noteModalDelete'),
            noteForm: document.getElementById('noteForm'),
            noteId: document.getElementById('noteId'),
            noteTitle: document.getElementById('noteTitle'),
            noteContent: document.getElementById('noteContent'),
            noteSaveStatus: document.getElementById('noteSaveStatus')
        };
    }

    /**
     * Bind event listeners
     */
    function bindEvents() {
        // Add note button
        elements.addNoteBtn.addEventListener('click', () => openModal());

        // Modal controls
        elements.noteModalClose.addEventListener('click', closeModal);
        elements.noteModalCancel.addEventListener('click', closeModal);
        elements.noteModalSave.addEventListener('click', saveNote);
        elements.noteModalDelete.addEventListener('click', deleteCurrentNote);
        elements.noteModal.addEventListener('click', (e) => {
            if (e.target === elements.noteModal) closeModal();
        });

        // Search input
        elements.notesSearch.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            render();
        });

        // Auto-save on typing
        elements.noteTitle.addEventListener('input', () => triggerAutoSave());
        elements.noteContent.addEventListener('input', () => triggerAutoSave());

        // Form submit prevention
        elements.noteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            saveNote();
        });

        // Notes grid delegation
        elements.notesGrid.addEventListener('click', handleNoteClick);
    }

    /**
     * Handle clicks on notes
     */
    function handleNoteClick(e) {
        const noteCard = e.target.closest('.note-card');
        if (!noteCard) return;

        const noteId = noteCard.dataset.id;
        const note = notes.find(n => n.id === noteId);
        if (note) {
            openModal(note);
        }
    }

    /**
     * Load notes from localStorage
     */
    function loadNotes() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            notes = stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading notes:', error);
            notes = [];
        }
    }

    /**
     * Save notes to localStorage
     */
    function saveNotes() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
        } catch (error) {
            console.error('Error saving notes:', error);
        }
    }

    /**
     * Open note modal for add/edit
     */
    function openModal(note = null) {
        elements.noteModalTitle.textContent = note ? 'Edit Note' : 'New Note';
        elements.noteId.value = note ? note.id : '';
        elements.noteTitle.value = note ? note.title : '';
        elements.noteContent.value = note ? note.content : '';
        elements.noteSaveStatus.textContent = '';

        // Show/hide delete button
        elements.noteModalDelete.style.display = note ? 'inline-flex' : 'none';

        elements.noteModal.classList.add('active');
        elements.noteTitle.focus();
    }

    /**
     * Close note modal
     */
    function closeModal() {
        elements.noteModal.classList.remove('active');
        elements.noteForm.reset();

        // Clear any pending auto-save
        if (autoSaveTimer) {
            clearTimeout(autoSaveTimer);
            autoSaveTimer = null;
        }
    }

    /**
     * Trigger auto-save with debounce
     */
    function triggerAutoSave() {
        elements.noteSaveStatus.textContent = 'Saving...';

        if (autoSaveTimer) {
            clearTimeout(autoSaveTimer);
        }

        autoSaveTimer = setTimeout(() => {
            const noteId = elements.noteId.value;
            const title = elements.noteTitle.value.trim();
            const content = elements.noteContent.value.trim();

            // Only auto-save if there's an existing note and content
            if (noteId && (title || content)) {
                const index = notes.findIndex(n => n.id === noteId);
                if (index !== -1) {
                    notes[index].title = title || 'Untitled';
                    notes[index].content = content;
                    notes[index].updatedAt = new Date().toISOString();
                    saveNotes();
                    render();
                    elements.noteSaveStatus.textContent = 'Saved';

                    // Clear status after 2 seconds
                    setTimeout(() => {
                        elements.noteSaveStatus.textContent = '';
                    }, 2000);
                }
            }
        }, AUTO_SAVE_DELAY);
    }

    /**
     * Save note (create or update)
     */
    function saveNote() {
        const title = elements.noteTitle.value.trim() || 'Untitled';
        const content = elements.noteContent.value.trim();

        const noteId = elements.noteId.value;
        const noteData = {
            title,
            content,
            updatedAt: new Date().toISOString()
        };

        if (noteId) {
            // Update existing note
            const index = notes.findIndex(n => n.id === noteId);
            if (index !== -1) {
                notes[index] = { ...notes[index], ...noteData };
            }
        } else {
            // Create new note
            const newNote = {
                id: generateId(),
                ...noteData,
                createdAt: new Date().toISOString()
            };
            notes.unshift(newNote);
        }

        saveNotes();
        render();
        closeModal();
    }

    /**
     * Delete current note
     */
    function deleteCurrentNote() {
        const noteId = elements.noteId.value;
        if (!noteId) return;

        notes = notes.filter(n => n.id !== noteId);
        saveNotes();
        render();
        closeModal();
    }

    /**
     * Get filtered notes based on search
     */
    function getFilteredNotes() {
        if (!searchQuery) return notes;

        return notes.filter(note =>
            note.title.toLowerCase().includes(searchQuery) ||
            note.content.toLowerCase().includes(searchQuery)
        );
    }

    /**
     * Render notes to DOM
     */
    function render() {
        const filteredNotes = getFilteredNotes();

        if (filteredNotes.length === 0) {
            elements.notesGrid.innerHTML = '';
            elements.notesEmpty.classList.remove('hidden');

            // Update empty state message based on search
            const emptyTitle = elements.notesEmpty.querySelector('.empty-state-title');
            const emptyText = elements.notesEmpty.querySelector('.empty-state-text');

            if (searchQuery) {
                emptyTitle.textContent = 'No matching notes';
                emptyText.textContent = 'Try a different search term';
            } else {
                emptyTitle.textContent = 'No notes yet';
                emptyText.textContent = 'Click "New Note" to write your first note';
            }
            return;
        }

        elements.notesEmpty.classList.add('hidden');

        elements.notesGrid.innerHTML = filteredNotes.map(note => `
      <div class="note-card" data-id="${note.id}">
        <div class="note-title">${escapeHtml(note.title)}</div>
        <div class="note-preview">${escapeHtml(note.content) || 'No content'}</div>
        <div class="note-meta">${formatRelativeTime(note.updatedAt)}</div>
      </div>
    `).join('');
    }

    /**
     * Generate unique ID
     */
    function generateId() {
        return 'note_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
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
     * Format relative time
     */
    function formatRelativeTime(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;

        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    // Public API
    return {
        init,
        render
    };
})();
