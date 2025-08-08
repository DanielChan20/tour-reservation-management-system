import React, { useState } from 'react';
import axios from '../api/axios';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    if (!email.trim()) {
      window.alert('Por favor ingresa tu correo electrónico');
      return;
    }
    if (!isValidEmail(email)) {
      window.alert('El correo electrónico no es válido');
      return;
    }
    if (!password.trim()) {
      window.alert('Por favor ingresa tu contraseña');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('/login', { email, password });

      window.alert(
        `Bienvenido a TraveLease\nHola ${res.data.username || 'usuario'}, gracias por confiar en TraveLease para gestionar tus reservas turísticas.`
      );
      navigation.navigate('Home'); // Ajusta según tu navegación
    } catch (err) {
      const message = err.response?.data?.message || 'Error al iniciar sesión. Por favor verifica tus credenciales.';
      window.alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>TraveLease - Iniciar sesión</h1>

      <label style={styles.label}>Correo electrónico</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
        placeholder="correo@ejemplo.com"
        autoComplete="email"
      />

      <label style={styles.label}>Contraseña</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
        placeholder="********"
        autoComplete="current-password"
      />

      <button
        onClick={handleLogin}
        disabled={loading}
        style={loading ? { ...styles.button, opacity: 0.6, cursor: 'not-allowed' } : styles.button}
      >
        {loading ? 'Cargando...' : 'INICIAR SESIÓN'}
      </button>

      <p style={styles.registerText}>
        ¿No tienes cuenta?{' '}
        <span
          style={styles.registerLink}
          onClick={() => navigation.navigate('Register')}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter') navigation.navigate('Register');
          }}
        >
          Crear cuenta
        </span>
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: '3rem auto',
    padding: '2rem',
    backgroundColor: '#e8f0fe',
    borderRadius: 10,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#004085',
    marginBottom: '2rem',
  },
  label: {
    display: 'block',
    marginBottom: 6,
    marginTop: 12,
    fontWeight: '600',
    color: '#222',
  },
  input: {
    width: '100%',
    height: 40,
    padding: '0 10px',
    borderRadius: 8,
    border: '1px solid #bbb',
    fontSize: 16,
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    marginTop: 24,
    padding: '10px 0',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: 8,
    fontSize: 18,
    cursor: 'pointer',
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
    color: '#444',
  },
  registerLink: {
    color: '#007BFF',
    cursor: 'pointer',
    fontWeight: '600',
    textDecoration: 'underline',
  },
};

