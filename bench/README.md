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

## Preact

Server side rendering a Preact based list of X items with random values.

#### Results

| Items | Normal | Unvault |
| ----- | ------ | ------- |
| 10    | 16908  | 24600   |
| 100   | 6013   | 23053   |
| 1000  | 850    | 14078   |

#### Normal (10):

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency     5.66ms    0.93ms  15.97ms   87.58%
  Req/Sec     2.13k   155.47     4.14k    92.29%
170832 requests in 10.10s, 69.52MB read

Requests/sec:  16908.42
Transfer/sec:      6.88MB
```

#### Unvault (10):

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency     3.88ms  314.16us  10.52ms   92.04%
  Req/Sec     3.11k   310.55     8.11k    98.63%
248545 requests in 10.10s, 101.18MB read

Requests/sec:  24600.96
Transfer/sec:     10.02MB
```

#### Normal (100):

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency    15.93ms    2.00ms  25.96ms   92.39%
  Req/Sec   755.91     44.29   848.00     74.25%
60366 requests in 10.04s, 165.86MB read

Requests/sec:   6013.74
Transfer/sec:     16.52MB
```

#### Unvault (100):

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency     4.16ms  228.55us  11.88ms   90.07%
  Req/Sec     2.90k    72.47     3.01k    93.19%
232929 requests in 10.10s, 639.81MB read

Requests/sec:  23053.74
Transfer/sec:     63.32MB
```

#### Normal (1000):

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency   112.18ms    7.94ms 127.12ms   96.71%
  Req/Sec   106.64     16.49   174.00     76.01%
8549 requests in 10.06s, 223.60MB read

Requests/sec:    850.18
Transfer/sec:     22.24MB
```

#### Unvault (1000):

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency     6.81ms  249.97us  11.00ms   90.73%
  Req/Sec     1.77k    42.11     1.82k    70.88%
140927 requests in 10.01s, 3.60GB read

Requests/sec:  14078.49
Transfer/sec:    368.12MB
```
