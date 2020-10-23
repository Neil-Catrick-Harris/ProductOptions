const express = require('express');
const app = express();
const port = 3000;
const cassandra = require('cassandra-driver');
const path = require('path');
const {performance} = require('perf_hooks');
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
  let start = performance.now();
  let id = req.params.id;
  let query = `SELECT * FROM mykeaitems.items WHERE id=${id}`;
  client.execute(query)
  .then((itemResults) => {
    query = `SELECT * FROM mykeaitems.itemReviews WHERE id=${id}`;
    client.execute(query)
    .then((reviewResults) => {
      let itemObj = itemResults.rows[0];
      itemObj.reviews = reviewResults.rows;
      let end = performance.now();
      console.log(`Product information retrieved from database in ${end - start} milliseconds`);
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

app.post('/api/productOptions/products/:id/reviews', (req, res) => {
  let start = performance.now();
  let id = req.params.id;
  const { ease_of_assembly, value_for_money, product_quality, appearance, works_as_expected, overall_rating, created_at, i_recommend_this_product, header, body } = req.body;
  let query = `INSERT INTO mykeaitems.itemReviews (id, ease_of_assembly, value_for_money, product_quality, appearance, works_as_expected, overall_rating, created_at, i_recommend_this_product, header, body) VALUES (${id}, ${ease_of_assembly}, ${value_for_money}, ${product_quality}, ${appearance}, ${works_as_expected}, ${overall_rating}, '${created_at}', ${i_recommend_this_product}, '${header}', '${body}')`;
  console.log(query);
  client.execute(query)
  .then((result) => {
    let end = performance.now();
    console.log(`Review inserted into database  in ${end - start} milliseconds`);
    res.send(result);
  })
  .catch((err) => {
    console.log('------------------------- ERROR ------------------------', err);
  })
})

app.put('/api/productOptions/products/:id', (req,res) => {
  let start = performance.now();
  const { title, colors, sizes, originalPrice, salePrice, description, liked, inStock } = req.body;
  let id = req.params.id;

  let query = `UPDATE mykeaitems.items
  SET title='${title}',
  colors='${colors}',
  sizes='${sizes}',
  originalPrice=${originalPrice},
  salePrice=${salePrice},
  description='${description}',
  liked=${liked},
  inStock=${inStock}
  WHERE id=${id};`

  client.execute(query)
  .then((result) => {
    let end = performance.now();
    console.log(`Item updated in database in ${end - start} milliseconds`);
    res.send(result);
  })
  .catch((err) => {
    console.log('------------------------- ERROR ------------------------', err);
  })
})

app.post('/api/productOptions/products/:id', (req, res) => {
  let start = performance.now();
  const { title, colors, sizes, originalPrice, salePrice, description, liked, inStock } = req.body;
  let id = req.params.id;
  let query = `INSERT INTO mykeaitems.items (id, title, colors, sizes, originalPrice, salePrice, description, liked, inStock) VALUES (${id}, '${title}', '${colors}', '${sizes}', ${originalPrice}, ${salePrice}, '${description}', ${liked}, ${inStock})`;
  console.log(query);
  client.execute(query)
  .then((result) => {
    let end = performance.now();
    console.log(`Item inserted into database  in ${end - start} milliseconds`);
    res.send(result);
  })
  .catch((err) => {
    console.log('------------------------- ERROR ------------------------', err);
  })
})

app.delete('/api/productOptions/products/:id', (req, res) => {
  let start = performance.now();
  let id = req.params.id;
  let query = `DELETE FROM mykeaitems.items WHERE id=${id}`;
  console.log(query);
  client.execute(query)
  .then((result) => {
    query = `DELETE FROM  mykeaitems.itemReviews WHERE id=${id}`;
    client.execute(query)
    .then((result) => {
      let end = performance.now();
      console.log(`Item and reviews deleted from database in ${end - start} milliseconds`);
      res.send(result);
    })
    .catch((err) => {
      console.log('------------------------- ERROR ------------------------', err);
    })
  })
  .catch((err) => {
    console.log('------------------------- ERROR ------------------------', err);
  })
})

//this is untested for obvious reasons, but it is from the legacy code
app.delete('/api/data', (req, res) => {
  res.send("No. We won't be doing that...");
  // let query = `DROP TABLE IF EXISTS mykeaitems.items;`;
  // console.log(query);
  // client.execute(query)
  // .then((result) => {
  //   console.log('Deleted item item: ', result);
  //   res.send(result);
  // })
  // .catch((err) => {
  //   console.log('------------------------- ERROR ------------------------', err);
  // })
})

app.get('/products/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
})

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})