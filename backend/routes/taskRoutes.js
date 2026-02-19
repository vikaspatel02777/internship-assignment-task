const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/tasks and POST /api/tasks
router.get('/', protect, getTasks);
router.post('/', protect, createTask);

// PUT /api/tasks/:id and DELETE /api/tasks/:id
router.put('/:id', protect, updateTask);
router.delete('/:id', protect, deleteTask);

module.exports = router;
