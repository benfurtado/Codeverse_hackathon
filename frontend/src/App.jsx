import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home.jsx';
import ThreeDModel from './components/3dModel.jsx';
import Identify from './components/plant_iden.jsx';
import TTS from './components/tts.jsx';
import Paragraphs from './components/paragraph.jsx';
import PlantInfo from './components/plantInfo.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/3dModel" element={<ThreeDModel />} />
        <Route path="/identify" element={<Identify />} />
        <Route path="/tts" element={<TTS />} />
        <Route path='/paragraph' element={<Paragraphs />} />
        <Route path='/plantInfo' element={<PlantInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
