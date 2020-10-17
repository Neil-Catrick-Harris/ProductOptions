# product-options

Welcome to Mykea!

## Data Schema

```
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
 ```

 The data is split into two models: reviews and items. The former documents are attributed as a subdocument for each item document. This means all reviews are children of their relevant items.

## CRUD Endpoints implemented by August Dolan

* Create (POST): `/api/productOptions/products/:id/reviews`
  * is an unimplemented endpoint to save new product reviews if implemented in the future

* Read: (GET): `/api/productOptions/products/:id`
  * will pull the relevant product based on an id of 1-100

* Update: (PATCH): `/api/productOptions/products/:id`
  * is an unimplemented endpoint to toggle whether a product is liked by a future, logged in user

* Delete ALL (DELETE): `/api/data`  (endpoint changed from original by Susannah Marcus)
  * deletes all current data from mongodb

* `/products/*`
  * is a catch all endpoint that ensured the HTML is sent on every product request.

## CRUD Endpoint(s) implemented by Susannah Marcus:

* Delete ONE (DELETE): `/api/productOptions/products/:id`
  * Deletes the specific item with the id sent

* Update: (PUT): `/api/productOptions/products/:id`
  * Updates the specfic item which matches the id. If no item exists with that id, it creates one.


## Setup
1. run `npm install` for dependences
2. initial build relied on `npm run postinstall` for seeding database
3. Current data generation scripts are:
    * `npm run genDataItems`
    * `npm run genDataReviews`
4. Start server with following:
  * nodemon: `npm run nodemon`
  * node: `npm start`
5. Run webpack with `npm run build`
6. Delete all endpoint is available via root with a delete request - no parameters needed. To reseed simply run `npm run postinstall`

Bundled JS code served up via `'/client/dist/main.js`.


 ## Server Middleware
`app.use(express.json());` enables json parsing to req.body
`app.use('/products', express.static('./client/dist'));` opens up index.html and bundle for /product, ensuring the bundle is readable on new item fetch
`app.use('/', express.static('./client/dist'));` opens up index.html and bundle for root
`app.use(compression());` compresses text based response data to speed up performance