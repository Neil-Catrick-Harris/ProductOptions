const faker = require('faker');
const fs = require('fs');

let documentNum = 10**7;
let start = new Date();

const writeReviews = fs.createWriteStream('/Users/susannah/Desktop/Programming/Bootcampfiles/Projects/SDC/ProductOptions/database/sampleDataScripts/reviewData.csv');
writeReviews.write(`id,easeOfAssembly,valueForMoney,productQuality,appearance,worksAsExpected,overallRating,createdAt,iRecommendThisProduct,header,body\n`, 'utf8');

const generateFakeReviewDataScript = (id, i, callback) => {

  let write = () => {
    let ok = true;
    do{
      i--;
      id++;
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
      let data = [];
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

        data.push(`${id},${easeOfAssembly},${valueForMoney},${productQuality},${appearance},${worksAsExpected},${overallRating},${createdAt},${iRecommendThisProduct},${header},"${body}"\n`);

      }
      data = data.join('');
      if (i === 0) {
        writeReviews.write(data, 'utf-8', callback)
      } else {
        ok = writeReviews.write(data, 'utf-8');
      }
    } while (i > 0 && ok) {
      if (i > 0) {
        writeReviews.once('drain', write);
      }
    }

  }
  write();
}


generateFakeReviewDataScript(0, documentNum, () => {
  writeReviews.end();
  console.log(`Reviews pipe closed! This seed script took ${new Date() - start} milliseconds to make ${documentNum} documents.`);
});

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toDateString();
}