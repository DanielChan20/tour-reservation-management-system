import { Router } from 'express';
import { login, register, logout, profile } from '../controllers/authControllers.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/profile', authRequired, profile);



export default router;  // Export the router to be used in the main app file
