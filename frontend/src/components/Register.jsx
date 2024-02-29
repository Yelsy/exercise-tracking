import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ toggleForm }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password
      });
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full">
        <h2 className="text-2xl mb-4">Register</h2>
        <form onSubmit={handleRegister} className="mb-4">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full px-3 py-2 rounded border border-gray-300 mb-2" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 rounded border border-gray-300 mb-2" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 rounded border border-gray-300 mb-2" />
          <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded">Register</button>
          <p className="mt-2 text-center">¿Ya tienes una cuenta? <button type="button" onClick={toggleForm} className="text-blue-500">Iniciar sesión</button></p>
        </form>
      </div>
    </div>
  );
};

export default Register;

