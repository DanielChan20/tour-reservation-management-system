import express from 'express';
import {
  createTour,
  getAllTours,
  getTourById,
  updateTour,
  deleteTour
} from '../controllers/tour.controller.js';

const router = express.Router();

router.post('/tours', createTour);
router.get('/tours', getAllTours);
router.get('/tours/:id', getTourById);
router.put('/tours/:id', updateTour);
router.delete('/tours/:id', deleteTour);

export default router;
