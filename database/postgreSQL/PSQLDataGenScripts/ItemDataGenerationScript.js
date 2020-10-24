const faker = require('faker');
const fs = require('fs');
const _ = require('underscore');

let documentNum = 10**7;
let start = new Date();
let samePrice = true;

const writeItems = fs.createWriteStream('/Users/susannah/Desktop/Programming/Bootcampfiles/Projects/SDC/ProductOptions/database/postgreSQL/sampleDataScripts/itemData.csv');
writeItems.write(`id;title;colorIds;sizeIds;originalPrice;salePrice;description;liked;inStock\n`, 'utf8');

const generateFakeItemDataScript = (id, i, callback) => {


  let write = () => {
    let ok = true;
    do{
      i--;
      id++;

      let title = faker.lorem.word();
      let colorIds = [];
      let sizeIds = [];
      let description = faker.lorem.sentence();
      let originalPrice;
      let salePrice;
      let currentPrice = faker.commerce.price();

      for (let j = 0; j < 4; j++) {
        if (Math.random() > .2) {
          sizeIds.push(j);
        }
      }
      sizeIds = sizeIds.join();

      for (let j = 0; j < 6; j++) {
        if (Math.random() > .2) {
          colorIds.push(Math.floor(Math.random() * 32));
        }
      }
      colorIds = _.uniq(colorIds).join();

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
      let data = `${id};"${title}";"${colorIds}";"${sizeIds}";${originalPrice};${salePrice};"${description}";${false};${inStock}\n`;

      if (i === 0) {
        writeItems.write(data, 'utf-8', callback)
      } else {
        ok = writeItems.write(data, 'utf-8');
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