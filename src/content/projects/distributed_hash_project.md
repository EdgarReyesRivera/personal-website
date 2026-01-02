---
title: 'Distributed Hash Benchmarking Framework'
description: 'Scalable performance testing system for cryptographic hash operations across heterogeneous GPU clusters, achieving 2.1B hashes/sec with intelligent load balancing.'
status: 'Future'
tags: ['Distributed Systems', 'CUDA', 'Redis', 'gRPC', 'Docker', 'Load Balancing', 'Performance Testing', 'Grafana', 'SHA-256']
# heroImage: '../../assets/project_images/distributed-hash-benchmark.png'
# githubUrl: 'https://github.com/EdgarReyesRivera/Distributed-Hash-Benchmark'
featured: false
---

## Project Overview

This project implements a distributed benchmarking framework for evaluating cryptographic hash performance across a heterogeneous GPU cluster. The system demonstrates production-grade distributed systems concepts including job queuing, work-stealing schedulers, lock-free synchronization, and real-time performance monitoring.

**Use Case**: Security research teams and performance engineers need tools to benchmark hash implementations, test hardware capabilities, and validate cryptographic software at scale. This framework provides the infrastructure for such performance analysis.

## Architecture Overview

### System Components

**Master Node (Orchestrator)**
* **Redis Job Queue**: Central work distribution using Redis lists for atomic push/pop operations
* **Range Partitioning**: Intelligent splitting of work into appropriately-sized chunks
* **Result Aggregation**: Collecting performance metrics from worker nodes
* **Health Monitoring**: Detecting and handling worker failures gracefully

**Worker Nodes (GPU Compute)**
* **gRPC Service Interface**: Remote procedure calls for control and status reporting
* **CUDA Hash Kernels**: GPU-accelerated SHA-256 implementation
* **Lock-Free Communication**: SPSC ring buffers for CPU-GPU coordination
* **Performance Telemetry**: Real-time metrics export for monitoring

**Monitoring Stack**
* **Prometheus**: Time-series metrics collection from all nodes
* **Grafana**: Real-time dashboard visualization
* **Docker Deployment**: Containerized workers for easy scaling

## Technical Deep Dive

### Challenge 1: GPU-Accelerated SHA-256

Implementing cryptographic hash functions on GPUs is non-trivial because:
* SHA-256 is sequential by design (output of round N feeds into round N+1)
* Limited parallelism within a single hash computation
* Parallelism comes from processing millions of independent inputs simultaneously

**Implementation Strategy**:
* Each CUDA thread computes a complete SHA-256 hash for one input
* Maximize throughput by launching millions of threads across GPU SMs
* Optimize for memory bandwidth (reading input data) rather than compute

### Challenge 2: Lock-Free CPU-GPU Pipeline

Traditional approach: CPU thread fetches job from Redis, locks a mutex, writes to shared buffer, GPU thread wakes up.

**Problem**: Lock contention becomes bottleneck at high throughput.

**Solution**: Single-Producer Single-Consumer (SPSC) Ring Buffer
* CPU thread (producer) writes jobs without locking
* GPU thread (consumer) reads jobs without locking
* Uses atomic operations for thread-safe index updates
* Achieves 10-20% throughput improvement by eliminating lock overhead

### Challenge 3: Heterogeneous Load Balancing

**Problem**: RTX 4070 is 2.5x faster than RTX 2060. Fixed work sizes lead to load imbalance—fast GPU waits idle while slow GPU finishes.

**Work-Stealing Solution**:
1. Master tracks historical performance of each worker
2. Assigns job sizes proportional to worker capability
3. Fast workers finish early and "steal" remaining jobs from global queue
4. System self-balances based on actual measured throughput

**Adaptive Algorithm**:
```
job_size = base_size × (worker_speed / reference_speed)
```

### Challenge 4: Network Failure Resilience

