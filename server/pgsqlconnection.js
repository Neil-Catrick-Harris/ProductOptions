const { Client } = require('pg');
const config = require('./psgsqlinfo.env');

const client = new Client(config.config);

client.connect();

exports.getData = (id) => {
  return client.query(`SELECT * FROM items WHERE item_id=${id}`)
  .then((itemResults) => {
    return client.query(`SELECT * FROM colors WHERE color_id in (${itemResults.rows[0].color_ids.split()})`)
    .then((colorResults) => {
      if (itemResults.rows[0].size_ids) {
        return client.query(`SELECT * FROM sizes WHERE size_id in (${itemResults.rows[0].size_ids.split()})`)
        .then((sizeResults) => {
          return client.query(`SELECT * FROM reviews WHERE item_id=${id}`)
          .then((reviewResults) => {
             let reviews = reviewResults.rows.map((review) => {
               return parseDataForFrontEndReview(review);
             })
             let colors = colorResults.rows.map((colorObj) => {
              return colorObj.color;
            })
            let sizes = sizeResults.rows.map((sizeObj) => {
              return sizeObj.size;
            })
            return parseDataForFrontEndItems(itemResults.rows[0], colors, sizes, reviews);
          })
          .catch((err) => {
          console.log(err);
        })
        })
        .catch((err) => {
          console.log(err);
        })
      } else {
        return client.query(`SELECT * FROM reviews WHERE item_id=${id}`)
          .then((reviewResults) => {
            let reviews = reviewResults.rows.map((review) => {
              return parseDataForFrontEndReview(review);
            })
            let colors = colorResults.rows.map((colorObj) => {
             return colorObj.color;
           })
           return parseDataForFrontEndItems(itemResults.rows[0], colors, sizes, reviews);
          })
          .catch((err) => {
          console.log(err);
          })
      }
    })
    .catch((err) => {
      console.log(err);
    })
  })
  .catch((err) => {
    console.log(err);
  })
};

exports.postDataReview = (id, easeOfAssembly, valueForMoney,productQuality, appearance, worksAsExpected, overallRating, createdAt, iRecommendThisProduct, header, body) => {

 return client.query(`INSERT INTO reviews (item_id, ease_of_assembly, value_for_money, product_quality, appearance, works_as_expected, overall_rating, created_at, i_recommend_this_product, header, body) VALUES (${id}, ${easeOfAssembly}, ${valueForMoney}, ${productQuality}, ${appearance}, ${worksAsExpected}, ${overallRating}, '${createdAt}', ${iRecommendThisProduct}, '${header}', '${body}')`)
  .then((result) => {
    return result;
  })
  .catch((err) => {
    console.log('------------------------- ERROR ------------------------', err);
  })
};

exports.postDataItem = (item_id, title, color_ids, size_ids, original_price, sale_price, _description, liked, in_stock) => {
  return client.query(`INSERT INTO items (item_id, title, color_ids, size_ids, original_price, sale_price, _description, liked, in_stock) VALUES (${item_id}, '${title}', '${color_ids}',  '${size_ids}', ${original_price}, '${sale_price}', '${_description}', ${liked}, ${in_stock})`)
  .then((result) => {
    return result;
  })
  .catch((err) => {
    console.log('------------------------- ERROR ------------------------', err);
  })
};



exports.putData = (id, title, colors, sizes, originalprice, saleprice, description, liked, inStock) => {
  return client.query(`UPDATE items
  SET title='${title}',
  color_ids='${colors}',
  size_ids='${sizes}',
  original_price=${originalprice},
  sale_price=${saleprice},
  _description='${description}',
  liked=${liked},
  in_stock=${inStock}
  WHERE item_id=${id};`)
  .then((result) => {
    return result;
  })
  .catch((err) => {
    console.log('------------------------- ERROR ------------------------', err);
    res.sendStatus(400);
  })
};


exports.deleteData = (id) => {
  return client.query(`DELETE FROM items WHERE item_id=${id}`)
  .then((result) => {
    return client.query(`DELETE FROM reviews WHERE item_id=${id}`)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log('------------------------- ERROR ------------------------', err);
      res.sendStatus(400);
    })
  })
  .catch((err) => {
    console.log('------------------------- ERROR ------------------------', err);
      res.sendStatus(400);
  })
};

const parseDataForFrontEndItems = (resultItems, colors, sizes, reviews) => {
  const {id, title, original_price, sale_price, description, liked, instock} = resultItems;
  if (reviews) {
    return {
      "price": {
          "originalPrice": Number.parseInt(original_price),
          "salePrice": Number.parseInt(sale_price)
      },
      "colors": colors,
      "sizes": sizes,
      "title": title,
      "description": description,
      "liked": liked,
      "inStock": instock,
      "reviews": reviews,
      "id": id,
    }
  } else {
    return {
      "price": {
        "originalPrice": Number.parseInt(original_price),
        "salePrice": Number.parseInt(sale_price)
      },
      "colors": colors,
      "sizes": sizes,
      "title": title,
      "description": description,
      "liked": liked,
      "inStock": instock,
      "reviews": [],
      "id": id,
    }
  }
};

const parseDataForFrontEndReview = (resultReviews) => {
  const { id, ease_of_assembly, value_for_money, product_quality, appearance, works_as_expected, overall_rating,created_at, i_recommend_this_product, header, body} = resultReviews;
  return {
    "_id": id,
    "overallRating": overall_rating,
    "easeOfAssembly": ease_of_assembly,
    "valueForMoney": value_for_money,
    "productQuality": product_quality,
    "appearance": appearance,
    "worksAsExpected": works_as_expected,
    "createdAt": created_at,
    "iRecommendThisProduct": i_recommend_this_product,
    "header": header,
    "body": body
  };
};
