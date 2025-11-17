const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

// JSON Database file path
const dbPath = path.join(__dirname, 'users.json');

// Initialize database file
const initDatabase = () => {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ users: [], nextId: 1 }, null, 2));
    console.log('✅ JSON Database initialized at:', dbPath);
  } else {
    console.log('✅ JSON Database loaded from:', dbPath);
  }
};

// Read database
const readDatabase = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return { users: [], nextId: 1 };
  }
};

// Write database
const writeDatabase = (data) => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing database:', error);
    throw new Error('Failed to save data');
  }
};

// Initialize on load
initDatabase();

// User operations
const User = {
  // Create a new user
  async create(name, email, password) {
    const db = readDatabase();
    
    // Check if email already exists
    const existingUser = db.users.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: db.nextId,
      name,
      email,
      password: hashedPassword,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    db.users.push(newUser);
    db.nextId += 1;
    writeDatabase(db);

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    };
  },

  // Find user by email (with password for login)
  findByEmail(email) {
    const db = readDatabase();
    return db.users.find(u => u.email === email);
  },

  // Find user by ID (without password)
  findById(id) {
    const db = readDatabase();
    const user = db.users.find(u => u.id === parseInt(id));
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  },

  // Check if email exists
  emailExists(email) {
    const db = readDatabase();
    return db.users.some(u => u.email === email);
  },

  // Verify password
  async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  },

  // Get all users (without passwords)
  getAll() {
    const db = readDatabase();
    return db.users.map(({ password, ...user }) => user);
  },

  // Update user (optional - for future use)
  async update(id, updates) {
    const db = readDatabase();
    const userIndex = db.users.findIndex(u => u.id === parseInt(id));
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    db.users[userIndex] = {
      ...db.users[userIndex],
      ...updates,
      updated_at: new Date().toISOString()
    };

    writeDatabase(db);
    const { password, ...userWithoutPassword } = db.users[userIndex];
    return userWithoutPassword;
  },

  // Delete user (optional - for future use)
  delete(id) {
    const db = readDatabase();
    const userIndex = db.users.findIndex(u => u.id === parseInt(id));
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    db.users.splice(userIndex, 1);
    writeDatabase(db);
    return true;
  }
};

module.exports = { User };
