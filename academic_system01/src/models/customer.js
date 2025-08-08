import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'El nombre completo es obligatorio'],
    trim: true,
    minlength: [3, 'El nombre debe tener al menos 3 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'El correo electrónico no es válido']
  },
  phone: {
    type: String,
    required: [true, 'El número de teléfono es obligatorio'],
    match: [/^\d{10,15}$/, 'El número de teléfono no es válido']
  },
  address: {
    type: String,
    trim: true,
    default: 'No especificada'
  }
}, {
  timestamps: true
});

export default mongoose.model('Customer', customerSchema);
