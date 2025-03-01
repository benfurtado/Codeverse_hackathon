import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faShare } from '@fortawesome/free-solid-svg-icons';
import './RecipeDetails.css';

const RecipeDetails = ({ tour, onBack }) => {
  const [language, setLanguage] = React.useState("en");

  const audioFiles = {
    en: "/audio/en-recipe.mp3",
    hi: "/audio/hi-recipe.mp3",
  };

  return (
    <div className="recipe-details">
      <button className="back-btn" onClick={onBack}>Back to Tours</button>
      <h2>{tour.title}</h2>
      <p>{tour.description}</p>

      {/* Language Toggle */}
      <div className="language-toggle">
        <button onClick={() => setLanguage("en")} disabled={language === "en"}>
          English
        </button>
        <button onClick={() => setLanguage("hi")} disabled={language === "hi"}>
          Hindi
        </button>
      </div>

      {/* Recipes */}
      {tour.recipes.map((recipe, index) => (
        <div className="recipe-card" key={index}>
          <h3>{recipe.name}</h3>
          <h4>Ingredients:</h4>
          <ul>
            {recipe.ingredients.map((ingredient, idx) => (
              <li key={idx}>{ingredient}</li>
            ))}
          </ul>
          <h4>Steps:</h4>
          <ol>
            {recipe.steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>

          {/* Audio Button */}
          <audio controls>
            <source src={audioFiles[language]} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>

          {/* Action Buttons */}
          <div className="actions">
            <button className="bookmark-btn">
              <FontAwesomeIcon icon={faBookmark} /> Bookmark
            </button>
            <button className="share-btn">
              <FontAwesomeIcon icon={faShare} /> Share
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeDetails;