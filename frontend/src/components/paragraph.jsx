import { useState } from "react";

function Paragraphs() {
    const [language, setLanguage] = useState("en");
    const [text, setText] = useState("Hi, how are you, Ben?");
    const [translatedText, setTranslatedText] = useState("");

    const handleTranslate = async () => {
        if (language === "en") {
            try {
                const response = await fetch(
                    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=${encodeURIComponent(text)}`
                );
                const result = await response.json();
                setTranslatedText(result[0][0][0]); // Extract translated text
                setLanguage("hi");
            } catch (error) {
                console.error("Translation Error:", error);
                setTranslatedText("Translation failed.");
            }
        } else {
            setLanguage("en");
            setTranslatedText("");
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h2>Dynamic Paragraph Translator</h2>

            <textarea
                rows="4"
                cols="50"
                value={language === "en" ? text : translatedText}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text here..."
                style={{ width: "100%", padding: "10px", borderRadius: "5px", marginBottom: "10px" }}
                disabled={language === "hi"} // Prevent user from editing translated text
            />
            
            <br />
            <button 
                onClick={handleTranslate} 
                style={{
                    padding: "8px 15px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginTop: "10px"
                }}>
                Convert to {language === "en" ? "Hindi" : "English"}
            </button>
        </div>
    );
}

export default Paragraphs;
