import React, { useState } from "react";
import axios from "axios";

function Identify() {
    const [files, setFiles] = useState([]);
    const [organs, setOrgans] = useState([]);
    const [result, setResult] = useState(null);

    const handleFileChange = (e) => {
        setFiles([...e.target.files]);
        setOrgans(Array(e.target.files.length).fill("leaf")); // Default to "leaf"
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
            <button onClick={handleSubmit}>Identify</button>
            {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
        </div>
    );
}

export default Identify;
