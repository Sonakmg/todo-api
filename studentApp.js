const mongoose = require('mongoose');
require('dotenv').config();

// 1. Define Student Schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 65
  }
});

// 2. Create Student Model
const Student = mongoose.model('Student', studentSchema);

// 3. Connect to MongoDB Atlas
async function connectDB() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }
  
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB Atlas');
  } catch (err) {
    console.error('❌ Connection error:', err.message);
    process.exit(1);
  }
}

// 4. CRUD Operations
async function main() {
  await connectDB();

  // Create a student
  const newStudent = new Student({
    name: 'John Doe',
    age: 21
  });

  // Save to database
  await newStudent.save();
  console.log('📝 Student created:', newStudent);

  // Read all students
  const students = await Student.find();
  console.log('📋 All students:');
  console.log(students);

  // Close connection
  await mongoose.disconnect();
}

main();