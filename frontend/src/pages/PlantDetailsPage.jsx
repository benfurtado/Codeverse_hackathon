// src/pages/PlantDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header.jsx'; // Import Header
import Footer from '../components/Footer.jsx'; // Import Footer
import './PlantDetailsPage.css'; // Create this CSS file
import ThreeDModel from '../components/3dModel.jsx';


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
  },
  {
    id: 3,
    name: 'Turmeric',
    scientificName: 'Curcuma longa',
    description:
      'Turmeric is a powerful herb with anti-inflammatory properties. It is used in traditional medicine and cooking.',
    image: '/images/turmeric.jpg',
    medicinalUse: 'Immunity',
    region: 'East India',
    type: 'Herb',
  },
  {
    id: 4,
    name: 'Aloe Vera',
    scientificName: 'Aloe barbadensis',
    description:
      'Aloe Vera is a succulent plant known for its healing properties. Its gel is widely used to treat burns, wounds, and skin irritations. It also has antioxidant and antimicrobial benefits.',
    image: '/images/aloevera.jpg',
    medicinalUse: 'Skin Care',
    region: 'West India',
    type: 'Herb',
  },
  {
    id: 5,
    name: 'Ashwagandha',
    scientificName: 'Withania somnifera',
    description:
      'Ashwagandha is an adaptogenic herb that helps reduce stress and anxiety. It is also known to improve energy levels and support overall well-being.',
    image: '/images/ashwagandha.jpg',
    medicinalUse: 'Stress Relief',
    region: 'Central India',
    type: 'Shrub',
  },
  {
    id: 6,
    name: 'Brahmi',
    scientificName: 'Bacopa monnieri',
    description:
      'Brahmi is traditionally used to enhance memory and cognitive function. It is also known for its calming effects on the mind.',
    image: '/images/brahmi.jpg',
    medicinalUse: 'Memory Enhancement',
    region: 'South India',
    type: 'Herb',
  },
  {
    id: 7,
    name: 'Giloy',
    scientificName: 'Tinospora cordifolia',
    description:
      'Giloy is a potent herb used in Ayurveda to boost immunity and detoxify the body. It is also beneficial for managing fever and infections.',
    image: '/images/giloy.jpg',
    medicinalUse: 'Immunity',
    region: 'North India',
    type: 'Climber',
  },
  {
    id: 8,
    name: 'Mint',
    scientificName: 'Mentha',
    description:
      'Mint is widely used for its cooling and refreshing properties. It aids digestion, relieves headaches, and is often used in teas and culinary dishes.',
    image: '/images/mint.jpg',
    medicinalUse: 'Digestion',
    region: 'North India',
    type: 'Herb',
  },
  {
    id: 9,
    name: 'Lavender',
    scientificName: 'Lavandula',
    description:
      'Lavender is known for its calming and soothing properties. It is often used in aromatherapy to reduce stress and promote relaxation.',
    image: '/images/lavender.jpg',
    medicinalUse: 'Relaxation',
    region: 'Himalayan Region',
    type: 'Herb',
  },
  {
    id: 10,
    name: 'Ginger',
    scientificName: 'Zingiber officinale',
    description:
      'Ginger is a popular spice with anti-inflammatory and antioxidant properties. It is commonly used to relieve nausea, improve digestion, and boost immunity.',
    image: '/images/ginger.jpg',
    medicinalUse: 'Digestion',
    region: 'East India',
    type: 'Herb',
  },
  {
    id: 11,
    name: 'Lemon Grass',
    scientificName: 'Cymbopogon citratus',
    description:
      'Lemon Grass is widely used for its detoxifying properties. It is also known for its refreshing aroma and is often used in teas and culinary dishes.',
    image: '/images/lemongrass.jpg',
    medicinalUse: 'Detoxification',
    region: 'South India',
    type: 'Herb',
  },
  {
    id: 12,
    name: 'Fenugreek',
    scientificName: 'Trigonella foenum-graecum',
    description:
      'Fenugreek is commonly used to manage diabetes and improve digestion. Its seeds are rich in nutrients and have numerous health benefits.',
    image: '/images/fenugreek.jpg',
    medicinalUse: 'Diabetes Management',
    region: 'North India',
    type: 'Herb',
  },
  {
    id: 13,
    name: 'Peppermint',
    scientificName: 'Mentha piperita',
    description:
      'Peppermint is known for its cooling properties and is often used to relieve headaches and improve digestion.',
    image: '/images/peppermint.jpg',
    medicinalUse: 'Headache Relief',
    region: 'West India',
    type: 'Herb',
  },
  {
    id: 14,
    name: 'Holy Basil (Krishna Tulsi)',
    scientificName: 'Ocimum sanctum',
    description:
      'Holy Basil, also known as Krishna Tulsi, is used for respiratory health and is a key ingredient in many Ayurvedic remedies.',
    image: '/images/krishnatulsi.jpg',
    medicinalUse: 'Respiratory Health',
    region: 'Central India',
    type: 'Herb',
  },
  {
    id: 15,
    name: 'Indian Gooseberry (Amla)',
    scientificName: 'Phyllanthus emblica',
    description:
      'Indian Gooseberry, or Amla, is rich in Vitamin C and is widely used for hair and skin health. It also boosts immunity.',
    image: '/images/amla.jpg',
    medicinalUse: 'Hair & Skin Health',
    region: 'South India',
    type: 'Tree',
  },
  {
    id: 16,
    name: 'Licorice',
    scientificName: 'Glycyrrhiza glabra',
    description:
      'Licorice is used to soothe sore throats and support respiratory health. It also has anti-inflammatory properties.',
    image: '/images/licorice.jpg',
    medicinalUse: 'Sore Throat Relief',
    region: 'North India',
    type: 'Herb',
  },
  {
    id: 17,
    name: 'Sandalwood',
    scientificName: 'Santalum album',
    description:
      'Sandalwood is known for its skin-soothing properties and is often used in cosmetics and traditional rituals.',
    image: '/images/sandalwood.jpg',
    medicinalUse: 'Skin Soothing',
    region: 'South India',
    type: 'Tree',
  },
  {
    id: 18,
    name: 'Black Pepper',
    scientificName: 'Piper nigrum',
    description:
      'Black Pepper is a common spice with digestive benefits. It also has antioxidant and anti-inflammatory properties.',
    image: '/images/blackpepper.jpg',
    medicinalUse: 'Digestive Aid',
    region: 'South India',
    type: 'Climber',
  },
  {
    id: 19,
    name: 'Cinnamon',
    scientificName: 'Cinnamomum verum',
    description:
      'Cinnamon is a popular spice with anti-inflammatory properties. It is also used to regulate blood sugar levels.',
    image: '/images/cinnamon.jpg',
    medicinalUse: 'Anti-inflammatory',
    region: 'East India',
    type: 'Tree',
  },
  {
    id: 20,
    name: 'Calendula',
    scientificName: 'Calendula officinalis',
    description:
      'Calendula is widely used for wound healing and skin repair. It has anti-inflammatory and antimicrobial properties.',
    image: '/images/calendula.jpg',
    medicinalUse: 'Wound Healing',
    region: 'Himalayan Region',
    type: 'Herb',
  },
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

      {/* Main Content */}
      <div className="plant-details">
        {/* 3D Model Space */}
          {/* 3D Model Viewer */}
          <ThreeDModel />


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