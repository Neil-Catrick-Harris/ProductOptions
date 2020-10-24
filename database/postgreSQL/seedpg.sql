\copy colors (color_id, color) FROM '/Users/susannah/Desktop/Programming/Bootcampfiles/Projects/SDC/ProductOptions/database/postgreSQL/sampleDataScripts/colorIdData.csv' DELIMITER ',' CSV HEADER;

\copy sizes (size_id, size) FROM '/Users/susannah/Desktop/Programming/Bootcampfiles/Projects/SDC/ProductOptions/database/postgreSQL/sampleDataScripts/sizeIdData.csv' DELIMITER ',' CSV HEADER;

\copy items (item_id, title, color_ids, size_ids, original_price, sale_price, _description, liked, in_stock) FROM '/Users/susannah/Desktop/Programming/Bootcampfiles/Projects/SDC/ProductOptions/database/postgreSQL/sampleDataScripts/itemData.csv' DELIMITER ';' CSV HEADER;

\copy reviews (item_id, ease_of_assembly, value_for_money, product_quality, appearance, works_as_expected, overall_rating, created_at, i_recommend_this_product, header, body) FROM '/Users/susannah/Desktop/Programming/Bootcampfiles/Projects/SDC/ProductOptions/database/postgreSQL/sampleDataScripts/reviewData.csv' DELIMITER ',' CSV HEADER;