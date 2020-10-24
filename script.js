import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  let choice = Math.random();
  //get request:
  if (choice >= .05) {
    http.get(`http://localhost:3000/api/productOptions/products/${Math.floor(Math.random()*10000000)}`);
    sleep(1);
  }

  //post review request:
  else if (choice < .05) {
    let url = `http://localhost:3000/api/productOptions/products/reviews/${Math.floor(Math.random()*10000000)}`
    let id = Math.floor(Math.random()*10000000);
    let payload = JSON.stringify({
      id: id,
      overallRating: 3,
      easeOfAssembly: 2,
      valueForMoney: 4,
      productQuality: 3,
      appearance: 4,
      worksAsExpected: 3,
      createdAt: "2020-07-05T10:32:11.652Z",
      iRecommendThisProduct: false,
      header: "eum aut recusandae",
      body: "jashdjakhdn ajdhnlajndamd klndklanmdw dasdaw."
      });
    let params = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    http.post(url, payload, params);
  }
}