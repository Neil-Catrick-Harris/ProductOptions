
const faker = require('faker');
const fs = require('fs');

let documentNum = 10**7;
let start = new Date();

const writeSizes = fs.createWriteStream('/Users/susannah/Desktop/Programming/Bootcampfiles/Projects/SDC/ProductOptions/database/sampleDataScripts/sizeData.csv');
writeSizes.write(`id,sizes\n`, 'utf8');

const generateFakeSizesDataScript = (id, i, callback) => {


  let write = () => {
    let ok = true;
    do{
      i--;
      id++;
      let sizes = [];
      let sizeOptions = ['Small', 'Medium', 'Large', 'XL']
      for (let j = 0; j < Math.floor(Math.random() * 4); j++) {
        sizes.push(sizeOptions[j]);
      }
      let data = `${id},"${sizes.join()}"\n`;

      if (i === 0) {
        writeSizes.write(data, 'utf-8', callback)
      } else {
        ok = writeSizes.write(data, 'utf-8');
      }
    } while (i > 0 && ok) {
      if (i > 0) {
        writeSizes.once('drain', write);
      }
    }
  }
  write();
}


generateFakeSizesDataScript(0, documentNum, () => {
  writeSizes.end();
  console.log(`Sizes pipe closed! This seed script took ${new Date() - start} milliseconds to make ${documentNum} documents.`);
});