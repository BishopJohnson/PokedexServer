// Node modules
const express = require('express');

// Custom modules
const pokedexController = require('./controllers/pokedexController');

const app = express();
const port = 5000;

pokedexController(app);

app.listen(port, () => {
  console.log(`Server listening to port ${port}`);
});
