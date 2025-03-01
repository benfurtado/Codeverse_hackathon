const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
require("dotenv").config();

const API_KEY = process.env.PLANTNET_API_KEY;
const PLANTNET_URL = "https://my-api.plantnet.org/v2/identify/all";

async function identifyPlant(files, organs) {
    if (!files || files.length === 0) {
        throw new Error("No files uploaded");
    }

    const formData = new FormData();

    // Handle single or multiple files
    files.forEach((file, index) => {
        formData.append("images", fs.createReadStream(file.path));
        if (organs) {
            const organList = Array.isArray(organs) ? organs : [organs];
            formData.append("organs", organList[index] || "leaf");
        }
    });

    const { data } = await axios.post(
        `${PLANTNET_URL}?include-related-images=true&no-reject=false&nb-results=10&lang=en&type=kt&api-key=${API_KEY}`,
        formData,
        { headers: { ...formData.getHeaders() } }
    );

    // Clean up uploaded files
    files.forEach((file) => fs.unlinkSync(file.path));

    // Extract only the relevant details of the best match
    return {
        scientificName: data.results[0].species.scientificName,
        commonNames: data.results[0].species.commonNames,
        genus: data.results[0].species.genus.scientificName,
        family: data.results[0].species.family.scientificName,
    };
}

module.exports = identifyPlant;