const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authenticateToken = require('../middleware/auth');

router.get('/', authenticateToken, taskController.getAllTasks);
router.get('/:id', authenticateToken, taskController.getTaskById);
router.post('/', authenticateToken, taskController.createTask);
router.put('/:id', authenticateToken, taskController.updateTask);
router.delete('/:id', authenticateToken, taskController.deleteTask);
router.get('/search/me', authenticateToken, taskController.searchTasks);

module.exports = router;