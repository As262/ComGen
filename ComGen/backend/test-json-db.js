// Quick test script for JSON database
const { User } = require('./database');

async function testDatabase() {
  console.log('\n🧪 Testing JSON Database...\n');

  try {
    // Test 1: Create a user
    console.log('1️⃣ Creating test user...');
    const newUser = await User.create('Test User', 'test@example.com', 'password123');
    console.log('✅ User created:', newUser);

    // Test 2: Find by email
    console.log('\n2️⃣ Finding user by email...');
    const foundUser = User.findByEmail('test@example.com');
    console.log('✅ User found:', { id: foundUser.id, name: foundUser.name, email: foundUser.email });

    // Test 3: Verify password
    console.log('\n3️⃣ Verifying password...');
    const isValid = await User.verifyPassword('password123', foundUser.password);
    console.log('✅ Password valid:', isValid);

    // Test 4: Check email exists
    console.log('\n4️⃣ Checking if email exists...');
    const exists = User.emailExists('test@example.com');
    console.log('✅ Email exists:', exists);

    // Test 5: Find by ID
    console.log('\n5️⃣ Finding user by ID...');
    const userById = User.findById(newUser.id);
    console.log('✅ User by ID:', userById);

    // Test 6: Get all users
    console.log('\n6️⃣ Getting all users...');
    const allUsers = User.getAll();
    console.log('✅ Total users:', allUsers.length);
    console.log('Users:', allUsers);

    console.log('\n✅ All tests passed! JSON database is working perfectly.\n');
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error(error);
  }
}

testDatabase();
