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
* Small wrapper extending [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
* Support for multiple stores

## Install

```
$ npm install --save unvault
```

> **Note:** `Node 7.6.0` is required for async and await!

## Usage

```js
const unvault = require("unvault");

const store = unvault();

store.insert("random", 1000, () => Math.random());

const { value } = store.get("random");
```

### Manual

Periodic updates might not suit your application's needs. Unvault supports a manual mode that provides more control over which trackers receive an update and when. Trackers with an interval of `0` will only run once. Both automatic and manual trackers allow for an update trigger.

```js
store.insert("random", 0, () => Math.random());

store.trigger("random");
```

### Advanced

Unvault can be combined with a node servers like [Polka](https://github.com/lukeed/polka) or [Express](https://github.com/expressjs/express) to quickly deliver stored content to users. Trackers also work with `async` and `await` for asynchronous updates. Store your external fetch responses, database results and other in the vault for faster response times.

```js
const polka = require("polka");
const unvault = require("unvault");
const fetch = require("node-fetch");

const server = polka();
server.listen(3000);

const route = "/api/fetch";
const routes = unvault();

routes.insert(route, 2000, async () => {
  const response = await fetch(url);
  return response.json();
});

server.get(route, (req, res) => {
  const { value } = routes.get(route);
  server.send(res, 200, value, "application/json");
});
```

## API

### insert(key, interval, update, value)

_Inserts a tracker into the vault._

### trigger(key)

_Manually runs a tracker._

> **Note:** As `unvault` extends [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), all of its functions are available: `clear()`, `delete(key)`, `entries()` and more!

## Benchmarks

For this benchmark an example route is setup that searches a mongodb collection that contains 100 nodes. The node server is started with `node v9.0.0` and results are documented after a single warm-up run.

The benchmarking tool for results is the following:

```sh
$ wrk -t8 -c100 -d10s http://localhost:3000/:type/mongo
```

### Without unvault

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency    45.73ms   10.05ms  76.48ms   69.61%
  Req/Sec   262.81     24.40   363.00     67.21%
21041 requests in 10.07s, 203.31MB read

Requests/sec:   2089.66
Transfer/sec:     20.19MB
```

### With unvault

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency     4.94ms  439.79us  12.74ms   92.44%
  Req/Sec     2.44k   236.26     6.23k    98.88%
195247 requests in 10.10s, 1.84GB read

Requests/sec:  19325.37
Transfer/sec:    186.73MB
```

> **Note:** Unvault aims to reduce the time spend creating a response. If the process normally takes a second to finish this solution will eliminate most of that second.

## License

MIT © [Colin van Eenige](https://use-the-platform.com)
