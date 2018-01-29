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

## ViperHTML

Server side rendering a ViperHTML based list of X items with random values.

#### Results

| Items | Normal | Unvault |
| ----- | ------ | ------- |
| 10    | 10037  | 25208   |
| 100   | 2233   | 25711   |
| 1000  | 244    | 22720   |

#### Normal (10)

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency     9.66ms    3.20ms  32.22ms   87.02%
  Req/Sec     1.26k   174.53     1.69k    62.25%
100552 requests in 10.02s, 40.92MB read

Requests/sec:  10037.43
Transfer/sec:      4.08MB
```

#### Unvault (10)

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency     3.79ms  358.90us  14.37ms   91.45%
  Req/Sec     3.18k   180.46     5.08k    94.29%
254734 requests in 10.10s, 103.38MB read

Requests/sec:  25208.77
Transfer/sec:     10.23MB
```

#### Normal (100)

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency    42.83ms    9.67ms  75.26ms   70.49%
  Req/Sec   280.94     49.71   363.00     71.62%
22510 requests in 10.08s, 61.85MB read

Requests/sec:   2233.51
Transfer/sec:      6.14MB
```

#### Unvault (100)

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency     3.71ms  537.46us  15.61ms   95.65%
  Req/Sec     3.26k   767.99    24.78k    99.88%
259670 requests in 10.10s, 714.02MB read

Requests/sec:  25711.39
Transfer/sec:     70.70MB
```

#### Normal (1000)

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency   384.58ms   56.61ms 560.74ms   90.58%
  Req/Sec    35.82     23.80   158.00     65.31%
2463 requests in 10.08s, 64.42MB read

Requests/sec:    244.42
Transfer/sec:      6.39MB
```

#### Unvault (1000)

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency     4.24ms  729.91us  20.75ms   97.50%
  Req/Sec     2.86k   110.69     3.26k    91.62%
227365 requests in 10.01s, 5.81GB read

Requests/sec:  22720.29
Transfer/sec:    594.07MB
```
