DROP TABLE IF EXISTS mykeaitems.items;

CREATE TABLE IF NOT EXISTS mykeaitems.items (
  id int,
  title text,
  colors text,
  sizes text,
  originalPrice decimal,
  salePrice decimal,
  description text,
  liked boolean,
  inStock int,
  PRIMARY KEY (id));
