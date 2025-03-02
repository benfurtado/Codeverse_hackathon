// src/pages/PlantDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import './PlantDetailsPage.css';
import axios from 'axios';

const PlantDetailsPage = () => {
  const { id } = useParams(); // Get the plant ID from the URL
  const [plant, setPlant] = useState(null); // State to store plant details
  const [isSpeaking, setIsSpeaking] = useState(false); // State to track speech status
  const [language, setLanguage] = useState('en'); // State for language toggle
  const [isFavorite, setIsFavorite] = useState(false); // State for favorite toggle
  const [voices, setVoices] = useState([]); // State to store available voices

  // Fetch plant details from the backend
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

  // Load available voices
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

  // Text-to-Speech functionality
  const handleTextToSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(
      language === 'en'
        ? plant.description
        : 'एलोवेरा एक मांसल पौधा है, जो अपने चिकित्सीय गुणों के लिए जाना जाता है। इसका जेल जलन, घावों और त्वचा की सूजन के उपचार के लिए उपयोग किया जाता है। यह एंटीऑक्सिडेंट और एंटीमाइक्रोबियल लाभ प्रदान करता है।'
    );

    // Set the language for the utterance
    utterance.lang = language === 'en' ? 'en-US' : 'hi-IN';

    // Select a Hindi voice if available
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
    speechSynthesis.speak(utterance);

    // Reset speaking state when speech ends
    utterance.onend = () => setIsSpeaking(false);
  };

  // Language toggle functionality
  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'hi' : 'en'));
  };

  // Share functionality
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

  // Favorite functionality
  const toggleFavorite = () => {
    setIsFavorite((prevFavorite) => !prevFavorite);
  };

  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="plant-details">
        {/* 3D Model Space */}
        <div className="model-space">
          <h2>3D Model Placeholder</h2>
          <p>(3D model will be rendered here)</p>
        </div>

        {/* Language Toggle */}
        <button className="language-toggle" onClick={toggleLanguage}>
          {language === 'en' ? 'Switch to Hindi' : 'अंग्रेजी में स्विच करें'}
        </button>

        {/* Plant Name */}
        <h1 className="plant-name">
          {language === 'en' ? plant.name : plant.name === 'Aloe Vera' ? 'एलोवेरा' : 'तुलसी'} {/* Replace with actual Hindi translations */}
        </h1>

        {/* Scientific Name */}
        <h2 className="scientific-name">
          {language === 'en'
            ? plant.scientific_name
            : plant.scientific_name === 'Aloe barbadensis'
            ? 'एलोए बारबडेंसिस'
            : 'ओसिमम टेनुइफ्लोरम'}
        </h2>

        {/* Description and Audio Button */}
        <div className="description-container">
          <p className="description">
            {language === 'en'
              ? plant.description
              : plant.name === 'Aloe Vera'
              ? 'एलोवेरा एक मांसल पौधा है, जो अपने चिकित्सीय गुणों के लिए जाना जाता है। इसका जेल जलन, घावों और त्वचा की सूजन के उपचार के लिए उपयोग किया जाता है। यह एंटीऑक्सिडेंट और एंटीमाइक्रोबियल लाभ प्रदान करता है।'
              : 'तुलसी, जिसे पवित्र तुलसी के रूप में भी जाना जाता है, आयुर्वेद में अपने औषधीय गुणों के लिए व्यापक रूप से उपयोग किया जाता है।'}
          </p>
          <button className="audio-btn" onClick={handleTextToSpeech}>
            {isSpeaking ? '🔊 Speaking...' : '🔈 Listen'}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="share-btn" onClick={handleShare}>
            📤 Share
          </button>
          <button className="favorite-btn" onClick={toggleFavorite}>
            {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default PlantDetailsPage;