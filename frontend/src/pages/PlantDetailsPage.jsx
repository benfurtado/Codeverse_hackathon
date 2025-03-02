import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header.jsx'; // Import Header
import Footer from '../components/Footer.jsx'; // Import Footer
import ThreeDModel from '../components/3dModel.jsx'; // Import 3D Model Component
import './PlantDetailsPage.css'; // Import CSS

// Sample plant data
const plants = [
  {
    id: 1,
    name: 'Tulsi',
    scientificName: 'Ocimum tenuiflorum',
    description:
      'Tulsi, also known as Holy Basil, is widely used in Ayurveda for its medicinal properties. It helps boost immunity and reduces stress.',
    image: '/images/Tulsi.jpg',
    medicinalUse: 'Immunity',
    region: 'North India',
    type: 'Herb',
    modelPath: '/images/model/curved.glb', // Add model path for each plant
  },
  {
    id: 2,
    name: 'Neem',
    scientificName: 'Azadirachta indica',
    description:
      'Neem is a versatile plant with antibacterial and antifungal properties. It is commonly used for skin and digestive health.',
    image: '/images/neem.jpg',
    medicinalUse: 'Digestion',
    region: 'South India',
    type: 'Tree',
    modelPath: '/images/model/green-neem.glb', // Add model path for each plant
  },
  // Add more plants with their respective model paths...
];

const PlantDetailsPage = () => {
  const { id } = useParams(); // Get the plant ID from the URL
  const plant = plants.find((p) => p.id === parseInt(id));
  const [isSpeaking, setIsSpeaking] = useState(false); // State to track speech status
  const [language, setLanguage] = useState('en'); // State for language toggle
  const [isFavorite, setIsFavorite] = useState(false); // State for favorite toggle
  const [voices, setVoices] = useState([]); // State to store available voices

  useEffect(() => {
    // Load available voices
    const loadVoices = () => {
      const voiceList = window.speechSynthesis.getVoices();
      setVoices(voiceList);
    };

    // Some browsers require the voiceschanged event to populate voices
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  if (!plant) {
    return <p>Plant not found.</p>;
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
      <ThreeDModel modelPath={plant.modelPath} />

      {/* Main Content */}
      <div className="plant-details">


        {/* Language Toggle */}
        <button className="language-toggle" onClick={toggleLanguage}>
          {language === 'en' ? 'Switch to Hindi' : 'अंग्रेजी में स्विच करें'}
        </button>

        {/* Plant Name */}
        <h1 className="plant-name">
          {language === 'en' ? plant.name : plant.name === 'Aloe Vera' ? 'एलोवेरा' : 'तुलसी'}
        </h1>

        {/* Scientific Name */}
        <h2 className="scientific-name">
          {language === 'en'
            ? plant.scientificName
            : plant.scientificName === 'Aloe barbadensis'
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