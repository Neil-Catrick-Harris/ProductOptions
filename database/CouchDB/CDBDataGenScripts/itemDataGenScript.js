const faker = require('faker');
const fs = require('fs');
const _ = require('underscore');

let documentNum = 10**5;
let start = new Date();
let samePrice = true;

const writeItems = fs.createWriteStream('/Users/susannah/Desktop/Programming/Bootcampfiles/Projects/SDC/ProductOptions/database/CouchDB/CDBSampleDataCSVs/jsonItem.json');
writeItems.write("[\n");
const generateFakeItemDataScript = (id, i, callback) => {


  let write = () => {
    let ok = true;
    do{
      i--;
      id++;

      let item = {};
      item.id = id;
      item.title = faker.lorem.word();
      item.description = faker.lorem.sentence();
      let originalPrice;
      let salePrice;
      let currentPrice = faker.commerce.price();
      let colors = [];
      let sizes = [];
      let sizeOptions = ['Small', 'Medium', 'Large', 'XL'];

      //reviews
      let reviewObj = {};
      let reviews = [];

      // taken from below for iteration count: Math.floor(Math.random() * 26)
      for (let j = 0; j < 2; j++) {
        reviewObj.easeOfAssembly = Math.floor(Math.random() * 5 + 1);
        reviewObj.valueForMoney = Math.floor(Math.random() * 5 + 1);
        reviewObj.productQuality = Math.floor(Math.random() * 5 + 1);
        reviewObj.appearance = Math.floor(Math.random() * 5 + 1);
        reviewObj.worksAsExpected = Math.floor(Math.random() * 5 + 1);
        reviewObj.overallRating = Math.floor((reviewObj.easeOfAssembly + reviewObj.valueForMoney + reviewObj.productQuality + reviewObj.appearance + reviewObj.worksAsExpected) / 5);
        reviewObj.createdAt = randomDate(new Date(2017, 0, 1), new Date());
        reviewObj.iRecommendThisProduct = Math.random() > .5 ? true : false;
        reviewObj.header = faker.lorem.words();
        reviewObj.body = faker.lorem.words();

        reviews.push(reviewObj);
      }

      item.reviews = reviews;

      for (let j = 0; j < Math.floor(Math.random() * 6); j++) {
        colors.push(faker.commerce.color())
      }
      colors = _.uniq(colors);
      item.colors = colors;

      for (let j = 0; j < Math.floor(Math.random() * 4); j++) {
        sizes.push(sizeOptions[j]);
      }
      item.sizes = sizes;


      if (samePrice) {
        originalPrice = currentPrice;
        salePrice = currentPrice;
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
        originalPrice = higherPrice;
        salePrice = lowerPrice;
      }

      item.price = {
        originalPrice: originalPrice,
        salePrice: salePrice
      }

      samePrice = !samePrice;

      let inStock;
      if (Math.random() <= 0.2) {
        inStock = 0;
      } else {
        inStock = Math.floor(Math.random() * 15000);
      }

      item.inStock = inStock;

      data = JSON.stringify(item);

      if (i === 0) {
        writeItems.write(data + "\n]", 'utf-8', callback)
      } else {
        ok = writeItems.write(data + ",\n", 'utf-8');
      }
    } while (i > 0 && ok) {
      if (i > 0) {
        writeItems.once('drain', write);
      }
    }
  }
  write();
}


generateFakeItemDataScript(0, documentNum, () => {
  writeItems.end();
  console.log(`Items pipe closed! This seed script took ${new Date() - start} milliseconds to make ${documentNum} documents.`);
});

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toDateString();
}