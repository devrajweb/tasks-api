const db = require('../config/database');

const Task = {
    getAll: (userID, callback) => {
        db.query('SELECT * FROM tasks WHERE user_id = ?', [userID], callback);
    },
getById: (id, userId, callback) => {
        db.query('SELECT * FROM tasks WHERE id = ? AND user_id = ?', [id, userId], callback);
    },
    
    create: (task, userId, callback) => {
        db.query(
            'INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)',
            [task.title, task.description, task.status, userId],
            callback
        );
    },
    
    update: (id, task, userId, callback) => {
        db.query(
            'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?',
            [task.title, task.description, task.status, id, userId],
            callback
        );
    },
    
    delete: (id, userId, callback) => {
        db.query('DELETE FROM tasks WHERE id = ? AND user_id = ?', [id, userId], callback);
    },
    search:(userid, query, callback) => {
        const searchQuery = `%${query}%`;
        db.query(
            'SELECT * from tasks where user_id=? AND (title LIKE ? OR description LIKE ?)', [userid, searchQuery, searchQuery],
            callback
        );
    }
};
module.exports = Task;