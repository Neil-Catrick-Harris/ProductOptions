const faker = require('faker');
const fs = require('fs');
const _ = require('underscore');

let documentNum = 49;
let start = new Date();

const writeColors = fs.createWriteStream('/Users/susannah/Desktop/Programming/Bootcampfiles/Projects/SDC/ProductOptions/database/postgreSQL/sampleDataScripts/colorIdData.csv');
writeColors.write(`id,colors\n`, 'utf8');

const generateFakeColorDataScript = (id, i, callback) => {

  let colorArray = [];

  for (let j = 0; j < 3000; j++) {
    colorArray.push(faker.commerce.color());
  }
  colorArray = _.uniq(colorArray);

  i = colorArray.length;

  let write = () => {
    let ok = true;
    do{
      i--;
      id++;

      let data = `${id},"${colorArray[i]}"\n`;

      if (i === 0) {
        writeColors.write(data, 'utf-8', callback)
      } else {
        ok = writeColors.write(data, 'utf-8');
      }
    } while (i > 0 && ok) {
      if (i > 0) {
        writeColors.once('drain', write);
      }
    }
  }
  write();
}


generateFakeColorDataScript(0, documentNum, () => {
  writeColors.end();
  console.log(`Color pipe closed! This seed script took ${new Date() - start} milliseconds to make ${documentNum} documents.`);
});