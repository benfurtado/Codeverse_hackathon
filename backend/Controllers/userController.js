const connection = require("../DB/connection");

exports.loginUser = (req, res) => {
  const { username, password } = req.body;


  // Use parameterized query to prevent SQL injection.
  connection.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      if (results.length === 0) {
        // No matching user found.
        return res.status(401).json({ error: 'Invalid credentials.' });
      }
      // Login successful, send back the user details.
      res.json({ user: results[0] });
    }
  );
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
