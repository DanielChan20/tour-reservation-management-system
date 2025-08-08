import React, { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from '@mui/material';
import axios from '../api/axios';

export default function CustomersScreen() {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    _id: '',
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchCustomers = async () => {
    try {
      const res = await axios.get('/customers');
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
      alert('Error al cargar los clientes.');
    }
  };

  const openDialogToCreate = () => {
    setForm({ _id: '', fullName: '', email: '', phone: '', address: '' });
    setIsEditing(false);
    setOpen(true);
  };

  const openDialogToEdit = (customer) => {
    setForm(customer);
    setIsEditing(true);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setForm({ _id: '', fullName: '', email: '', phone: '', address: '' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este cliente?')) {
      try {
        await axios.delete(`/customers/${id}`);
        fetchCustomers();
      } catch (err) {
        console.error(err);
        alert('Error al eliminar el cliente.');
      }
    }
  };

  const handleSubmit = async () => {
    if (!form.fullName.trim() || !form.email.trim() || !form.phone.trim()) {
      alert('Por favor completa los campos requeridos: Nombre, Email y Teléfono.');
      return;
    }

    const data = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
    };

    try {
      if (isEditing) {
        await axios.put(`/customers/${form._id}`, data);
        alert('Cliente actualizado exitosamente.');
      } else {
        await axios.post('/customers', data);
        alert('Cliente creado exitosamente.');
      }
      fetchCustomers();
      closeDialog();
    } catch (err) {
      console.error(err);
      alert('Error al guardar los datos del cliente.');
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Clientes paginados
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentCustomers = customers.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(customers.length / itemsPerPage);

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        mb: 6,
        px: 4,
        minHeight: '80vh',
        // Sin límites de altura ni scroll interno,
        // el scroll será natural en la página
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: '#113F67', fontWeight: '700' }}
      >
        Gestión de Clientes - TraveLease
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={openDialogToCreate}
        sx={{ mb: 3 }}
      >
        Agregar Cliente
      </Button>

      {/* Aquí se muestran los clientes paginados, sin scroll interno */}
      {currentCustomers.map((customer) => (
        <Card key={customer._id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" color="primary">
              {customer.fullName}
            </Typography>
            <Typography variant="body2">Email: {customer.email}</Typography>
            <Typography variant="body2">Teléfono: {customer.phone}</Typography>
            {customer.address && (
              <Typography variant="body2">Dirección: {customer.address}</Typography>
            )}
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => openDialogToEdit(customer)}>
              Editar
            </Button>
            <Button
              size="small"
              color="error"
              onClick={() => handleDelete(customer._id)}
            >
              Eliminar
            </Button>
          </CardActions>
        </Card>
      ))}

      {/* Controles de paginación */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
        <Button
          variant="outlined"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <Typography sx={{ pt: 1 }}>
          Página {currentPage} de {totalPages}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </Button>
      </Box>

      {/* Modal para crear/editar */}
      <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>{isEditing ? 'Editar Cliente' : 'Nuevo Cliente'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre completo"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            fullWidth
            margin="dense"
            required
          />
          <TextField
            label="Correo electrónico"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            fullWidth
            margin="dense"
            type="email"
            required
          />
          <TextField
            label="Teléfono"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            fullWidth
            margin="dense"
            required
          />
          <TextField
            label="Dirección"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {isEditing ? 'Actualizar' : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}


