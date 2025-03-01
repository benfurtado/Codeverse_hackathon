const connection = require("../DB/connection"); // Using connection

// Get all plants
exports.getAllPlants = async (req, res) => {
  try {
    const [plants] = await connection.promise().query('SELECT * FROM plants');
    res.json(plants);
  } catch (error) {
    console.error('Error fetching plants:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new plant
exports.createPlant = async (req, res) => {
  const { name, type, description } = req.body;

  if (!name || !type || !description) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const [result] = await connection.promise().query(
      'INSERT INTO plants (name, type, description) VALUES (?, ?, ?)',
      [name, type, description]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      type,
      description
    });
  } catch (error) {
    console.error('Error creating plant:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
