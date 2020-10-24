DROP DATABASE IF EXISTS product_options;

CREATE DATABASE product_options;

\c product_options;

CREATE TABLE IF NOT EXISTS colors(
  color_id INT PRIMARY KEY NOT NULL,
  color VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS sizes(
  size_id INT PRIMARY KEY NOT NULL,
  size VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS items(
  item_id INT PRIMARY KEY NOT NULL,
  title VARCHAR(200) NOT NULL,
  color_ids VARCHAR(200) NOT NULL,
  size_ids VARCHAR(200) NOT NULL,
  original_price DECIMAL NOT NULL,
  sale_price DECIMAL NOT NULL,
  _description VARCHAR(600) NOT NULL,
  liked BOOLEAN NOT NULL,
  in_stock INT NOT NULL
);

CREATE TABLE IF NOT EXISTS reviews(
  _id SERIAL PRIMARY KEY NOT NULL,
  item_id INT NOT NULL,
  ease_of_assembly INT NOT NULL,
  value_for_money INT NOT NULL,
  product_quality INT NOT NULL,
  appearance INT NOT NULL,
  works_as_expected INT NOT NULL,
  overall_rating INT NOT NULL,
  created_at VARCHAR(255) NOT NULL,
  i_recommend_this_product BOOLEAN NOT NULL,
  header VARCHAR(255) NOT NULL,
  body VARCHAR(600) NOT NULL
);

CREATE index idx_product_id ON reviews (item_id);