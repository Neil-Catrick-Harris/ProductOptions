const axios = require('axios');

const couchDBlogin = require('./couchdbacountinfo.js');

//delete db in case it exists then recreate it
axios({
  method: 'DELETE',
  url: `http://${couchDBlogin.user}:${couchDBlogin.password}@127.0.0.1:5984/mykeaitems`
})
.then((result) => {
  console.log('database deleted');
  axios({
    method: 'PUT',
    url: `http://${couchDBlogin.user}:${couchDBlogin.password}@127.0.0.1:5984/mykeaitems`
  })
  .then((result) => {
    console.log('database created');
  })
  .catch((err) => {
    console.error(err);
  })
})
.catch((err) => {
  console.error(err);
})
