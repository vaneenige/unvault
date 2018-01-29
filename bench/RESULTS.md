# Results

This library can improve performance for different cases as shown in these benchmarks. The node server is started with `node v9.0.0` and results are documented after a single warm-up run.

The benchmarking tool for results is the following:

```sh
$ wrk -t8 -c100 -d10s http://localhost:3000/:type/:test
```

## Default

#### 10 items:

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency     3.80ms  357.59us   6.28ms   93.34%
  Req/Sec     3.17k   708.40    23.14k    99.88%
252486 requests in 10.10s, 103.02MB read

Requests/sec:  25001.47
Transfer/sec:     10.20MB
```

#### 100 items:

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency     3.58ms  214.36us   9.67ms   87.60%
  Req/Sec     3.37k   105.04     4.40k    91.69%
270277 requests in 10.10s, 742.72MB read

Requests/sec:  26749.19
Transfer/sec:     73.51MB
```

#### 1000 items:

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency     4.00ms  174.14us   5.96ms   90.43%
  Req/Sec     3.01k    41.05     3.14k    78.62%
239952 requests in 10.01s, 6.13GB read

Requests/sec:  23979.21
Transfer/sec:    627.18MB
```

## Preact

#### 10 items:

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency     5.64ms    0.89ms  15.24ms   87.53%
  Req/Sec     2.14k   188.48     5.09k    96.26%
171363 requests in 10.10s, 69.73MB read

Requests/sec:  16960.31
Transfer/sec:      6.90MB
```

#### 100 items:

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency    15.94ms    2.19ms  27.25ms   93.67%
  Req/Sec   755.60     43.59   848.00     67.50%
60255 requests in 10.02s, 165.55MB read

Requests/sec:   6010.69
Transfer/sec:     16.51MB
```

#### 1000 items:

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency   111.37ms    7.69ms 129.60ms   95.21%
  Req/Sec   107.39     13.58   207.00     79.38%
8621 requests in 10.10s, 225.48MB read

Requests/sec:    853.56
Transfer/sec:     22.32MB
```

## ViperHTML

#### 10 items:

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency     9.42ms    2.79ms  25.84ms   85.08%
  Req/Sec     1.29k   148.80     1.70k    65.25%
102770 requests in 10.02s, 41.82MB read

Requests/sec:  10252.68
Transfer/sec:      4.17MB
```

#### 100 items:

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency    45.12ms    9.60ms  74.04ms   73.68%
  Req/Sec   266.68     47.51   480.00     76.66%
21346 requests in 10.10s, 58.65MB read

Requests/sec:   2113.99
Transfer/sec:      5.81MB
```

#### 1000 items:

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency   372.66ms   47.52ms 454.64ms   94.31%
  Req/Sec    36.16     22.70   130.00     60.93%
2548 requests in 10.09s, 66.64MB read

Requests/sec:    252.57
Transfer/sec:      6.61MB
```
