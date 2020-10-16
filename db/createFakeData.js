const faker = require('faker');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mykea', { useNewUrlParser: true, useUnifiedTopology: true })

const reviewSchema = mongoose.Schema({
  overallRating: { type: Number, min: 1, max: 5},
  easeOfAssembly: { type: Number, min: 1, max: 5},
  valueForMoney: { type: Number, min: 1, max: 5},
  productQuality: { type: Number, min: 1, max: 5},
  appearance: { type: Number, min: 1, max: 5},
  worksAsExpected: { type: Number, min: 1, max: 5},
  header: String,
  body: String,
  createdAt: Date,
  iRecommendThisProduct: Boolean
 })

 const itemSchema = mongoose.Schema({
  title: String,
  description: String,
  price: {
    originalPrice: Number,
    salePrice: Number
  },
  colors: [String],
  sizes: [String],
  liked: Boolean,
  inStock: Number,
  reviews: [reviewSchema],
  id: String
 })

 let Item = mongoose.model('Item', itemSchema);

const createFakeData = () => {
  let documentNum = 10;

  let dataArray = [];
  let id = 0;
  let samePrice = true;

  for (let i = 0; i < documentNum; i++) {
    let reviews = [];

    for (let j = 0; j < Math.floor(Math.random() * 26); j++) {
      let easeOfAssembly = Math.floor(Math.random() * 5 + 1);
      let valueForMoney = Math.floor(Math.random() * 5 + 1);
      let productQuality = Math.floor(Math.random() * 5 + 1);
      let appearance = Math.floor(Math.random() * 5 + 1);
      let worksAsExpected = Math.floor(Math.random() * 5 + 1);
      let overallRating = Math.floor((easeOfAssembly + valueForMoney + productQuality + appearance + worksAsExpected) / 5);
      let createdAt = faker.date.past();
      let iRecommendThisProduct = faker.random.boolean();
      let header = faker.lorem.words();
      let body = faker.lorem.paragraphs()

      reviews.push({ overallRating, easeOfAssembly, valueForMoney, productQuality, appearance, worksAsExpected, createdAt, iRecommendThisProduct, header, body})
    }

    let title = faker.lorem.word();

    let description = faker.lorem.sentence();

    // Random prices w/ sales

    let price;
    let currentPrice = faker.commerce.price();

    if (samePrice) {

       price = {
        originalPrice: currentPrice,
        salePrice: currentPrice
      }

    } else {
        let newPrice = faker.commerce.price();
        let higherPrice;
        let lowerPrice;

        if (newPrice > currentPrice) {
          higherPrice = newPrice;
          lowerPrice = currentPrice;
        } else {
          higherPrice = currentPrice;
          lowerPrice = newPrice;
        }
        price = {
          originalPrice: higherPrice,
          salePrice: lowerPrice
        }
      }

    samePrice = !samePrice

    // Random colors
    let colors = [];
    for (let j = 0; j < Math.floor(Math.random() * 6); j++) {
      colors.push(faker.commerce.color())
    }

    // Random Sizes
    let sizes = [];
    let sizeOptions = ['Small', 'Medium', 'Large', 'XL']
    for (let j = 0; j < Math.floor(Math.random() * 4); j++) {
      sizes.push(sizeOptions[j]);
    }

    // All products start unliked
    let liked = false;

    let inStock;
    if (Math.random() <= 0.2) {
      inStock = 0;
    } else {
      inStock = Math.floor(Math.random() * 15000)
    }

    dataArray.push({ title, description, price, colors, sizes, liked, inStock, reviews, id });
    id++;
  }
  return dataArray;
}

let start = new Date();

Item.insertMany(createFakeData())
  .then(() => {
    Item.find({})
      .then((results) => {
        let end = new Date();
        console.log(`Database took ${end - start} milliseconds to seed ${documentNum} documents using MongoDB with mongoose.`)
        // console.log(results)
        // console.log(`${results.length} pieces of data in the database`)
        mongoose.connection.close()
      })
  })
  .catch((err) => {
    console.log(err);
    mongoose.connection.close()
  })

