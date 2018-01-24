const mongodb = require("mongodb");
const polka = require("polka");
const vault = require("./../lib");

const routes = vault();

// Helper function to connect with mongodb
function connect(callback) {
  mongodb.MongoClient.connect(`mongodb://localhost:27017/cms`, (error, db) =>
    callback(error !== null ? error : db)
  );
}

// Helper function to the nodes from mongodb
async function getNodes(db) {
  return db
    .collection("nodes")
    .find()
    .toArray();
}

connect(db => {
  // Inserts a tracker into the vault
  routes.insert("mongo", 2000, async () => {
    const nodes = await getNodes(db);
    return JSON.stringify(nodes);
  });

  // Start the Polka node server
  const server = polka();
  server.listen(3000);

  // Listen to the route that equals the tracker key
  server.get("/slow/mongo", async (req, res) => {
    const nodes = await getNodes(db);
    server.send(res, 200, JSON.stringify(nodes), "application/json");
  });

  server.get("/fast/mongo", (req, res) => {
    const { value } = routes.get("mongo");
    server.send(res, 200, value, "application/json");
  });
});
