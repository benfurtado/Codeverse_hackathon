import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TourCard from '../components/TourCard';
import './GuidedToursPage.css';

const GuidedToursPage = () => {
  const tours = [
    {
      id: 1,
      title: "Digestion Remedies",
      description: "Explore Ayurvedic recipes to improve digestion.",
      image: "/images/digestion.jpg", // Path to the image in the public folder
      recipes: [
        {
          name: "Ajwain Kaada",
          ingredients: ["Ajwain (Carom Seeds)", "Ginger", "Water", "Honey"],
          steps: [
            "Boil 2 cups of water in a pan.",
            "Add 1 teaspoon of ajwain and grated ginger.",
            "Simmer for 10 minutes.",
            "Strain and add honey for taste."
          ],
        },
        {
          name: "Mint Tea",
          ingredients: ["Fresh Mint Leaves", "Lemon", "Honey", "Water"],
          steps: [
            "Boil 2 cups of water.",
            "Add a handful of mint leaves and simmer for 5 minutes.",
            "Add lemon juice and honey before serving."
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Immunity Boosters",
      description: "Discover Ayurvedic recipes to strengthen your immune system.",
      image: "/images/immunity.jpg", // Path to the image in the public folder
      recipes: [
        {
          name: "Turmeric Milk",
          ingredients: ["Turmeric Powder", "Milk", "Black Pepper", "Honey"],
          steps: [
            "Heat 1 cup of milk in a pan.",
            "Add 1/2 teaspoon of turmeric powder and a pinch of black pepper.",
            "Simmer for 5 minutes.",
            "Add honey for sweetness and drink warm."
          ],
        },
        {
          name: "Ashwagandha Kadha",
          ingredients: ["Ashwagandha Powder", "Water", "Jaggery"],
          steps: [
            "Boil 2 cups of water.",
            "Add 1 teaspoon of ashwagandha powder.",
            "Simmer for 10 minutes.",
            "Add jaggery for taste and strain before drinking."
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Stress Relief",
      description: "Relieve stress naturally with calming Ayurvedic remedies.",
      image: "/images/stress-relief.jpg", // Path to the image in the public folder
      recipes: [
        {
          name: "Brahmi Tea",
          ingredients: ["Brahmi Leaves", "Water", "Honey"],
          steps: [
            "Boil 2 cups of water.",
            "Add fresh brahmi leaves and simmer for 5 minutes.",
            "Strain and add honey before drinking."
          ],
        },
        {
          name: "Lavender Infusion",
          ingredients: ["Dried Lavender Flowers", "Water", "Lemon Juice"],
          steps: [
            "Boil 2 cups of water.",
            "Add dried lavender flowers and simmer for 5 minutes.",
            "Strain and add a splash of lemon juice before serving."
          ],
        },
      ],
    },
    {
      id: 4,
      title: "Skin Health",
      description: "Nourish your skin with natural Ayurvedic solutions.",
      image: "/images/skin-health.jpg", // Path to the image in the public folder
      recipes: [
        {
          name: "Neem Face Pack",
          ingredients: ["Neem Powder", "Yogurt", "Honey"],
          steps: [
            "Mix 1 tablespoon of neem powder with yogurt and honey.",
            "Apply evenly on your face and leave it on for 15 minutes.",
            "Rinse with lukewarm water."
          ],
        },
        {
          name: "Aloe Vera Gel",
          ingredients: ["Fresh Aloe Vera Gel", "Lemon Juice"],
          steps: [
            "Extract fresh aloe vera gel from the plant.",
            "Mix with a few drops of lemon juice.",
            "Apply on your face and rinse after 20 minutes."
          ],
        },
      ],
    },
    {
      id: 5,
      title: "Hair Care Solutions",
      description: "Revitalize your hair with nourishing Ayurvedic treatments.",
      image: "/images/hair-care.jpg", // Path to the image in the public folder
      recipes: [
        {
          name: "Amla Hair Oil",
          ingredients: ["Amla Powder", "Coconut Oil", "Curry Leaves"],
          steps: [
            "Heat 1 cup of coconut oil in a pan.",
            "Add 2 tablespoons of amla powder and a handful of curry leaves.",
            "Simmer on low heat for 15 minutes, then cool and strain.",
            "Massage onto scalp and leave overnight before washing."
          ],
        },
        {
          name: "Hibiscus Hair Mask",
          ingredients: ["Hibiscus Flowers", "Yogurt", "Fenugreek Seeds"],
          steps: [
            "Soak fenugreek seeds overnight and grind into a paste.",
            "Blend hibiscus flowers with yogurt to form a smooth mixture.",
            "Combine both pastes and apply evenly on hair.",
            "Leave for 30 minutes and rinse thoroughly."
          ],
        },
      ],
    },
    {
      id: 6,
      title: "Energy Boosters",
      description: "Recharge your body with energizing Ayurvedic drinks.",
      image: "/images/energy-boosters.jpg", // Path to the image in the public folder
      recipes: [
        {
          name: "Shatavari Smoothie",
          ingredients: ["Shatavari Powder", "Almond Milk", "Banana", "Dates"],
          steps: [
            "Blend 1 cup of almond milk with 1 teaspoon of shatavari powder.",
            "Add a banana and 2-3 dates for sweetness.",
            "Blend until smooth and serve chilled."
          ],
        },
        {
          name: "Chyawanprash Shake",
          ingredients: ["Chyawanprash", "Milk", "Cardamom Powder"],
          steps: [
            "Mix 1 tablespoon of chyawanprash into 1 cup of warm milk.",
            "Add a pinch of cardamom powder for flavor.",
            "Stir well and drink daily for vitality."
          ],
        },
      ],
    },
    {
      id: 7,
      title: "Sleep Enhancers",
      description: "Improve sleep quality with calming Ayurvedic practices.",
      image: "/images/sleep-enhancers.jpg", // Path to the image in the public folder
      recipes: [
        {
          name: "Warm Golden Milk",
          ingredients: ["Turmeric Powder", "Milk", "Cinnamon", "Nutmeg"],
          steps: [
            "Heat 1 cup of milk in a pan.",
            "Add 1/2 teaspoon of turmeric powder, a dash of cinnamon, and a pinch of nutmeg.",
            "Simmer for 5 minutes and drink warm before bedtime."
          ],
        },
        {
          name: "Jatamansi Tea",
          ingredients: ["Jatamansi Powder", "Water", "Honey"],
          steps: [
            "Boil 2 cups of water in a pan.",
            "Add 1 teaspoon of jatamansi powder and simmer for 5 minutes.",
            "Strain and add honey for taste. Drink 30 minutes before sleeping."
          ],
        },
      ],
    },
    {
      id: 8,
      title: "Joint & Muscle Relief",
      description: "Soothe joint pain and muscle stiffness with Ayurvedic remedies.",
      image: "/images/joint-relief.jpg", // Path to the image in the public folder
      recipes: [
        {
          name: "Ginger Turmeric Paste",
          ingredients: ["Fresh Ginger", "Turmeric Powder", "Coconut Oil"],
          steps: [
            "Grate fresh ginger and mix with 1 teaspoon of turmeric powder.",
            "Add a few drops of coconut oil to form a paste.",
            "Apply to affected areas and massage gently. Leave for 20 minutes before rinsing."
          ],
        },
        {
          name: "Castor Oil Pack",
          ingredients: ["Castor Oil", "Warm Cloth", "Plastic Wrap"],
          steps: [
            "Soak a warm cloth in castor oil.",
            "Place the cloth over the affected area and cover with plastic wrap.",
            "Apply a heating pad or hot water bottle for 30 minutes.",
            "Wipe off excess oil after use."
          ],
        },
      ],
    },
  ];


  const [selectedTour, setSelectedTour] = useState(null);
  const [synth] = useState(window.speechSynthesis);
  const [isPlaying, setIsPlaying] = useState(false);

  const speakRecipe = (recipe) => {
    if (synth.speaking) synth.cancel();

    const textInHindi = `${recipe.name} की सामग्री: ${recipe.ingredients.join(', ')}. विधि: ${recipe.steps.join('. ')}`;
    const textInEnglish = `${recipe.name}. Ingredients: ${recipe.ingredients.join(', ')}. Steps: ${recipe.steps.join('. ')}`;

    const hindiUtterance = new SpeechSynthesisUtterance(textInHindi);
    hindiUtterance.lang = 'hi-IN';

    const englishUtterance = new SpeechSynthesisUtterance(textInEnglish);
    englishUtterance.lang = 'en-US';

    hindiUtterance.onend = () => setIsPlaying(false);
    englishUtterance.onend = () => setIsPlaying(false);

    synth.speak(hindiUtterance);
    synth.speak(englishUtterance);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (synth.speaking) {
      synth.pause();
      setIsPlaying(false);
    } else {
      synth.resume();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <Header />
      <main className="guided-tours-page">
        <h1>Guided Tours</h1>

        {!selectedTour ? (
          <div className="tours-grid">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} onSelect={() => setSelectedTour(tour)} />
            ))}
          </div>
        ) : (
          <div className="recipe-details">
            <button onClick={() => setSelectedTour(null)}>⬅️ Back to Tours</button>
            <h2>{selectedTour.title}</h2>
            <p>{selectedTour.description}</p>

            {selectedTour.recipes.map((recipe, index) => (
              <div className="recipe-card" key={index}>
                <h3>{recipe.name}</h3>
                <p><em>Ingredients: {recipe.ingredients.join(', ')}</em></p>
                <ul>
                  {recipe.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ul>

                <button onClick={() => speakRecipe(recipe)}>🗣️ Listen to Recipe</button>

                {isPlaying && synth.speaking ? (
                  <button onClick={togglePlayPause} title="Pause">⏸️</button>
                ) : (
                  <button onClick={togglePlayPause} title="Play">▶️</button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default GuidedToursPage;
