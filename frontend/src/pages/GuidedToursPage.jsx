import React, { useState } from 'react';
import Header from '../components/Header'; // Import Header component
import Footer from '../components/Footer'; // Import Footer component
import TourCard from '../components/TourCard'; // Import TourCard component
import RecipeDetails from '../components/RecipeDetails'; // Import RecipeDetails component
import './GuidedToursPage.css'; // Import CSS for styling

const GuidedToursPage = () => {
  // Static data for guided tours
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
  ];

  // State to track the selected tour
  const [selectedTour, setSelectedTour] = useState(null);

  return (
    <>
      {/* Header Component */}
      <Header />

      {/* Main Content */}
      <main className="guided-tours-page">
        <h1>Guided Tours</h1>

        {/* Display Tour Cards or Recipe Details */}
        {!selectedTour ? (
          <div className="tours-grid">
            {/* Render Tour Cards */}
            {tours.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour} // Pass the entire tour object
                onSelect={() => setSelectedTour(tour)} // Set selected tour
              />
            ))}
          </div>
        ) : (
          // Render Recipe Details for the Selected Tour
          <RecipeDetails
            tour={selectedTour} // Pass the selected tour
            onBack={() => setSelectedTour(null)} // Reset selected tour
          />
        )}
      </main>

      {/* Footer Component */}
      <Footer />
    </>
  );
};

export default GuidedToursPage;