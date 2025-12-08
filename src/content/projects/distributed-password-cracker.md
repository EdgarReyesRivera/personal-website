---
title: 'Distributed Heterogeneous Password Cracker'
description: 'A distributed system orchestrating CPU, GPU, and FPGA nodes to brute-force SHA-256 hashes over a local network.'
status: 'Future'
tags: ['C++', 'CUDA', 'SystemVerilog', 'Distributed Systems', 'Redis', 'gRPC']
---

## The Capstone Vision

This project represents the culmination of my work in embedded systems, networking, and high-performance computing. It is a distributed security tool designed to recover plaintext passwords from SHA-256 hashes by splitting the workload across a heterogeneous cluster: a Desktop CPU, a high-power GPU, and a remote FPGA.

## System Architecture

### 1. The Master Node (Desktop CPU)
Acting as the orchestrator, the Master node maintains the global search space.
* **Protocol:** It uses **gRPC** to dispatch jobs to remote nodes and local function calls for the local GPU.
* **Resilience:** It implements failover logic; if a network node disconnects (simulated by physically pulling a cable), the Master detects the timeout and re-assigns the "lost" chunk to the local GPU.

### 2. The Heavy Lifter (Desktop GPU - RTX 4070)
This worker handles the bulk of the computation.
* **Optimization:** I will use **CUDA Streams** to overlap memory transfers with computation, ensuring the GPU is never starved for data.
* **Priority:** The kernel will run at "Real-Time Priority" to maximize throughput on the local hardware.

### 3. The Remote Worker (NAS - RTX 2060)
Running inside a Docker container on a remote NAS, this worker mimics a "straggler" node.
* **Dynamic Work Stealing:** Because this node is slower, the Master assigns it smaller chunks (e.g., 100 million hashes) so the faster RTX 4070 doesn't finish early and sit idle waiting for the NAS.

### 4. The Streaming Pipeline (FPGA)
The FPGA worker offers deterministic throughput. I will implement a **deeply pipelined SHA-256 core** in SystemVerilog.
* **Throughput:** The pipeline accepts a stream of nonces via AXI Stream, aiming for a throughput of 1 hash per clock cycle.

## Visualization
To monitor this complex system, I will deploy a **Grafana Dashboard**. It will pull real-time metrics from all three nodes, visualizing hashes/sec, thermal performance, and network usage in a single pane of glass.