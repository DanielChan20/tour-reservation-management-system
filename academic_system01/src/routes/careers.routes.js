import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import Career from '../models/career.js';
import { createCareer,deleteCareer, getAllCareers, getCareerById, updateCareer } from '../controllers/career.Controller.js';
const router = Router();

router.get('/careers', authRequired, async (req, res) => {
  try {
    const careers = await Career.find();
    res.json(careers);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener carreras' });
  }
});
router.post('/careers/create', authRequired,  createCareer)
router.post('/careers/delete', authRequired,  deleteCareer)
router.delete('/careers/:id', authRequired, deleteCareer);
router.put('/careers/:id', authRequired, updateCareer);


export default router;