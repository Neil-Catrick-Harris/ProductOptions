const express = require('express');
const app = express();
const port = 3000;
const cassandra = require('cassandra-driver');
const path = require('path');
const methods = require('./cassconnection.js');

app.use(express.json())
app.use('/products', express.static('./client/dist'))
app.use('/', express.static('./client/dist'))

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'mykeaitems'
});

app.get('/api/productOptions/products/:id', (req, res) => {
  console.time();
  let id = req.params.id;
  let query = `SELECT * FROM items WHERE id=${id}`;
  client.execute(query)
  .then((itemResults) => {
    query = `SELECT * FROM itemReviews WHERE id=${id}`;
    client.execute(query)
    .then((reviewResults) => {
      console.log(`Product information for item with the id=${id} retrieved in `);
      let itemObj = itemResults.rows[0];
      itemObj.reviews = reviewResults.rows;
      console.timeEnd();

      res.send(itemObj);
    })
    .catch((err) => {
      console.log('------------------------- ERROR IN RETRIEVING REVIEWS FOR ITEM ------------------------', err);
    })
  })
  .catch((err) => {
    console.log('------------------------- ERROR IN RETRIEVING ITEM ------------------------', err);
  })
})

app.patch('/api/productOptions/products/:id', (req, res) => {
  let id = req.params.id;
  res.send(result);
})

app.put('/api/productOptions/products/:id', (req,res) => {
  let id = req.params.id;
  let newItem = req.body;
  let result = methods.putData(id, newItem);
  res.send(result.rows[0]);
})

app.post('/api/productOptions/products/:id', (req, res) => {
  const { title, colors, sizes, originalPrice, salePrice, description, liked, inStock } = req.body;
  let id = req.params.id;
  let query = `INSERT INTO items (id, title, colors, sizes, originalPrice, salePrice, description, liked, inStock) VALUES (${id}, '${title}', ${colors}, ${sizes}, ${originalPrice}, ${salePrice}, '${description}', ${liked}, ${inStock})`;
  console.log(query);
  client.execute(query)
  .then((result) => {
    console.log('Inserted new item: ', result);
    res.send(result);
  })
  .catch((err) => {
    console.log('------------------------- ERROR ------------------------', err);
  })
})

app.delete('/api/productOptions/products/:id', (req, res) => {
  let id = req.params.id;
  let query = `DELETE id, title, colors, sizes, originalPrice, salePrice, description, liked, inStock FROM items WHERE id=${id}`;
  console.log(query);
  client.execute(query)
  .then((result) => {
    console.log('Deleted item item: ', result);
    res.send(result);
  })
  .catch((err) => {
    console.log('------------------------- ERROR ------------------------', err);
  })
})

//this is untested for obvious reasons, but it is from the legacy code
app.delete('/api/data', (req, res) => {
  let query = `DELETE * FROM items`;
  console.log(query);
  client.execute(query)
  .then((result) => {
    console.log('Deleted item item: ', result);
    res.send(result);
  })
  .catch((err) => {
    console.log('------------------------- ERROR ------------------------', err);
  })
})

app.get('/products/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
})

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})