const mongodb = require("mongodb");
const polka = require("polka");
const vault = require("./../lib");

// The API route and tracker key
const route = "/:type/mongo";

// Helper function to connect with mongodb
function connect(callback) {
  mongodb.MongoClient.connect(`mongodb://localhost:27017/cms`, (error, db) =>
    callback(error !== null ? error : db)
  );
}

connect(db => {
  // Inserts a tracker into the vault
  vault.insert(route, 2000, async () => {
    return db
      .collection("nodes")
      .find()
      .toArray();
  });

  // Start the Polka node server
  const server = polka();
  server.listen(3000);

  // Listen to the route that equals the tracker key
  server.get(route, async (req, res) => {
    const { type = "slow" } = req.params;
    const data = JSON.stringify(
      type === "slow"
        ? await db
            .collection("nodes")
            .find()
            .toArray()
        : vault.find(route).value
    );
    server.send(res, 200, data, "application/json");
  });
});
