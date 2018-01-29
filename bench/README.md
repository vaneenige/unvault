# Benchmarks

This library can improve performance for different cases as shown in these benchmarks. The node server is started with `node v9.0.0` and results are documented after a single warm-up run.

The benchmarking tool for results is the following:

```sh
$ wrk -t8 -c100 -d10s http://localhost:3000/:type/:test
```

## MongoDB

Finding 100 nodes in mongodb and returning them as JSON.

#### Results

| Type    | Requests/sec |
| ------- | ------------ |
| Normal  | 2160         |
| Unvault | 19481        |

#### Normal

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency    44.23ms    8.44ms  80.36ms   65.70%
  Req/Sec   271.83     26.52   353.00     64.25%
21755 requests in 10.07s, 209.77MB read

Requests/sec:   2160.05
Transfer/sec:     20.83MB
```

#### Unvault

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency     4.89ms  391.21us   9.38ms   92.94%
  Req/Sec     2.47k   341.17     9.22k    99.75%
196758 requests in 10.10s, 1.85GB read

Requests/sec:  19481.54
Transfer/sec:    187.85MB
```

## Server Side Rendering

For this benchmark different libraries are used to render a list of X items with random values. As the results with unvault are the same for every implementation (same output, same size), the most exciting part is the performance improvement over the `normal` implementation.

> **Note:** `Normal` only describes the way I used to set up my structure. Provide me better ways and I'll update them.

### Preact

| Items | Normal | Unvault | faster |
| ----- | ------ | ------- | ------ |
| 10    | 16960  | 25001   | 1.47x  |
| 100   | 6013   | 26749   | 4.45x  |
| 1000  | 850    | 23979   | 28.21x |

### ViperHTML

| Items | Normal | Unvault | faster |
| ----- | ------ | ------- | ------ |
| 10    | 10252  | 25001   | 2.44x  |
| 100   | 2113   | 26749   | 12.66x |
| 1000  | 252    | 23979   | 95.15x |
