## Preact

#### Slow (10):

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency     5.66ms    0.93ms  15.97ms   87.58%
  Req/Sec     2.13k   155.47     4.14k    92.29%
170832 requests in 10.10s, 69.52MB read

Requests/sec:  16908.42
Transfer/sec:      6.88MB
```

#### Fast (10):

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency     3.88ms  314.16us  10.52ms   92.04%
  Req/Sec     3.11k   310.55     8.11k    98.63%
248545 requests in 10.10s, 101.18MB read

Requests/sec:  24600.96
Transfer/sec:     10.02MB
```

#### Slow (100):

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency    15.93ms    2.00ms  25.96ms   92.39%
  Req/Sec   755.91     44.29   848.00     74.25%
60366 requests in 10.04s, 165.86MB read

Requests/sec:   6013.74
Transfer/sec:     16.52MB
```

#### Fast (100):

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency     4.16ms  228.55us  11.88ms   90.07%
  Req/Sec     2.90k    72.47     3.01k    93.19%
232929 requests in 10.10s, 639.81MB read

Requests/sec:  23053.74
Transfer/sec:     63.32MB
```

#### Slow (1000):

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency   112.18ms    7.94ms 127.12ms   96.71%
  Req/Sec   106.64     16.49   174.00     76.01%
8549 requests in 10.06s, 223.60MB read

Requests/sec:    850.18
Transfer/sec:     22.24MB
```

#### Fast (1000):

```
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency     6.81ms  249.97us  11.00ms   90.73%
  Req/Sec     1.77k    42.11     1.82k    70.88%
140927 requests in 10.01s, 3.60GB read

Requests/sec:  14078.49
Transfer/sec:    368.12MB
```
