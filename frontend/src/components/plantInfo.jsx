import React, { useState } from "react";
import axios from "axios";

function PlantInfo() {
    const [plantName, setPlantName] = useState("");
    const [plantData, setPlantData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchPlantData = async () => {
        if (!plantName.trim()) return alert("Enter a plant name!");
        setLoading(true);
        setError("");
        setPlantData(null);

        try {
            const response = await axios.get(`http://localhost:5000/plant/${plantName}`);
            setPlantData(response.data);
        } catch (err) {
            setError(err.response?.data?.error || "Error fetching plant data");
        }
        setLoading(false);
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Search for a Plant</h2>
            <input
                type="text"
                value={plantName}
                onChange={(e) => setPlantName(e.target.value)}
                placeholder="Enter plant name..."
            />
            <button onClick={fetchPlantData} disabled={loading}>
                {loading ? "Searching..." : "Search"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {plantData && (
                <div>
                    <h3>{plantData.name}</h3>
                    <p><strong>Summary:</strong> {plantData.summary}</p>
                    <p><a href={plantData.wiki_url} target="_blank" rel="noopener noreferrer">Read more on Wikipedia</a></p>
                    <p><strong>Location:</strong> {JSON.stringify(plantData.location)}</p>
                </div>
            )}
        </div>
    );
}

export default PlantInfo;
