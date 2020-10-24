require('newrelic');
const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const cassandra = require('cassandra-driver');
const path = require('path');
const methods = require('./cassconnection.js');

app.use(express.json());
app.use(morgan('dev'));
app.use('/products', express.static('./client/dist'))
app.use('/', express.static('./client/dist'))

app.get('/api/productOptions/products/:id', (req, res) => {
  let id = req.params.id;
  methods.getData(id)
  .then((result) => {
    res.send(result);
  })
  .catch((err) => {
    console.log('------------------------- ERROR ------------------------', err);
    res.sendStatus(400);
  })
})

app.post('/api/productOptions/products/reviews/:id', (req, res) => {
  let id = req.params.id;
  const { easeOfAssembly, valueForMoney,productQuality, appearance, worksAsExpected, overallRating,createdAt, iRecommendThisProduct, header, body } = req.body;

  methods.postDataReview(id, easeOfAssembly, valueForMoney,productQuality, appearance, worksAsExpected, overallRating,createdAt, iRecommendThisProduct, header, body)
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    console.log('------------------------- ERROR ------------------------', err);
    res.sendStatus(400);
  })
})

app.post('/api/productOptions/products/:id', (req, res) => {
  const { title, colors, sizes, originalPrice, salePrice, description, liked, inStock } = req.body;
  let id = req.params.id;

  methods.postDataItem(id, title, colors, sizes, originalPrice, salePrice, description, liked, inStock)
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    console.log('------------------------- ERROR ------------------------', err);
    res.sendStatus(400);
  })
})

app.put('/api/productOptions/products/:id', (req,res) => {

  const { title, colors, sizes, originalPrice, salePrice, description, liked, inStock } = req.body;
  let id = req.params.id;
  methods.putData(id, title, colors, sizes, originalPrice, salePrice, description, liked, inStock)
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    console.log('------------------------- ERROR ------------------------', err);
    res.sendStatus(400);
  })
})

app.delete('/api/productOptions/products/:id', (req, res) => {
  let id = req.params.id;
  methods.deleteData(id)
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    console.log('------------------------- ERROR ------------------------', err);
    res.sendStatus(400);
  })
})

app.get('/products/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
})

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})