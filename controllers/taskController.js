const  Task  = require('../models/taskModel'); // Ensure this path is correct
const { Sequelize } = require('sequelize');

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { user_id: req.user.id } });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ where: { id: req.params.id, user_id: req.user.id } });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createTask = async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Title & description are required!' });
    }

    const task = {
        title,
        description,
        status: req.body.status || 'pending',
        user_id: req.user.id
    };

    try {
        const newTask = await Task.create(task);
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTask = async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Title & description are required!' });
    }

    const task = {
        title,
        description,
        status: req.body.status
    };

    try {
        const [updated] = await Task.update(task, { where: { id: req.params.id, user_id: req.user.id } });
        if (!updated) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const deleted = await Task.destroy({ where: { id: req.params.id, user_id: req.user.id } });
        if (!deleted) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.searchTasks = async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ message: 'Search query is required' });
    }

    try {
        const tasks = await Task.findAll({
            where: {
                user_id: req.user.id,
                [Op.or]: [
                    { title: { [Op.like]: `%${query}%` } },
                    { description: { [Op.like]: `%${query}%` } }
                ]
            }
        });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
