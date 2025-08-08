import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import connectDB from './connection/db.js';
import authRoutes from './routes/auth.js';
import careersRoutes from './routes/careers.routes.js';
import studentRoutes from './routes/students.routes.js';
import groupsRoutes from './routes/groups.routes.js';


import tourRoutes from './routes/tours.routes.js';
import customerRoutes from './routes/customers.routes.js';
import bookingRoutes from './routes/bookings.routes.js';

dotenv.config();

connectDB();

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(cors({
  origin: [
    'http://localhost:8081',     // Para desarrollo local
    'http://192.168.0.9:8081',   // Para acceder desde otro dispositivo en tu red
    'https://tour-reservation-management-system.vercel.app',  // El dominio real del frontend en producción
  ],
  credentials: true,
}));

app.use(cookieParser());

// Rutas protegidas con authRequired
app.use('/api', authRoutes);
app.use('/api', careersRoutes);
app.use('/api', studentRoutes);
app.use('/api', groupsRoutes);

app.use('/api', tourRoutes);
app.use('/api', customerRoutes);
app.use('/api', bookingRoutes);


export default app;
