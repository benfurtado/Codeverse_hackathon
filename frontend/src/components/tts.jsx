import { useState } from "react";

function TTS() {
    const [text, setText] = useState("");
    const [audioSrc, setAudioSrc] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleConvert = async () => {
        if (!text.trim()) {
            setError("Enter some text!");
            return;
        }

        setLoading(true);
        setError("");
        try {
            const response = await fetch("http://localhost:5000/tts/synthesize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text }),
            });

            const data = await response.json();
            if (response.ok) {
                setAudioSrc(data.url);
            } else {
                setError(data.error || "Error generating audio");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Server error. Please try again.");
        }
        setLoading(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(audioSrc);
    };

    return (
        <div style={{ textAlign: "center", padding: "20px", maxWidth: "500px", margin: "auto" }}>
            <h2>Text to Speech</h2>
            <textarea
                rows="4"
                cols="50"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text here..."
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
            />
            <br />
            <button 
                onClick={handleConvert} 
                disabled={loading} 
                style={{
                    marginTop: "10px",
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px"
                }}>
                {loading ? "Converting..." : "Convert"}
            </button>

            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

            {audioSrc && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Generated Audio:</h3>
                    <audio controls autoPlay style={{ width: "100%" }}>
                        <source src={audioSrc} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    <br />
                    <input type="text" value={audioSrc} readOnly style={{ width: "80%", padding: "5px", marginTop: "10px" }} />
                    <button 
                        onClick={copyToClipboard} 
                        style={{
                            marginLeft: "10px",
                            padding: "5px 10px",
                            backgroundColor: "#28a745",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}>
                        Copy URL
                    </button>
                </div>
            )}
        </div>
    );
}

export default TTS;
