const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'mykeaitems'
});

exports.getData = (id) => {
  return client.execute(`SELECT * FROM mykeaitems.items WHERE id=${id}`)
  .then((itemResults) => {
    return client.execute(`SELECT * FROM mykeaitems.itemReviews WHERE id=${id}`)
    .then((reviewResults) => {
      let reviews = reviewResults.rows.map( (review) => {
        return parseDataForFrontEndReview(review)
      })

      return parseDataForFrontEndItems(itemResults.rows[0], reviews);
    })
    .catch((err) => {
      console.log('------------------------- ERROR IN RETRIEVING REVIEWS FOR ITEM ------------------------', err);
    })
  })
  .catch((err) => {
    console.log('------------------------- ERROR IN RETRIEVING ITEM ------------------------', err);
  })
};

exports.postDataReview = (id, easeOfAssembly, valueForMoney,productQuality, appearance, worksAsExpected, overallRating,createdAt, iRecommendThisProduct, header, body) => {
 return client.execute(`INSERT INTO mykeaitems.itemReviews (id, ease_of_assembly, value_for_money,product_quality, appearance, works_as_expected, overall_rating,created_at, i_recommend_this_product, header, body) VALUES (${id}, ${easeOfAssembly}, ${valueForMoney}, ${productQuality}, ${appearance}, ${worksAsExpected}, ${overallRating}, '${createdAt}', ${iRecommendThisProduct}, '${header}', '${body}')`)
  .then((result) => {
    return result;
  })
  .catch((err) => {
    console.log('------------------------- ERROR ------------------------', err);
  })
};

exports.postDataItem = (id, title, colors, sizes, originalprice, saleprice, description, liked, inStock) => {
  return client.execute(`INSERT INTO mykeaitems.items (id, title, colors, sizes, originalprice, saleprice, description, liked, inStock) VALUES (${id}, '${title}', '${colors}', '${sizes}', ${originalprice}, ${saleprice}, '${description}', ${liked}, ${inStock})`)
  .then((result) => {
    return result;
  })
  .catch((err) => {
    console.log('------------------------- ERROR ------------------------', err);
  })
};



exports.putData = (id, title, colors, sizes, originalprice, saleprice, description, liked, inStock) => {
  return client.execute(`UPDATE mykeaitems.items
  SET title='${title}',
  colors='${colors}',
  sizes='${sizes}',
  originalprice=${originalprice},
  saleprice=${saleprice},
  description='${description}',
  liked=${liked},
  inStock=${inStock}
  WHERE id=${id};`)
  .then((result) => {
    return result;
  })
  .catch((err) => {
    console.log('------------------------- ERROR ------------------------', err);
    res.sendStatus(400);
  })
};


exports.deleteData = (id) => {
  return client.execute(`DELETE FROM mykeaitems.items WHERE id=${id}`)
  .then((result) => {
    return client.execute(`DELETE FROM  mykeaitems.itemReviews WHERE id=${id}`)
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

const parseDataForFrontEndItems = (resultItems, reviews) => {
  const {id, title, colors, sizes, originalprice, saleprice, description, liked, instock} = resultItems;
  if (reviews) {
    return {
      "price": {
          "originalPrice": Number.parseInt(originalprice),
          "salePrice": Number.parseInt(saleprice)
      },
      "colors": colors.split(','),
      "sizes": sizes.split(','),
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
        "originalPrice": Number.parseInt(originalprice),
        "salePrice": Number.parseInt(saleprice)
      },
      "colors": colors.split(','),
      "sizes": sizes.split(','),
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
