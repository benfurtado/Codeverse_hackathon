import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlantList from './components/PlantList'; // Import your PlantList component
import SecondPage from './components/SecondPage'; // Import your SecondPage component
import VariablePage from './components/VariablePage'; // Import the page where you want to display the variable
import Converter from './components/PngModel';
import ThreeDModel from './components/3dModel';

function App() {
  return (
    <Router>
      <Routes>
        {/* Use element prop and JSX components for defining routes */}
        <Route path="/plant" element={<PlantList />} />
        <Route path="/hi" element={<SecondPage />} />
        <Route path="/" element={<VariablePage />} />
        <Route path="/converter" element={<Converter />} />
        <Route path="/3dmodel" element={<ThreeDModel />} />
      </Routes>
    </Router>
  );
}

export default App;
