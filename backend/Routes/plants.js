const express = require('express');
const router = express.Router();
const plantsController = require('../Controllers/plants');

// Get all plants
router.get('/', plantsController.getAllPlants);

// Get a specific plant by ID
router.get('/:id', plantsController.getPlantById);

// Create a new plant
router.post('/', plantsController.createPlant);

module.exports = router;