const fs = require('fs')
const compiled = require('../configs')

fs.writeFile(
  'now.json',
  JSON.stringify(compiled, null, 2),
  function (err) {
    if (err) {
        console.error('Crap happens');
    }
  }
);
