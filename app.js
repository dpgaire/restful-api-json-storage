// app.js
const express = require("express");
const snippetsRoutes = require("./routes/snippets");
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Mount the snippets routes
app.use("/api/snippets", snippetsRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
