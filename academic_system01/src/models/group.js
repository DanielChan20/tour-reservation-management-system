import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  career: {
    type: String,
    required: true
  },
  semester: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const Group = mongoose.model('Group', groupSchema);
export default Group;
