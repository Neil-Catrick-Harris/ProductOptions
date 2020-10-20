DROP DATABASE IF EXISTS product_options;

CREATE DATABASE product_options;

\c product_options;

CREATE TABLE IF NOT EXISTS colors(
  item_id INT PRIMARY KEY NOT NULL,
  color VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS sizes(
  item_id INT PRIMARY KEY NOT NULL,
  size VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS items(
  item_id INT PRIMARY KEY NOT NULL,
  title VARCHAR(65) NOT NULL,
  original_price DECIMAL NOT NULL,
  sale_price DECIMAL NOT NULL,
  _description VARCHAR(255) NOT NULL,
  liked BOOLEAN NOT NULL,
  in_stock INT NOT NULL
);

CREATE TABLE IF NOT EXISTS reviews(
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

-- indexing for speed
-- insert is great for one thing, not 10M. COPY sets the rule once and goes