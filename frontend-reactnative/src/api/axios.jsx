import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://tour-reservation-management-system.vercel.app/api'
  : 'http://192.168.0.9:4000/api'

const instance = axios.create({
  baseURL,
  withCredentials: true,
});
export default instance;