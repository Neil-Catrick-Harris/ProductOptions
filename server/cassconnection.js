//tried to have some separation, but dealing with the async nature of this made it take longer than deadline would allow

const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'mykeaitems'
});

exports.getData = (id) => {
  console.log('------------------id:', id);
  const query = `SELECT * FROM items WHERE id=${id}`;
  client.execute(query)
  .then((result) => {
    console.log(`Item with the id, ${result}`);
    return result;
  })
  .catch((err) => {
    console.log('------------------------- ERROR ------------------------', err);
  })
};

exports.postData = (id, overallRating, easeOfAssembly, valueForMoney, productQuality, appearance, worksAsExpected, header, body, createdAt, iRecommendThisProduct) => {

};

exports.putData = (id, newItem) => {

};

exports.patchData = (id) => {
  ;
}

exports.deleteData = (id) => {

};

exports.deleteALLData = () => {

};