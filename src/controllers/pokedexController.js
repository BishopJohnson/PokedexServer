// Node modules
const bodyParser = require('body-parser');

// Custom modules
const getPokedexEntries = require('./../functions/getPokedexEntries');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
  app.get('/api/pokedex', function(req, res) {
    var name = req.query.name;

    getPokedexEntries(name)
    .then(data => {
      res.json(data);
    });
  });
};
