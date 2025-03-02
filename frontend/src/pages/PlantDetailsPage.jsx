import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import axios from 'axios';
import ThreeDModel from '../components/ThreeDModel.jsx';
import PlantMap from './PlantMap.jsx';
import './PlantDetailsPage.css';

const PlantDetailsPage = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isFavorite, setIsFavorite] = useState(false);
  const [voices, setVoices] = useState([]);
  const [showMapModal, setShowMapModal] = useState(false);
  let utterance = null;

  useEffect(() => {
    const fetchPlantDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/plants/${id}`);
        setPlant(response.data);
      } catch (error) {
        console.error('Error fetching plant details:', error);
      }
    };

    fetchPlantDetails();
  }, [id]);

  useEffect(() => {
    const loadVoices = () => {
      const voiceList = window.speechSynthesis.getVoices();
      setVoices(voiceList);
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  if (!plant) {
    return <p>Loading plant details...</p>;
  }

  const handleTextToSpeech = () => {
    if (utterance) {
      window.speechSynthesis.cancel();
    }
    utterance = new SpeechSynthesisUtterance(
      `${plant.name} (${plant.scientific_name}). ${plant.description}. Plant Type: ${plant.plant_type}. Peak Season: ${plant.peak_season}. Growth Method: ${plant.growth_method}. Suitable Climate: ${plant.temp_location_suitability}. Region: ${plant.region || 'N/A'}. Medicinal Use: ${plant.medicinal_use}. Nutrients and Benefits: ${plant.nutrients_and_benefits}.`
    );
    utterance.lang = language === 'en' ? 'en-US' : 'hi-IN';

    if (language === 'hi') {
      const hindiVoice = voices.find((voice) => voice.lang === 'hi-IN');
      if (hindiVoice) {
        utterance.voice = hindiVoice;
      } else {
        alert('Hindi voice not available. Please install a Hindi language pack or try another browser.');
        return;
      }
    }

    setIsSpeaking(true);
    setIsPaused(false);
    speechSynthesis.speak(utterance);

    utterance.onend = () => setIsSpeaking(false);
  };

  const pauseSpeech = () => {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
      speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resumeSpeech = () => {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'hi' : 'en'));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: plant.name,
        text: `Learn more about ${plant.name} and its medicinal uses!`,
        url: window.location.href,
      });
    } else {
      alert('Sharing is not supported on this device.');
    }
  };

  const toggleFavorite = () => {
    setIsFavorite((prevFavorite) => !prevFavorite);
  };

  // Instead of opening a new tab, show the map modal
  const openMap = () => {
    setShowMapModal(true);
  };

  return (
    <>
      <Header />
      <div className="plant-details-container">
        <ThreeDModel modelPath={plant.modelPath} />
        <div className="plant-info">
          <h1>{plant.name} ({plant.scientific_name})</h1>
          <p><strong>Description:</strong> {plant.description}</p>
          <p><strong>Plant Type:</strong> {plant.plant_type}</p>
          <p><strong>Peak Season:</strong> {plant.peak_season}</p>
          <p><strong>Growth Method:</strong> {plant.growth_method}</p>
          <p><strong>Suitable Climate:</strong> {plant.temp_location_suitability}</p>
          <p><strong>Region:</strong> {plant.region || 'N/A'}</p>
          <p><strong>Medicinal Use:</strong> {plant.medicinal_use}</p>
          <p><strong>Nutrients and Benefits:</strong> {plant.nutrients_and_benefits}</p>

          <div className="audio-controls">
            <button className="audio-btn" onClick={handleTextToSpeech} disabled={isSpeaking && !isPaused}>
              {isSpeaking && !isPaused ? '🔊 Speaking...' : '🔈 Listen'}
            </button>
            <button className="audio-btn" onClick={pauseSpeech} disabled={!isSpeaking || isPaused}>⏸️ Pause</button>
            <button className="audio-btn" onClick={resumeSpeech} disabled={!isPaused}>▶️ Play</button>
          </div>

          <div className="action-buttons">
            <button className="share-btn" onClick={handleShare}>📤 Share</button>
            <button className="favorite-btn" onClick={toggleFavorite}>
              {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
            </button>
            <button className="map-btn" onClick={openMap}>🗺️ View on Map</button>
          </div>
        </div>
      </div>

      {/* Map Modal */}
      {showMapModal && (
        <div className="map-modal">
          <div className="map-modal-content">
            <button className="close-modal-btn" onClick={() => setShowMapModal(false)}>✖</button>
            <PlantMap plants={[plant]} selectedPlantId={plant.id} onPlantSelect={() => {}} />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default PlantDetailsPage;
