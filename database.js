const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
});



db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
});
