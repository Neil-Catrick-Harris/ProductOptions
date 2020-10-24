USE mykeaitems;

COPY itemReviews (id, ease_of_assembly, value_for_money, product_quality, appearance, works_as_expected, overall_rating, created_at, i_recommend_this_product, header, body) FROM '/Users/susannah/Desktop/Programming/Bootcampfiles/Projects/SDC/ProductOptions/database/cassandra/csvsfiles/cassReviewData.csv' with header=true and delimiter =';';