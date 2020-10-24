const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mykea', { useNewUrlParser: true })

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
  price: {
    originalPrice: Number,
    salePrice: Number
  },
  colors: [String],
  sizes: [String],
  liked: Boolean,
  inStock: Number,
  reviews: [reviewSchema]
})

let Item = mongoose.model('Item', itemSchema);


module.exports.Item = Item;
module.exports.mongoose = mongoose;