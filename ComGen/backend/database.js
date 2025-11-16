const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

// Create or open database
const dbPath = path.join(__dirname, '..', 'database.sqlite');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create users table
const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`;

db.exec(createUsersTable);

console.log('✅ Database initialized at:', dbPath);

// Helper functions
const userQueries = {
  // Create new user
  create: db.prepare(`
    INSERT INTO users (name, email, password)
    VALUES (?, ?, ?)
  `),

  // Find user by email
  findByEmail: db.prepare(`
    SELECT id, name, email, password, created_at
    FROM users
    WHERE email = ?
  `),

  // Find user by ID
  findById: db.prepare(`
    SELECT id, name, email, created_at
    FROM users
    WHERE id = ?
  `),

  // Check if email exists
  emailExists: db.prepare(`
    SELECT COUNT(*) as count
    FROM users
    WHERE email = ?
  `),

  // Get all users (without passwords)
  getAll: db.prepare(`
    SELECT id, name, email, created_at
    FROM users
    ORDER BY created_at DESC
  `)
};

// User operations
const User = {
  // Create a new user
  async create(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = userQueries.create.run(name, email, hashedPassword);
    return {
      id: result.lastInsertRowid,
      name,
      email
    };
  },

  // Find user by email (with password for login)
  findByEmail(email) {
    return userQueries.findByEmail.get(email);
  },

  // Find user by ID (without password)
  findById(id) {
    return userQueries.findById.get(id);
  },

  // Check if email exists
  emailExists(email) {
    const result = userQueries.emailExists.get(email);
    return result.count > 0;
  },

  // Verify password
  async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  },

  // Get all users
  getAll() {
    return userQueries.getAll.all();
  }
};

module.exports = { db, User };
