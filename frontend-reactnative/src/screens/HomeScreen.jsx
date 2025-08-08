import React from 'react';

export default function HomeScreen({ navigation }) {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenido al sistema de gestión de tours TraveLease</h1>

      <button
        style={styles.button}
        onClick={() => navigation.navigate('Customers')}
        aria-label="Ir a Clientes"
      >
        Clientes
      </button>

      <button
        style={styles.button}
        onClick={() => navigation.navigate('Tours')}
        aria-label="Ir a Tours"
      >
        Tours
      </button>

      <button
        style={styles.button}
        onClick={() => navigation.navigate('Bookings')}
        aria-label="Ir a Reservas"
      >
        Reservas
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: '4rem auto',
    padding: '2rem',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#113F67',
    marginBottom: '2.5rem',
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '12px 0',
    marginBottom: '1.25rem',
    backgroundColor: '#113F67',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '18px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0d2a48',
  }
};
