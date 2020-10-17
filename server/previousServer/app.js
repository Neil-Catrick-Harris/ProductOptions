const express = require('express');
const app = express();
const db = require('../../database/DataOnPreviousApp/MongoDBDatabase')
const path = require('path');


app.use(express.json())
app.use('/products', express.static('./client/dist'))
app.use('/', express.static('./client/dist'))


app.get('/api/productOptions/products/:id', (req, res) => {
  // console.log(req.params);
  let id = req.params.id;
  // console.log('this is id', id)
  db.Item.findOne({ id })
    .then((results) => {
      // console.log(results);
      res.json(results);
    })
    .catch((err) => {
      console.log(err);
      res.send(400);
    })
})

app.patch('/api/productOptions/products/:id', (req, res) => {
  let id = req.params.id;

  db.Item.findOne({ id: id })
    .then((item) => {
      // console.log(item.liked)
      item.liked = !item.liked;
      item.save();
      res.json(item);
    })
    .catch((err) => {
      console.log(err);
      res.send(400);
    })
})

app.put('/api/productOptions/products/:id', (req,res) => {
  let id = req.params.id;
  let newItem = req.body;
  console.log('------------------------------- newItem:', newItem);

  db.Item.countDocuments({ id: id })
    .then((result) => {
      if (result === 0) {
        db.Item.insertMany(newItem)
          .then((isDone) => {
            console.log(`Item with id ${id} was not found. It has been created.`);
            res.send(isDone);
          })
          .catch((err) => {
            console.log(err);
            res.send(400);
          })
      } else {
        db.Item.findOneAndReplace({ id: id }, newItem)
          .then((isDone) => {
            console.log(`Item with id ${id} was replaced`);
            res.send(201);
          })
          .catch((err) => {
            console.log(err);
            res.send(400);
          })
      }
    })
    .catch((err) => {
      console.log(err);
      res.send(400);
    })

})

app.post('/api/productOptions/products/:id/reviews', (req, res) => {
  const { overallRating, easeOfAssembly, valueForMoney, productQuality, appearance, worksAsExpected, header, body, createdAt, iRecommendThisProduct } = req.body;
  let id = req.params.id;
  db.Item.findOne({ id })
  .then((item) => {

    item.reviews.push({ overallRating, easeOfAssembly, valueForMoney, productQuality, appearance, worksAsExpected, header, body, createdAt, iRecommendThisProduct });
    item.save();
    res.json(item);
  })
})

app.delete('/api/productOptions/products/:id', (req, res) => {
  let id = req.params.id;
  db.Item.deleteOne({ id })
  .then((results) => {
    res.json(results);
  })
  .catch((err) => {
    res.send(400);
  })
})

app.delete('/api/data', (req, res) => {
  db.Item.deleteMany({})
  .then((results) => {
    res.json(results);
  })
  .catch((err) => {
    console.log(err);
    res.send(400);
  })
})

app.get('/products/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
})



module.exports = app;