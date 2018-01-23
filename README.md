<h1>Unvault</h1>

Unvault is a minimal layer for node that allows results of time-consuming tasks to be stored. Improved performance is achieved by adding trackers that periodically update the layer, so that stored responses can be served instantly once requested.

<a href="https://www.npmjs.org/package/unvault">
  <img src="https://img.shields.io/npm/v/unvault.svg?style=flat" alt="npm">
</a>

<a href="https://travis-ci.org/vaneenige/unvault">
  <img src="https://travis-ci.org/vaneenige/unvault.svg?branch=master" alt="travis">
</a>

#### Features:

* Insert key based trackers
* Automatic and manual update
* Support for `async` and `await`
* Fast (without dependencies)

## Install

```
$ npm install --save unvault
```

> **Note:** `Node 7.6.0` is required for async and await!

## Usage

```js
const vault = require("unvault");

vault.insert("random", 1000, () => Math.random());

vault.find("random");
```

### Manual

Periodic updates might not suit your application's needs. Unvault supports a manual mode that provides more control over which trackers receive an update and when. Trackers with an interval of `0` will only run once. Both automatic and manual trackers allow for an update trigger.

```js
vault.insert("random", 0, () => Math.random());

vault.trigger("random");
```

### Advanced

Unvault can be combined with a node servers like [Polka](https://github.com/lukeed/polka) or [Express](https://github.com/expressjs/express) to quickly deliver stored content to users. Trackers also work with `async` and `await` for asynchronous updates. Store your external fetch responses, database results and other in the vault for faster response times.

```js
const polka = require("polka");
const vault = require("unvault");
const fetch = require("node-fetch");

const server = polka();
server.listen(3000);

const route = "/api/fetch";

vault.insert(route, 2000, async () => {
  let response = await fetch(url);
  return response.json();
});

server.get(route, (req, res) => {
  const { value } = vault.find(route);
  server.send(res, 200, value, "application/json");
});
```

## API

### find(key)

_Selects a tracker in the vault._

### insert(key, interval, update, value)

_Inserts a tracker into the vault._

### remove(key)

_Removes a tracker from the vault._

### trigger(key)

_Manually runs a tracker._

## Benchmarks

For this benchmark an example route is setup that searches a mongodb collection that contains 100 nodes. The node server is started with `node v9.0.0` and results are documented after a single warm-up run.

The benchmarking tool for results is the following:

```sh
$ wrk -t8 -c100 -d10s http://localhost:3000/:type/mongo
```

### Without unvault

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency    43.61ms    7.83ms  64.93ms   66.54%
  Req/Sec   275.65     23.42   356.00     62.63%
22053 requests in 10.06s, 213.09MB read

Requests/sec:   2192.49
Transfer/sec:     21.19MB
```

### With unvault

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency    13.09ms  601.66us  26.23ms   79.99%
  Req/Sec     0.92k    39.31     0.97k    53.12%
73370 requests in 10.02s, 708.95MB read

Requests/sec:   7324.64
Transfer/sec:     70.78MB
```

> **Note:** Unvault aims to reduce the time spend creating a response. If the process normally takes a second to finish this solution will eliminate most of that second.

## License

MIT © [Colin van Eenige](https://use-the-platform.com)
