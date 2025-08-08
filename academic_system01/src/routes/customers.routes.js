import express from 'express';
import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
} from '../controllers/customer.controller.js';

const router = express.Router();

router.post('/customers', createCustomer);
router.get('/customers', getAllCustomers);
router.get('/customers/:id', getCustomerById);
router.put('/customers/:id', updateCustomer);
router.delete('/customers/:id', deleteCustomer);

export default router;
