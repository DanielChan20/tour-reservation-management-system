import Booking from '../models/booking.js';
import Tour from '../models/tour.js';

export const createBooking = async (req, res) => {
  try {
    const { customer, tour, numberOfPeople } = req.body;

    const selectedTour = await Tour.findById(tour);
    if (!selectedTour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    const totalPrice = selectedTour.price * numberOfPeople;

    const newBooking = new Booking({
      customer,
      tour,
      numberOfPeople,
      totalPrice
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('customer')
      .populate('tour');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('customer')
      .populate('tour');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const { customer, tour, numberOfPeople } = req.body;

    const selectedTour = await Tour.findById(tour);
    if (!selectedTour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    const totalPrice = selectedTour.price * numberOfPeople;

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { customer, tour, numberOfPeople, totalPrice },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
