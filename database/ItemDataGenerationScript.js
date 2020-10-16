const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
let writer = csvWriter();

let documentNum = 1000000;
let id = 0;
let samePrice = true;

const generateFakeItemDataScript = () => {
  writer.pipe(fs.createWriteStream('./db/sampleDataScripts/itemData.csv'));
  for (let i = 0; i < documentNum; i++) {
    let title = faker.lorem.word();

    let description = faker.lorem.sentence();
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

    let colors = [];
    for (let j = 0; j < Math.floor(Math.random() * 6); j++) {
      colors.push(faker.commerce.color())
    }

    let sizes = [];
    let sizeOptions = ['Small', 'Medium', 'Large', 'XL']
    for (let j = 0; j < Math.floor(Math.random() * sizeOptions.length); j++) {
      sizes.push(sizeOptions[j]);
    }

    let liked = false;

    let inStock;
    if (Math.random() <= 0.2) {
      inStock = 0;
    } else {
      inStock = Math.floor(Math.random() * 15000);
    }

    writer.write({
      title: title,
      description: description,
      originalPrice: price.originalPrice,
      salePrice: price.salePrice,
      colors: colors,
      sizes: sizes,
      liked: liked,
      inStock: inStock,
      id: id
    });
    id++;
  }
  writer.end();
  console.log('Items pipe closed!');
}

generateFakeItemDataScript();