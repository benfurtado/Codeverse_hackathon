const axios = require("axios");

// API Endpoints
const WIKIPEDIA_API = "https://en.wikipedia.org/api/rest_v1/page/summary/";
const GBIF_API = "https://api.gbif.org/v1/occurrence/search?country=IN&scientificName=";

async function getPlantData(plantName) {
    if (!plantName || typeof plantName !== "string") {
        throw new Error("Invalid plant name provided");
    }

    try {
        // Step 1️⃣: Fetch summary from Wikipedia
        const wikiResponse = await axios.get(`${WIKIPEDIA_API}${encodeURIComponent(plantName)}`);
        const wikiData = wikiResponse.data;

        // Step 2️⃣: Fetch location from GBIF API
        const gbifResponse = await axios.get(`${GBIF_API}${plantName}`);
        let coordinates = "Location data unavailable";
        if (gbifResponse.data.results.length > 0) {
            const firstResult = gbifResponse.data.results[0];
            coordinates = {
                latitude: firstResult.decimalLatitude || "Unknown",
                longitude: firstResult.decimalLongitude || "Unknown",
            };
        }

        return {
            name: wikiData.title || plantName,
            summary: wikiData.extract || "No summary available",
            wiki_url: wikiData.content_urls?.desktop?.page || "No URL available",
            location: coordinates,
        };

    } catch (error) {
        console.error("Error fetching plant data:", error.message);
        return { error: `API Error: ${error.message}` };
    }
}

module.exports = { getPlantData };