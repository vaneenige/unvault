const mongodb = require('mongodb');
const polka = require('polka');
const send = require('@polka/send');
const unvault = require('./../lib');

const routes = unvault();

function connect(callback) {
  mongodb.MongoClient.connect(`mongodb://localhost:27017/cms`, (error, db) => {
    if (error !== null) {
      console.log(error);
    } else {
      callback(db);
    }
  });
}

async function getNodes(db) {
  return db
    .collection('nodes')
    .find()
    .toArray();
}

connect(db => {
  routes.insert('mongo', 2000, async () => {
    const nodes = await getNodes(db);
    return JSON.stringify(nodes);
  });

  const server = polka();
  server.listen(3000);

  server.get('/normal/mongo', async (req, res) => {
    const nodes = await getNodes(db);
    send(res, 200, JSON.stringify(nodes), {
      'Content-Type': 'application/json',
    });
  });

  server.get('/fast/mongo', (req, res) => {
    const { value } = routes.get('mongo');
    send(res, 200, value, {
      'Content-Type': 'application/json',
    });
  });
});
