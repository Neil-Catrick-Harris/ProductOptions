
const faker = require('faker');
const fs = require('fs');

let documentNum = 4;
let start = new Date();

const writeSizes = fs.createWriteStream('/Users/susannah/Desktop/Programming/Bootcampfiles/Projects/SDC/ProductOptions/database/postgreSQL/sampleDataScripts/sizeIdData.csv');
writeSizes.write(`id,sizes\n`, 'utf8');

const generateFakeSizesDataScript = (id, i, callback) => {

  let write = () => {
    let ok = true;
    let sizeOptions = ['Small', 'Medium', 'Large', 'XL'];
    i = sizeOptions.length;
    do{
      i--;
      id++;

      let data = `${id},"${sizeOptions[i]}"\n`;

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