const faker = require('faker');
const fs = require('fs');
const _ = require('underscore');

let documentNum = 10**7;
let start = new Date();
let samePrice = true;

const writeItems = fs.createWriteStream('/Users/susannah/Desktop/Programming/Bootcampfiles/Projects/SDC/ProductOptions/database/cassandra/csvsfiles/cassItemData.csv');
writeItems.write(`id,title,colors,sizes,originalPrice,salePrice,description,liked,inStock,reviews\n`, 'utf8');

const generateFakeItemDataScript = (id, i, callback) => {


  let write = () => {
    let ok = true;
    do{
      i--;
      id++;

      let title = faker.lorem.word();
      let sizes = [];
      let description = faker.lorem.sentence();
      let originalPrice;
      let salePrice;
      let currentPrice = faker.commerce.price();

      let sizeOptions = ['Small', 'Medium', 'Large', 'XL']
      for (let j = 0; j < 4; j++) {
        if (Math.random() > .2) {
          sizes.push(sizeOptions[j]);
        }
      }

      let colors = [];
      for (let j = 0; j < Math.floor(Math.random() * 6); j++) {
        colors.push(faker.commerce.color())
      }
      colors = _.uniq(colors);

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

      samePrice = !samePrice;

      let inStock;
      if (Math.random() <= 0.2) {
        inStock = 0;
      } else {
        inStock = Math.floor(Math.random() * 15000);
      }

      let easeOfAssembly = 0;
      let valueForMoney = 0;
      let productQuality = 0;
      let appearance = 0;
      let worksAsExpected = 0;
      let overallRating = 0;
      let createdAt = 0;
      let iRecommendThisProduct = false;
      let header = '';
      let body = '';
      let reviews = [];
      // taken from below for iteration count: Math.floor(Math.random() * 26)
      for (let j = 0; j < 2; j++) {
        easeOfAssembly = Math.floor(Math.random() * 5 + 1);
        valueForMoney = Math.floor(Math.random() * 5 + 1);
        productQuality = Math.floor(Math.random() * 5 + 1);
        appearance = Math.floor(Math.random() * 5 + 1);
        worksAsExpected = Math.floor(Math.random() * 5 + 1);
        overallRating = Math.floor((easeOfAssembly + valueForMoney + productQuality + appearance + worksAsExpected) / 5);
        createdAt = randomDate(new Date(2017, 0, 1), new Date());
        iRecommendThisProduct = Math.random() > .5 ? true : false;
        header = faker.lorem.words();
        body = faker.lorem.words();

        reviews.push(`${easeOfAssembly}+${valueForMoney}+${productQuality}+${appearance}+${worksAsExpected}+${overallRating}+${createdAt}+${iRecommendThisProduct}+${header}+"${body}"`);
      }

      let item = `${id}|${title}|[${colors}]|[${sizes}]|${originalPrice}|${salePrice}|${description}|${false}|${inStock}|[${reviews}]\n`;

      if (i === 0) {
        writeItems.write(item, 'utf-8', callback)
      } else {
        ok = writeItems.write(item, 'utf-8');
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