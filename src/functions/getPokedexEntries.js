// Node modules
const mysql = require('mysql2');

const pool = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = async function(name = '') {
  var promisePool = pool.promise(); // A promise wrapped instance of the pool

  // Execute the query with a prepared statement
  var [rows, fields] = await promisePool.execute(
    `SELECT * FROM pokemon WHERE name LIKE ? ORDER BY id ASC`,
    [`${name}%`] // prepared for like statement
  );

  var entries = [];
  for (var i = 0; i < rows.length; i++) {
    entries.push(
      {
        id: rows[i].id,
        name: rows[i].name,
        category: rows[i].category,
        primary_type: rows[i].primary_type,
        secondary_type: rows[i].secondary_type
      }
    );
  }

  return entries;
}
