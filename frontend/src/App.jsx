import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import ExerciseList from './components/ExerciseList';

const App = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const toggleForm = () => {
    setIsLoginForm(prevState => !prevState);
  };

  const handleLogin = () => {
    console.log('Handle login called');
    setIsLoggedIn(true); 
  };

  return (
    <div className="max-w-md mx-auto">
      {!isLoggedIn && (isLoginForm ? <Login toggleForm={toggleForm} onLogin={handleLogin} /> : <Register toggleForm={toggleForm} />)}
      
      {/* Mostrar el formulario de ejercicio si el usuario está autenticado */}
      {isLoggedIn && <ExerciseList />}
    </div>
  );
};

export default App;



