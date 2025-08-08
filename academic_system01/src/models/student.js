import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  student_code: { type: String, required: true, unique: true, trim: true },
  first_name: { type: String, required: true, trim: true },
  last_name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  birth_date: { type: Date, required: true },
  active: { type: Boolean, default: true }
}, {
  timestamps: true
});

export default mongoose.model('Student', studentSchema);
