import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ toggleForm, onLogin }) => { // Añade onLogin como una prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
      console.log(response.data);
      onLogin(); // Llama a la función onLogin cuando el inicio de sesión sea exitoso
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full">
        <h2 className="text-2xl mb-4">Login</h2>
        <form onSubmit={handleLogin} className="mb-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 rounded border border-gray-300 mb-2" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 rounded border border-gray-300 mb-2" />
          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded">Login</button>
          <p className="mt-2 text-center">¿No tienes cuenta? <button type="button" onClick={toggleForm} className="text-blue-500">Registrarse</button></p>
        </form>
      </div>
    </div>
  );
};

export default Login;



