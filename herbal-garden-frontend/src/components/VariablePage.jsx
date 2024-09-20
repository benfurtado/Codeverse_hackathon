import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const VariablePage = () => {
  const [variable, setVariable] = useState('');

  useEffect(() => {
    // Make a request to the Django API endpoint
    axios.get('http://localhost:8000/api/send_variable/')
      .then(response => {
        setVariable(response.data.variable); // Store the variable in state
      })
      .catch(error => {
        console.error('There was an error fetching the variable:', error);
      });
  }, []);

  return (
    <div>
      <h1>Welcome to the home Page</h1>
      <p>{variable}</p>

      <Link to="/3dmodel">
        <button>See Model</button>
      </Link>

      <img src="/logo192.png" alt="Logo" />
    </div>
  );
};

export default VariablePage;
