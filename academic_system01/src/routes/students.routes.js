import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  getAllStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent
} from '../controllers/student.controller.js';

const router = Router();

// Rutas RESTful correctas
router.get('/students', authRequired, getAllStudents);         // Obtener todos
router.get('/students/:id', authRequired, getStudentById);     // Obtener uno
router.post('/students', authRequired, createStudent);         // Crear uno
router.put('/students/:id', authRequired, updateStudent);      // Actualizar uno
router.delete('/students/:id', authRequired, deleteStudent);   // Eliminar uno

export default router;

