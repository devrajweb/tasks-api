const Task = require('../models/taskModel');

exports.getAllTasks = (req, res) => {
    Task.getAll(req.user.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getTaskById = (req, res) => {
    Task.getById(req.params.id, req.user.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Task not found' });
        res.json(results[0]);
    });
};

exports.createTask = (req, res) => {
    const { title, description } = req.body;

     if(!title || !description){
        return res.status(400).json({ message:'title & description are required!' });
    }
    const task = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status || 'pending'
    };
    
    Task.create(task, req.user.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: results.insertId, ...task });
    });
};

exports.updateTask = (req, res) => {
    const { title, description } = req.body;
    if(!title || !description){
        return res.status(400).json({ message:'title & description are required!' });
    }
    const task = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    };
    
    Task.update(req.params.id, task, req.user.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task updated successfully' });
    });
};

exports.deleteTask = (req, res) => {
    Task.delete(req.params.id, req.user.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted successfully' });
    });

};

exports.searchTasks = (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ message: 'Search query is required' });
    }

    Task.search(req.user.id, query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};