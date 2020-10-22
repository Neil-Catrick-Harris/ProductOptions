CREATE TABLE IF NOT EXISTS mykeaitems.items (
  id int,
  title text,
  colors list<text>,
  sizes list<text>,
  originalPrice decimal,
  salePrice decimal,
  description text,
  liked boolean,
  inStock int,
  PRIMARY KEY (id));

CREATE TABLE IF NOT EXISTS mykeaitems.itemReviews (
  id int,
  ease_of_assembly int,
  value_for_money int,
  product_quality int,
  appearance int,
  works_as_expected int,
  overall_rating int,
  created_at text ,
  i_recommend_this_product BOOLEAN ,
  header text ,
  body text,
  PRIMARY KEY (id));