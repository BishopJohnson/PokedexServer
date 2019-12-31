// Node modules
const express = require('express');

// Custom modules
const pokedexController = require('./controllers/pokedexController');

const app = express();

pokedexController(app);

// Listen to Google App Engine port or port 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
