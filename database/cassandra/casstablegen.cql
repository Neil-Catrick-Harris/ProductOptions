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
   reviews set<text>,
   PRIMARY KEY (id));