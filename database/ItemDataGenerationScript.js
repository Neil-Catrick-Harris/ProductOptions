const faker = require('faker');
const fs = require('fs');

let documentNum = 10**7;
let start = new Date();
let samePrice = true;

const writeItems = fs.createWriteStream('database/sampleDataScripts/itemData.csv');
writeItems.write(`id,title,originalPrice,salePrice,description,liked,inStock\n`, 'utf8');

const generateFakeItemDataScript = (id, i, callback) => {


  let write = () => {
    let ok = true;
    do{
      i--;
      id++;

      let title = faker.lorem.word();

      let description = faker.lorem.sentence();
      let originalPrice;
      let salePrice;
      let currentPrice = faker.commerce.price();
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
      let data = `${id},${title},${originalPrice},${salePrice},${description},${false},${inStock}\n`;

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