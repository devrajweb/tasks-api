const db = require('../config/database');
const bcrypt = require('bcryptjs');

const User = {
    create: (user, callback) => {
        bcrypt.hash(user.password, 10, (err, hash) => {
            if (err) return callback(err);
            db.query(
                'INSERT INTO users (username, password) VALUES (?, ?)',
                [user.username, hash],
                callback
            );
        });
    },

    findByUsername: (username, callback) => {
        db.query('SELECT * FROM users WHERE username = ?', [username], callback);
    }
};

module.exports = User;