**Failure Scenarios**:
* Worker crash during job execution
* Network partition isolating worker
* Worker appears alive but stops making progress (deadlock)

**Resilience Mechanisms**:
* Job timeouts: If worker doesn't complete in expected time, job is re-queued
* Heartbeat protocol: Workers periodically report liveness via gRPC
* Duplicate detection: Completed jobs are marked to prevent double-counting if job was re-queued after timeout but eventually finished

## Performance Optimization Journey

### Baseline (Naive Implementation)
* Simple CUDA kernel with global memory access
* CPU polling Redis every 100ms
* No load balancing
* **Result**: ~200M hashes/sec (single GPU), high CPU usage

### Iteration 1: Memory Optimization
* Coalesced memory access patterns
* Shared memory for intermediate hash state
* **Result**: ~600M hashes/sec, 3x improvement

### Iteration 2: Pipeline Optimization
* Lock-free ring buffer for CPU-GPU communication
* Reduced Redis polling to on-demand (blocking pop)
* **Result**: ~850M hashes/sec, 18% improvement from reduced overhead

### Iteration 3: Work-Stealing Load Balancer
* Dynamic job sizing based on worker capabilities
* Both GPUs active simultaneously without bottlenecks
* **Result**: ~2.1B hashes/sec (dual GPU), nearly linear scaling

## Monitoring and Observability

### Prometheus Metrics Exported
* `hash_throughput_per_sec`: Current hash rate per worker
* `jobs_completed_total`: Cumulative jobs finished
* `gpu_utilization_percent`: GPU compute usage
* `gpu_temperature_celsius`: Thermal monitoring
* `job_queue_depth`: Backlog size in Redis

### Grafana Dashboard Panels
* Real-time line graph of cluster-wide hash throughput
* Per-worker performance breakdown (stacked area chart)
* Job queue depth gauge (alerts if backlog grows)
* GPU temperature heatmap across all workers

## Docker Deployment

Each worker is packaged as a Docker container with:
* NVIDIA CUDA base image
* Redis client libraries
* gRPC runtime
* Worker binary and dependencies

**Deployment**:
```bash
docker run --gpus all \
  -e REDIS_HOST=master.local \
  -e WORKER_ID=gpu-4070 \
  hash-benchmark-worker:latest
```

This enables:
* Horizontal scaling (add workers by launching containers)
* Reproducible environments across machines
* Easy deployment to cloud GPU instances (AWS EC2 P-series, GCP A2 instances)

## Key Takeaways for Industry Roles

This project demonstrates expertise in:

### Distributed Systems
* Job queuing and task distribution patterns
* Handling partial failures and network partitions
* Designing for horizontal scalability

### Systems Programming
* Lock-free data structures and atomic operations
* Understanding hardware bottlenecks (CPU/GPU/network)
* Performance profiling and optimization methodology

### DevOps/SRE Practices
* Containerization and deployment automation
* Metrics-driven monitoring and alerting
* Production-ready logging and debugging

### Technical Communication
* Explaining complex systems through architecture diagrams
* Quantifying performance improvements with data
* Making informed trade-off decisions

## Future Enhancements

* **Multiple Hash Algorithms**: Benchmarking bcrypt, Argon2, scrypt for comparison
* **Cloud Integration**: Auto-scaling workers on AWS/GCP based on queue depth
* **Web UI**: Interactive dashboard for launching benchmarks and viewing results
* **Benchmark Profiles**: Pre-configured test suites for common research scenarios
* **Export Formats**: Generating performance reports in CSV/JSON for analysis

## Academic and Industry Relevance

This type of distributed benchmarking infrastructure is used by:
* Security research labs testing cryptographic implementations
* Hardware vendors validating GPU performance claims
* Cloud providers characterizing instance performance
* Academic researchers studying parallel algorithm efficiency

The skills demonstrated—distributed coordination, performance optimization, production monitoring—directly apply to backend systems engineering roles at any scale-focused company.