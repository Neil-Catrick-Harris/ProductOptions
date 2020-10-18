const faker = require('faker');
const fs = require('fs');

let documentNum = 10**7;
let start = new Date();

const writeColors = fs.createWriteStream('database/sampleDataScripts/colorData.csv');
writeColors.write(`id,colors\n`, 'utf8');

const generateFakeColorDataScript = (id, i, callback) => {

  let write = () => {
    let ok = true;
    do{
      i--;
      id++;
      let colors = [];
      for (let j = 0; j < Math.floor(Math.random() * 6); j++) {
        colors.push(faker.commerce.color())
      }
      let data = `${id},"${colors.join()}"\n`;

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