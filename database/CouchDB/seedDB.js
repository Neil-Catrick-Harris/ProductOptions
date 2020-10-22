const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const axios = require('axios');

const couchDBlogin = require('./couchdbacountinfo.js');

const instream = fs.createReadStream('/Users/susannah/Desktop/Programming/Bootcampfiles/Projects/SDC/ProductOptions/database/CouchDB/CDBSampleDataCSVs/jsonItem.json');
const outsream = new stream();
const rl = readline.createInterface(instream, outsream);

// const fileData = fs.readFile('/Users/susannah/Desktop/Programming/Bootcampfiles/Projects/SDC/ProductOptions/database/CouchDB/CDBSampleDataCSVs/jsonItem.json', (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     axios({
//       method: 'PUT',
//       Accept: "application/json",
//       url: `http://${couchDBlogin.user}:${couchDBlogin.password}@127.0.0.1:5984/mykeaitems/hello${id}`,
//       data: fileData
//     })
//     .then((result) => {
//       linesAdded++;
//     })
//     .catch((err) => {
//       console.error(err);
//     })
//   }
// })

let lineNum = 0;
let linesAdded = 0;
let id = -1;
let start = new Date();

rl.on('line', (line) => {
  lineNum++;
  id++;
  line = line.split('');
  line.pop();
  line = line.join('');
  // line = JSON.parse(line);
  if (lineNum !== 1) {
    axios({
      method: 'PUT',
      Accept: "application/json",
      url: `http://${couchDBlogin.user}:${couchDBlogin.password}@127.0.0.1:5984/mykeaitems/item${id}`,
      data: line
    })
    .then((result) => {
      linesAdded++;
    })
    .catch((err) => {
    })
  }
})

rl.on('error', (error) => {
  console.log(arguments);
  debugger;
  console.log(this);
})

rl.on('close', () => {
  console.log(`Inputted ${linesAdded} records in ${new Date() - start} milliseconds.`)
})