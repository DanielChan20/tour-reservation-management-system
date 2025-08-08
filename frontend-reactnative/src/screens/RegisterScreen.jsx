import React, { useState } from 'react';
import axios from '../api/axios';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRegister = async () => {
    if (!email.trim()) {
      window.alert('Por favor ingresa tu correo electrónico');
      return;
    }
    if (!isValidEmail(email)) {
      window.alert('El correo electrónico no es válido');
      return;
    }
    if (!username.trim()) {
      window.alert('Por favor ingresa tu nombre de usuario');
      return;
    }
    if (!password.trim()) {
      window.alert('Por favor ingresa una contraseña');
      return;
    }

    setLoading(true);
    try {
      await axios.post('/register', { email, username, password });
      window.alert('¡Cuenta creada con éxito! Ahora puedes iniciar sesión.');
      navigation.navigate('Login');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error en el registro';
      window.alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>TraveLease - Crear Cuenta</h1>

      <label style={styles.label}>Correo electrónico</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
        placeholder="correo@ejemplo.com"
        autoComplete="email"
      />

      <label style={styles.label}>Nombre de usuario</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
        placeholder="Tu nombre de usuario"
        autoComplete="username"
      />

      <label style={styles.label}>Contraseña</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
        placeholder="********"
        autoComplete="new-password"
      />

      <button
        onClick={handleRegister}
        disabled={loading}
        style={loading ? {...styles.button, opacity: 0.6} : styles.button}
      >
        {loading ? 'Creando cuenta...' : 'REGISTRARSE'}
      </button>

      <p style={styles.loginText}>
        ¿Ya tienes cuenta?{' '}
        <span
          style={styles.loginLink}
          onClick={() => navigation.navigate('Login')}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => { if(e.key === 'Enter') navigation.navigate('Login'); }}
        >
          Iniciar sesión
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
  loginText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
    color: '#444',
  },
  loginLink: {
    color: '#007BFF',
    cursor: 'pointer',
    fontWeight: '600',
    textDecoration: 'underline',
  },
};

