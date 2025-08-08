#  TravelEase - Tour Reservation Management System

Proyecto **Data bases for cloud computing**
Este es un proyecto para la gestión de **Clientes**, **Tours** y **Reservas**.
Creado por: Daniel Chan

---

##  Características
El presente proyecto contiene:
- Autenticación de usuarios con JWT (registro e inicio de sesión).
- CRUD completo para:
  - Clientes
  - Tours
  - Reservas
- Protección de rutas para usuarios autenticados.
- Backend con Node.js, Express y MongoDB.
- Frontend con React Native y React Navigation.
- Integración de CORS para desarrollo y producción.
- Despliegue en Vercel.

---

##  Estructura del proyecto
proyecto
┣  backend
┃ ┣  controllers
┃ ┣  models
┃ ┣  routes
┃ ┗ app.js
┣  frontend-reactnative
┃ ┣  screens
┃ ┣  components
┃ ┗ App.js
┣  README.md
┗  .env

# En caso deconfigurar el backend
cd backend
npm install

Crear archivo .env con la conexión mongodb y el JWT, ejemplo:
MONGODB_URI=tu_conexion_mongodb
JWT_SECRET=tu_secreto_seguro
PORT=4000

## Iniciar el servidor
npm run dev

# Configurar el frontend
cd frontend-reactnative
npm install
npm start



# Tecnologías utilizadas
- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React Native, React Navigation, React Native Paper
- Autenticación: JSON Web Tokens (JWT), bcryptjs
- Despliegue: Vercel
- Herramientas: Axios, CORS, Morgan

-----------------
Este es un proyecto académico de la Universidad Tecnológica de la Riviera Maya, Playa del Carmen. Es de uso libre con fines educativos.


