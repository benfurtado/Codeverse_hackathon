import React, { useState } from "react";
import axios from "axios";
import "./LeafLensAI.css";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const LeafLensAI = () => {
    const [files, setFiles] = useState([]);
    const [organs, setOrgans] = useState([]);
    const [result, setResult] = useState(null);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFiles = [...e.target.files];
        if (selectedFiles.length > 0) {
            setFiles(selectedFiles);
            setOrgans(Array(selectedFiles.length).fill("leaf"));

            const urls = selectedFiles.map((file) => URL.createObjectURL(file));
            setPreviewUrls(urls);
        }
    };

    const handleSubmit = async () => {
        if (files.length === 0) {
            alert("Please upload at least one image.");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append("images", file);
            formData.append("organs", organs[index]);
        });

        try {
            const { data } = await axios.post("http://localhost:5001/identify", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setResult(data);
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while identifying the plant.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />

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
                        multiple
                        style={{ display: "none" }}
                    />
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
                        <table className="result-table">
                            <thead>
                                <tr>
                                    <th>Property</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(result).map(([key, value]) => (
                                    <tr key={key}>
                                        <td>{key}</td>
                                        <td>{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
};

export default LeafLensAI;