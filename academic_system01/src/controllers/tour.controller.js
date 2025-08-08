import Tour from '../models/tour.js';

// Crear un tour
export const createTour = async (req, res) => {
  try {
    const newTour = new Tour(req.body);
    const savedTour = await newTour.save();
    res.status(201).json(savedTour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los tours
export const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un tour por ID
export const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: 'Tour not found' });
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un tour
export const updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un tour
export const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Tour deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
