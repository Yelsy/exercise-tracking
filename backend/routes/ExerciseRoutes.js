// Rutas para el seguimiento de ejercicios
const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');

const calculateCaloriesBurned = (durationInMinutes, intensity) => {
    // Supongamos que la intensidad se mide en una escala del 1 al 10, donde 1 es baja intensidad y 10 es alta intensidad
    // Supongamos también que el usuario tiene un peso corporal promedio de 70 kg
    
    const weightInKg = 70; // Peso corporal en kg
    const METs = intensity * 3.5; // METs (Metabolic Equivalent of Task)
    
    // Fórmula para calcular las calorías quemadas: Calorías quemadas = METs * peso corporal (kg) * duración del ejercicio (horas)
    const caloriesBurnedPerHour = METs * weightInKg;
    const hours = durationInMinutes / 60; // Convertir minutos a horas
    const caloriesBurned = caloriesBurnedPerHour * hours;
  
    return caloriesBurned;
  };

// Crear un nuevo ejercicio
router.post('/', async (req, res) => {
  const { name, duration, intensity } = req.body;
  const caloriesBurned = calculateCaloriesBurned(duration, intensity);
  const exercise = new Exercise({ name, duration, intensity, caloriesBurned });
  try {
    const savedExercise = await exercise.save();
    res.status(201).json({ message: '¡Ejercicio registrado exitosamente!', exercise: savedExercise });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Obtener todos los ejercicios
router.get('/', async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para editar un ejercicio
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, duration, intensity } = req.body;
    const caloriesBurned = calculateCaloriesBurned(duration, intensity);
  
    try {
      const updatedExercise = await Exercise.findByIdAndUpdate(
        id,
        { name, duration, intensity, caloriesBurned },
        { new: true } // Esto asegura que devolvamos la versión actualizada del ejercicio
      );
      res.json(updatedExercise);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Ruta para eliminar un ejercicio
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await Exercise.findByIdAndDelete(id);
      res.json({ message: 'Exercise deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
