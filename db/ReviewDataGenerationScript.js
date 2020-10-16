const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
let writer = csvWriter();

let documentNum = 10;
let id = 0;
let samePrice = true;
const generateFakeReviewDataScript = () => {

  writer.pipe(fs.createWriteStream('./db/sampleDataScripts/reviewsData.csv'));
  for (let i = 0; i < documentNum; i++) {
    for (let j = 0; j < Math.floor(Math.random() * 26); j++) {
      let easeOfAssembly = Math.floor(Math.random() * 5 + 1);
      let valueForMoney = Math.floor(Math.random() * 5 + 1);
      let productQuality = Math.floor(Math.random() * 5 + 1);
      let appearance = Math.floor(Math.random() * 5 + 1);
      let worksAsExpected = Math.floor(Math.random() * 5 + 1);
      let body = faker.lorem.paragraphs();
      body = body.split(/[\r\n]/);

      let length = body.length;
      let newBody = [];
      for (let i = 0; i < length; i++) {
        if (body[i] !== ' ') {
          newBody.push(body[i] + '\u03A3');
        }
      }
      newBody = newBody.join('');
      writer.write({
        id: id,
        easeOfAssembly: easeOfAssembly,
        valueForMoney: valueForMoney,
        productQuality: Math.floor(Math.random() * 5 + 1),
        appearance: productQuality,
        worksAsExpected: worksAsExpected,
        overallRating: Math.floor((easeOfAssembly + valueForMoney + productQuality + appearance + worksAsExpected) / 5),
        createdAt: faker.date.past(),
        iRecommendThisProduct: faker.random.boolean(),
        header: faker.lorem.words(),
        body: newBody
      })
    }
    id++;
  }
  writer.end();
  console.log('Reviews pipe closed');
}

generateFakeReviewDataScript();