DROP KEYSPACE IF EXISTS mykeaitems;

CREATE KEYSPACE mykeaitems
  WITH REPLICATION = {
   'class' : 'SimpleStrategy',
   'replication_factor' : 1};
