import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del tour es obligatorio'],
    trim: true
  },
  destination: {
    type: String,
    required: [true, 'El destino es obligatorio'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  duration: {
    type: Number,
    required: [true, 'La duración es obligatoria'],
    min: [1, 'La duración debe ser al menos 1 día']
  },
  price: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [1, 'El precio debe ser mayor que 0']
  },
  availableDates: [{
    type: Date,
    validate: {
      validator: function(date) {
        return date > new Date(); // la fecha debe ser futura
      },
      message: 'La fecha debe ser posterior a hoy'
    }
  }]
}, {
  timestamps: true
});

export default mongoose.model('Tour', tourSchema);
