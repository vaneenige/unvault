const { h } = require("preact");
const render = require("preact-render-to-string");
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
  return h("li", null, Math.random());
}

function List() {
  return h("ul", null, items.map(Item));
}

routes.insert("preact", 1000, () => render(List()), {
  headers: {
    "Content-Type": "text/html"
  }
});

server.get("/normal/preact", async (req, res) => {
  send(res, 200, render(List()), {
    "Content-Type": "text/html"
  });
});

server.get("/fast/preact", (req, res) => {
  const { value, headers } = routes.get("preact");
  send(res, 200, value, headers);
});
