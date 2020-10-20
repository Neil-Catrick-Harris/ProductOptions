\copy colors (item_id, color) FROM '/Users/susannah/Desktop/Programming/Bootcampfiles/Projects/SDC/ProductOptions/database/sampleDataScripts/colorData.csv' DELIMITER ',' CSV HEADER;

\copy sizes (item_id, size) FROM '/Users/susannah/Desktop/Programming/Bootcampfiles/Projects/SDC/ProductOptions/database/sampleDataScripts/sizeData.csv' DELIMITER ',' CSV HEADER;

\copy items (item_id, title, original_price, sale_price, _description, liked, in_stock) FROM '/Users/susannah/Desktop/Programming/Bootcampfiles/Projects/SDC/ProductOptions/database/sampleDataScripts/itemData.csv' DELIMITER ',' CSV HEADER;

\copy reviews (item_id, ease_of_assembly, value_for_money, product_quality, appearance, works_as_expected, overall_rating, created_at, i_recommend_this_product, header, body) FROM '/Users/susannah/Desktop/Programming/Bootcampfiles/Projects/SDC/ProductOptions/database/sampleDataScripts/reviewData.csv' DELIMITER ',' CSV HEADER;