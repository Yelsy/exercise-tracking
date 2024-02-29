import React, { useState } from 'react';
import axios from 'axios';

const ExerciseForm = ({ fetchExercises, setShowForm }) => {
  const [exerciseData, setExerciseData] = useState({
    name: '',
    duration: '',
    intensity: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExerciseData({ ...exerciseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/exercises', exerciseData);
      fetchExercises();
      setShowForm(false);
      setSuccessMessage('¡Ejercicio registrado exitosamente!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error al registrar el ejercicio. Inténtalo de nuevo más tarde.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nombre del ejercicio</label>
          <input type="text" name="name" id="name" autoComplete="off" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={exerciseData.name} onChange={handleChange} required />
        </div>
        <div className="mb-6">
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">Duración (minutos)</label>
          <input type="number" name="duration" id="duration" autoComplete="off" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={exerciseData.duration} onChange={handleChange} required />
        </div>
        <div className="mb-6">
          <label htmlFor="intensity" className="block text-sm font-medium text-gray-700 mb-2">Intensidad</label>
          <input type="text" name="intensity" id="intensity" autoComplete="off" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={exerciseData.intensity} onChange={handleChange} required />
        </div>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        <div className="mt-8">
          <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Registrar Ejercicio
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExerciseForm;







