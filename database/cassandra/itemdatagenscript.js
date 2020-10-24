const faker = require('faker');
const fs = require('fs');
const _ = require('underscore');

let documentNum = 10**7;
let start = new Date();
let samePrice = true;

const writeItems = fs.createWriteStream('/Users/susannah/Desktop/Programming/Bootcampfiles/Projects/SDC/ProductOptions/database/cassandra/csvsfiles/cassItemData.csv');
writeItems.write(`id;title;colors;sizes;originalPrice;salePrice;description;liked;inStock\n`, 'utf8');

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
      for (let j = 0; j < Math.floor(Math.random() * 7); j++) {
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

      let item = `${id};${title};${colors.join()};${sizes.join()};${originalPrice};${salePrice};${description};${false};${inStock}\n`;

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