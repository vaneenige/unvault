<h1>Unvault</h1>

Unvault is a minimal layer for node that allows results of time-consuming tasks to be stored. Improved performance is achieved by adding trackers that periodically update the layer, so that stored responses can be served instantly once requested. Also available as [middleware](https://github.com/vaneenige/unvault-middleware).

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

### TypeScript

```js
import * as unvault from "unvault";

const store: Unvault = unvault();
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
  const response = await fetch(
    "https://api.github.com/repos/vaneenige/unvault"
  );
  return response.json();
});

server.get(route, (req, res) => {
  const { value } = routes.get(route);
  server.send(res, 200, value, "application/json");
});
```

## API

### .insert(key, interval, update, options)

_Inserts a tracker into the vault._

### .trigger(key)

_Manually runs a tracker._

### .prototype

As `unvault` extends [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), all of its functions are available: `clear()`, `delete(key)`, `entries()` and more!

> **Note:** The update callback will receive the `key` as a parameter. Providing a `lifetime` variable (in ms) to the `options` object will delete the tracker and stop its automatic updates once it runs out.

## Benchmarks

For this benchmark an example route is setup that searches a mongodb collection that contains 100 nodes. The node server is started with `node v9.0.0` and results are documented after a single warm-up run.

The benchmarking tool for results is the following:

```sh
$ wrk -t8 -c100 -d10s http://localhost:3000/:type/mongo
```

### Without unvault

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency    44.23ms    8.44ms  80.36ms   65.70%
  Req/Sec   271.83     26.52   353.00     64.25%
21755 requests in 10.07s, 209.77MB read

Requests/sec:   2160.05
Transfer/sec:     20.83MB
```

### With unvault

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency     4.89ms  391.21us   9.38ms   92.94%
  Req/Sec     2.47k   341.17     9.22k    99.75%
196758 requests in 10.10s, 1.85GB read

Requests/sec:  19481.54
Transfer/sec:    187.85MB
```

> **Note:** Unvault aims to reduce the time spend creating a response. If the process normally takes a second to finish this solution will eliminate most of that second.

## License

MIT © [Colin van Eenige](https://use-the-platform.com)
