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
import axios from '../api/axios'; // Asegúrate que esta instancia de axios está configurada para tu backend

export default function ToursScreen() {
  const [tours, setTours] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    _id: '',
    name: '',
    destination: '',
    description: '',
    duration: '',
    price: '',
  });

  const fetchTours = async () => {
    try {
      const res = await axios.get('/tours');
      setTours(res.data);
    } catch (error) {
      alert('No se pudieron cargar los tours.');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este tour?')) {
      try {
        await axios.delete(`/tours/${id}`);
        fetchTours();
      } catch (error) {
        alert('No se pudo eliminar el tour.');
        console.error(error);
      }
    }
  };

  const handleSubmit = async () => {
    // Validación simple
    if (!form.name.trim() || !form.destination.trim() || !form.duration || !form.price) {
      alert('Por favor completa los campos requeridos: Nombre, Destino, Duración y Precio.');
      return;
    }

    const data = {
      name: form.name.trim(),
      destination: form.destination.trim(),
      description: form.description.trim(),
      duration: Number(form.duration),
      price: Number(form.price),
    };

    try {
      if (isEditing) {
        await axios.put(`/tours/${form._id}`, data);
        alert('Tour actualizado exitosamente.');
      } else {
        await axios.post('/tours', data);
        alert('Tour creado exitosamente.');
      }
      fetchTours();
      closeDialog();
    } catch (err) {
      alert('Verifica los campos e intenta de nuevo.');
      console.error(err);
    }
  };

  const openDialogToEdit = (tour) => {
    setForm({
      _id: tour._id,
      name: tour.name,
      destination: tour.destination,
      description: tour.description || '',
      duration: String(tour.duration),
      price: String(tour.price),
    });
    setIsEditing(true);
    setOpen(true);
  };

  const openDialogToCreate = () => {
    setForm({ _id: '', name: '', destination: '', description: '', duration: '', price: '' });
    setIsEditing(false);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setForm({ _id: '', name: '', destination: '', description: '', duration: '', price: '' });
  };

  useEffect(() => {
    fetchTours();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6, px: 4, minHeight: '80vh' }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: '#113F67', fontWeight: '700' }}
      >
        Gestión de Tours - TraveLease
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={openDialogToCreate}
        sx={{ mb: 3 }}
      >
        Agregar Tour
      </Button>

      {tours.map((tour) => (
        <Card key={tour._id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" color="primary">{tour.name}</Typography>
            <Typography variant="body2">Destino: {tour.destination}</Typography>
            <Typography variant="body2">Duración: {tour.duration} días</Typography>
            <Typography variant="body2">Precio: ${tour.price}</Typography>
            {tour.description && (
              <Typography variant="body2" sx={{ mt: 1 }}>{tour.description}</Typography>
            )}
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => openDialogToEdit(tour)}>Editar</Button>
            <Button size="small" color="error" onClick={() => handleDelete(tour._id)}>
              Eliminar
            </Button>
          </CardActions>
        </Card>
      ))}

      <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>{isEditing ? 'Editar Tour' : 'Nuevo Tour'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            fullWidth
            margin="dense"
            required
          />
          <TextField
            label="Destino"
            value={form.destination}
            onChange={(e) => setForm({ ...form, destination: e.target.value })}
            fullWidth
            margin="dense"
            required
          />
          <TextField
            label="Descripción"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            fullWidth
            margin="dense"
            multiline
            rows={3}
          />
          <TextField
            label="Duración (días)"
            value={form.duration}
            type="number"
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            fullWidth
            margin="dense"
            required
            inputProps={{ min: 1 }}
          />
          <TextField
            label="Precio"
            value={form.price}
            type="number"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            fullWidth
            margin="dense"
            required
            inputProps={{ min: 0 }}
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
