import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  customer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Customer', 
    required: [true, 'El cliente es obligatorio'] 
  },
  tour: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Tour', 
    required: [true, 'El tour es obligatorio'] 
  },
  bookingDate: { 
    type: Date, 
    default: Date.now,
    validate: {
      validator: function (date) {
        return date <= new Date();
      },
      message: 'La fecha de reserva no puede estar en el futuro'
    }
  },
  numberOfPeople: { 
    type: Number, 
    required: [true, 'Debes especificar el número de personas'], 
    min: [1, 'Debe reservarse al menos para una persona'], 
    max: [50, 'Máximo 50 personas por reserva'] 
  },
  totalPrice: { 
    type: Number,
    min: [0, 'El precio total no puede ser negativo']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'credit_card', 'paypal'],
    default: 'cash'
  },
  notes: {
    type: String,
    maxlength: 500
  }
}, {
  timestamps: true
});

export default mongoose.model('Booking', bookingSchema);

