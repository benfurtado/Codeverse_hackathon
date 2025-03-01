// src/pages/LeafLensAI.jsx
import React, { useState } from 'react';

const LeafLensAI = () => {
  const [image, setImage] = useState(null); // State to store the uploaded image
  const [result, setResult] = useState(null); // State to store the result (e.g., plant name, description)
  const [loading, setLoading] = useState(false); // State to track loading status

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Preview the uploaded image
      setResult(null); // Reset previous results
    }
  };

  // Simulate backend processing (replace this with actual API call)
  const handleSubmit = async () => {
    setLoading(true);

    // Simulate a delay for backend processing
    setTimeout(() => {
      setResult({
        name: 'Tulsi',
        scientificName: 'Ocimum tenuiflorum',
        description:
          'Tulsi, also known as Holy Basil, is widely used in Ayurveda for its medicinal properties. It helps boost immunity and reduces stress.',
      });
      setLoading(false);
    }, 3000); // Simulated delay of 3 seconds
  };

  return (
    <div className="leaf-lens-page">
      <h1>LeafLens AI</h1>
      <p>Upload an image of a leaf, and our AI will identify the plant and generate its 3D model.</p>

      {/* Image Upload Section */}
      <div className="upload-section">
        <label htmlFor="image-upload" className="upload-btn">
          Upload Image
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
        {image && (
          <div className="image-preview">
            <img src={image} alt="Uploaded Leaf" />
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button className="submit-btn" onClick={handleSubmit} disabled={!image || loading}>
        {loading ? 'Identifying...' : 'Identify Plant'}
      </button>

      {/* Result Section */}
      {result && (
        <div className="result-section">
          <h2>{result.name}</h2>
          <p>
            <strong>Scientific Name:</strong> {result.scientificName}
          </p>
          <p>{result.description}</p>
          <div className="model-preview">
            <h3>3D Model Preview</h3>
            <p>(3D model will be rendered here)</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeafLensAI;