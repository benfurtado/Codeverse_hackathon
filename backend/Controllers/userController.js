const connection = require("../DB/connection");

exports.getUsers = (req, res) => {
  connection.query("SELECT * FROM users", (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
};

exports.createUser = (req, res) => {
  const { email, username, password } = req.body;

  // Basic validation to ensure all fields are provided
  if (!email || !username || !password) {
    return res.status(400).json({ error: "Email, username, and password are required" });
  }

  const query = "INSERT INTO users (email, username, password) VALUES (?, ?, ?)";
  connection.query(query, [email, username, password], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json({ message: "User created", id: results.insertId });
  });
};
