import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000/api', // Usa tu IP si corres en dispositivo real
  withCredentials: true, // Para enviar cookies
});

export default instance;