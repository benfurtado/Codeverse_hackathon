import React, { useState } from "react";
import axios from "axios";

function Identify() {
    const [files, setFiles] = useState([]);
    const [organs, setOrgans] = useState([]);
    const [result, setResult] = useState(null);
    const [previewUrls, setPreviewUrls] = useState([]); // State for image preview URLs

    const handleFileChange = (e) => {
        const selectedFiles = [...e.target.files];
        setFiles(selectedFiles);
        setOrgans(Array(selectedFiles.length).fill("leaf")); // Default to "leaf"

        // Generate preview URLs for the selected files
        const urls = selectedFiles.map((file) => URL.createObjectURL(file));
        setPreviewUrls(urls);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append("images", file); // File objects
            formData.append("organs", organs[index]); // Corresponding organ type
        });

        try {
            const { data } = await axios.post("http://localhost:5000/identify", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setResult(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <h1>Plant Identification</h1>
            <input type="file" multiple onChange={handleFileChange} />

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

            <button onClick={handleSubmit}>Identify</button>

            {/* Display identification result */}
            {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
        </div>
    );
}

export default Identify;