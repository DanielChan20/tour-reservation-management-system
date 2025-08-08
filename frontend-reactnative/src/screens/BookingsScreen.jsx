import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Divider,
  Box,
} from '@mui/material';
import axios from '../api/axios';

export default function BookingsScreen() {
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [tours, setTours] = useState([]);

  const [customer, setCustomer] = useState('');
  const [tour, setTour] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    try {
      const [bookingsRes, customersRes, toursRes] = await Promise.all([
        axios.get('/bookings'),
        axios.get('/customers'),
        axios.get('/tours'),
      ]);

      setBookings(bookingsRes.data);
      setCustomers(
        customersRes.data.map((c) => ({
          _id: c._id,
          name: c.fullName || 'Sin nombre',
        }))
      );
      setTours(
        toursRes.data.map((t) => ({
          _id: t._id,
          title: t.name || 'Sin título',
        }))
      );
    } catch (error) {
      console.error('Error al cargar datos:', error);
      alert('Error al cargar datos');
    }
  };

  const handleSubmit = async () => {
    if (!customer || !tour || !numberOfPeople) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const payload = {
      customer,
      tour,
      numberOfPeople: Number(numberOfPeople),
    };

    try {
      if (editingId) {
        await axios.put(`/bookings/${editingId}`, payload);
        alert('Reserva actualizada exitosamente.');
        setEditingId(null);
      } else {
        await axios.post('/bookings', payload);
        alert('Reserva creada exitosamente.');
      }

      setCustomer('');
      setTour('');
      setNumberOfPeople('');
      fetchData();
    } catch (err) {
      alert('No se pudo guardar la reserva.');
      console.error(err);
    }
  };

  const handleEdit = (booking) => {
    setCustomer(booking.customer?._id || '');
    setTour(booking.tour?._id || '');
    setNumberOfPeople(String(booking.numberOfPeople));
    setEditingId(booking._id);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Para facilitar ver el formulario al editar
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar esta reserva?')) {
      try {
        await axios.delete(`/bookings/${id}`);
        alert('Reserva eliminada exitosamente.');
        fetchData();
      } catch (err) {
        alert('No se pudo eliminar la reserva.');
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6, px: 4, minHeight: '80vh' }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: '#113F67', fontWeight: '700', mb: 3, textAlign: 'center' }}
      >
        Gestión de Reservas - TraveLease
      </Typography>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ mb: 4 }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          {editingId ? 'Editar Reserva' : 'Nueva Reserva'}
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="customer-label">Cliente</InputLabel>
          <Select
            labelId="customer-label"
            value={customer}
            label="Cliente"
            onChange={(e) => setCustomer(e.target.value)}
            required
          >
            <MenuItem value="">
              <em>Seleccionar cliente</em>
            </MenuItem>
            {customers.map((c) => (
              <MenuItem key={c._id} value={c._id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="tour-label">Tour</InputLabel>
          <Select
            labelId="tour-label"
            value={tour}
            label="Tour"
            onChange={(e) => setTour(e.target.value)}
            required
          >
            <MenuItem value="">
              <em>Seleccionar tour</em>
            </MenuItem>
            {tours.map((t) => (
              <MenuItem key={t._id} value={t._id}>
                {t.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Número de personas"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(e.target.value)}
          type="number"
          fullWidth
          sx={{ mb: 2 }}
          inputProps={{ min: 1 }}
          required
        />

        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
          {editingId ? 'Actualizar' : 'Crear'}
        </Button>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Reservas
      </Typography>

      {bookings.length === 0 && (
        <Typography variant="body1" sx={{ mb: 2 }}>
          No hay reservas registradas.
        </Typography>
      )}

      {bookings.map((b) => (
        <Card key={b._id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" color="primary">
              {b.customer?.fullName || 'Cliente eliminado'} - {b.tour?.name || 'Tour eliminado'}
            </Typography>
            <Typography variant="body2">Personas: {b.numberOfPeople}</Typography>
            <Typography variant="body2">
              Total: ${b.totalPrice?.toFixed(2) || 0}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => handleEdit(b)}>
              Editar
            </Button>
            <Button size="small" color="error" onClick={() => handleDelete(b._id)}>
              Eliminar
            </Button>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
}
