USE mykeaitems;

COPY items (id, title, colors, sizes, originalPrice, salePrice, description, liked, inStock, reviews) FROM '/Users/susannah/Desktop/Programming/Bootcampfiles/Projects/SDC/ProductOptions/database/cassandra/csvsfiles/cassItemData.csv' with header=true and delimiter ='|';