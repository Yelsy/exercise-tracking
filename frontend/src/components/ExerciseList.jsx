import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExerciseForm from './ExerciseForm';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [isEditing, setIsEditing] = useState(false); 
  const [editedExercise, setEditedExercise] = useState(null); 
  const [showForm, setShowForm] = useState(false);
  const [caloriesPerDay, setCaloriesPerDay] = useState({});

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const response = await axios.get('http://localhost:5000/exercises');
      setExercises(response.data);
      calculateCaloriesPerDay(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/exercises/${id}`);
      fetchExercises();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id, newData) => {
    try {
      await axios.put(`http://localhost:5000/exercises/${id}`, newData);
      fetchExercises();
      setIsEditing(false); 
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (exercise) => {
    setEditedExercise(exercise); 
    setIsEditing(true); 
  };

  const handleCancelEdit = () => {
    setIsEditing(false); 
    setEditedExercise(null); 
  };
  const handleFieldChange = (fieldName, value) => {
    setEditedExercise(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      await handleUpdate(editedExercise._id, editedExercise);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleNewExerciseClick = () => {
    setShowForm(true); 
  };

  const calculateCaloriesPerDay = (exercises) => {
    const caloriesPerDayObj = {};
    exercises.forEach(exercise => {
      const date = new Date(exercise.date).toDateString(); // Suponiendo que hay un campo de fecha en cada ejercicio
      caloriesPerDayObj[date] = caloriesPerDayObj[date] || 0;
      caloriesPerDayObj[date] += exercise.caloriesBurned;
    });
    setCaloriesPerDay(caloriesPerDayObj);
  };

  return (
    <div>
    {isEditing && (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Editar Ejercicio</h3>
          <form onSubmit={handleSubmitEdit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del ejercicio</label>
              <input type="text" id="name" name="name" value={editedExercise.name} onChange={(e) => handleFieldChange('name', e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>
            <div className="mb-4">
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duración (minutos)</label>
              <input type="number" id="duration" name="duration" value={editedExercise.duration} onChange={(e) => handleFieldChange('duration', e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>
            <div className="mb-4">
              <label htmlFor="intensity" className="block text-sm font-medium text-gray-700">Intensidad</label>
              <input type="text" id="intensity" name="intensity" value={editedExercise.intensity} onChange={(e) => handleFieldChange('intensity', e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={handleCancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600">Cancelar</button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Guardar Cambios</button>
            </div>
          </form>
        </div>
      </div>
    )}
      <h2 className="text-2xl font-semibold mb-4 mt-8 text-center">Lista de Ejercicios</h2>
      {/* Botón "New Exercise" */}
      <button onClick={handleNewExerciseClick} className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 mx-auto block">New Exercise</button>
      
      {/* Mostrar el formulario de registro si showForm es true */}
      {showForm && <ExerciseForm fetchExercises={fetchExercises} setShowForm={setShowForm} />}

      <ul className="divide-y divide-gray-200">
        {exercises.map(exercise => (
          <li key={exercise._id} className="py-6 flex justify-between items-center">
            <div>
              <p className="text-xl font-semibold">{exercise.name}</p>
              <p className="text-lg text-gray-500">Duración: {exercise.duration} min</p>
              <p className="text-lg text-gray-500">Intensidad: {exercise.intensity}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => handleDelete(exercise._id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Eliminar</button>
              <button onClick={() => handleEdit(exercise)} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">Actualizar</button>
            </div>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-semibold mb-4 mt-8 text-center">Calorías Quemadas por Día</h2>
      <ul className="divide-y divide-gray-200">
        {Object.entries(caloriesPerDay).map(([date, calories]) => (
          <li key={date} className="py-6 flex justify-between items-center">
            <div>
              <p className="text-xl font-semibold">{date}</p>
              <p className="text-lg text-gray-500">Calorías quemadas: {calories}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseList;



