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
  return `<li>${Math.random()}</li>`;
}

function List() {
  return `<ul>${items.map(Item)}</ul>`;
}

routes.insert("vanilla", 1000, () => Buffer.from(List(), "utf8"), {
  headers: {
    "Content-Type": "text/html"
  }
});

server.get("/normal/vanilla", async (req, res) => {
  send(res, 200, Buffer.from(List(), "utf8"), {
    "Content-Type": "text/html"
  });
});

server.get("/fast/vanilla", (req, res) => {
  const { value, headers } = routes.get("vanilla");
  send(res, 200, value, headers);
});
