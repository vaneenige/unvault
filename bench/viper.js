const { wire } = require("viperhtml");
const polka = require("polka");
const send = require("@polka/send");
const unvault = require("./../lib");

if (typeof process.argv[2] === "undefined") {
  console.log("> Please provide the number of items.");
  process.exit(1);
}

const server = polka();
server.listen(3000);
const routes = unvault();
const length = process.argv[2];
const items = Array.from({ length });

function Item() {
  return wire()`<li>${Math.random()}</li>`;
}

function List() {
  return wire()`<ul>${items.map(Item)}</ul>`;
}

routes.insert("viper", 1000, () => List(), {
  headers: {
    "Content-Type": "text/html"
  }
});

server.get("/normal/viper", async (req, res) => {
  send(res, 200, List(), {
    "Content-Type": "text/html"
  });
});

server.get("/fast/viper", (req, res) => {
  const { value, headers } = routes.get("viper");
  send(res, 200, value, headers);
});
