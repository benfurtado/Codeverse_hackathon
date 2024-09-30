import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home.jsx';
import ThreeDModel from './components/3dModel.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/3dModel" element={<ThreeDModel />} />
      </Routes>
    </Router>
  );
}

export default App;
