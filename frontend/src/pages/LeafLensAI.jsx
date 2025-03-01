import React, { useState } from "react";
import axios from "axios";
import "./LeafLensAI.css";

const LeafLensAI = () => {
    const [files, setFiles] = useState([]); // State for uploaded files
    const [organs, setOrgans] = useState([]); // State for organ types
    const [result, setResult] = useState(null); // State for identification result
    const [previewUrls, setPreviewUrls] = useState([]); // State for image preview URLs
    const [loading, setLoading] = useState(false); // State for loading status

    // Handle file input change
    const handleFileChange = (e) => {
        const selectedFiles = [...e.target.files]; // Get selected files
        if (selectedFiles.length > 0) {
            setFiles(selectedFiles); // Update files state
            setOrgans(Array(selectedFiles.length).fill("leaf")); // Default organ type to "leaf"

            // Generate preview URLs for the selected files
            const urls = selectedFiles.map((file) => URL.createObjectURL(file));
            setPreviewUrls(urls); // Update preview URLs state
        }
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (files.length === 0) {
            alert("Please upload at least one image.");
            return;
        }

        setLoading(true); // Set loading state to true

        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append("images", file); // Append file objects
            formData.append("organs", organs[index]); // Append organ type
        });

        try {
            // Send the form data to the backend
            const { data } = await axios.post("http://localhost:5001/identify", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setResult(data); // Set the result from the API
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while identifying the plant.");
        } finally {
            setLoading(false); // Set loading state to false
        }
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
                    onChange={handleFileChange}
                    multiple // Allow multiple files
                    style={{ display: "none" }}
                />
                {/* Display image previews */}
                <div style={{ display: "flex", flexWrap: "wrap", margin: "10px 0" }}>
                    {previewUrls.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`Preview ${index}`}
                            style={{ width: "150px", height: "150px", margin: "5px", objectFit: "cover" }}
                        />
                    ))}
                </div>
            </div>

            {/* Submit Button */}
            <button className="submit-btn" onClick={handleSubmit} disabled={!files.length || loading}>
                {loading ? "Identifying..." : "Identify Plant"}
            </button>

            {/* Result Section */}
            {result && (
                <div className="result-section">
                    <h2>Identification Result</h2>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                    {/* Display additional result details if needed */}
                    {result.name && (
                        <>
                            <h3>{result.name}</h3>
                            <p>
                                <strong>Scientific Name:</strong> {result.scientificName}
                            </p>
                            <p>{result.description}</p>
                        </>
                    )}
                    
                </div>
            )}
        </div>
    );
};

export default LeafLensAI;