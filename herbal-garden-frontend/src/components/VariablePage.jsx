import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const VariablePage = () => {
  const [variable, setVariable] = useState('');
  const [error, setError] = useState(null);
  const mountRef = useRef(null); // Ref to track mounted component

  useEffect(() => {
    const fetchVariable = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/send_variable/');
        setVariable(response.data.variable); // Store the variable in state
      } catch (error) {
        console.error('There was an error fetching the variable:', error);
        setError('Failed to load variable. Please try again later.');
      }
    };

    fetchVariable();

    return () => {
      // Cleanup logic (if needed)
      console.log('Cleaning up, mountRef:', mountRef.current);
    };
  }, []);

  return (
    <div ref={mountRef}>
      <h1>Welcome to the home Page</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <p>{variable}</p>
      )}

      <Link to="/3dmodel">
        <button>See Model</button>
      </Link>

      <img src="/logo192.png" alt="Logo" />
    </div>
  );
};

export default VariablePage;
