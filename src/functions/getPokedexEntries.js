// Node modules
const mysqlx = require('@mysql/xdevapi');

// Custom modules
const config = require('./../../enc/config').config;

module.exports = function(name = '') {
  var entries = [];

  return mysqlx.getSession(config)
  .then(session => {
    return session.getSchema(config.schema).getTable('pokemon')
    .select(['id', 'name', 'category', 'primary_type', 'secondary_type'])
    .where(`name LIKE '${name}%'`)
    .orderBy('id asc')
    .execute(row => { // Append the data to the list
      var entry = {
        id: row[0],
        name: row[1],
        category: row[2],
        primary_type: row[3],
        secondary_type: row[4]
      }

      entries.push(entry);
    })
    .then(() => {
      return session.close();
    })
    .catch(err => {
      return session.close()
      .then(() => { throw err; })
      .catch(err => { throw err; });
    });
  })
  .then(() => { // Return the results when done
    return entries;
  })
  .catch(err => {
    console.error(err);

    return null;
  });
}
