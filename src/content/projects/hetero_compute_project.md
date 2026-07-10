---
title: 'Heterogeneous Computing Performance Analysis Suite'
description: 'One computation implemented four ways — naive CPU, AVX2 SIMD, CUDA, and distributed multi-GPU — with roofline modeling to explain where performance actually comes from.'
status: 'Future'
tags: ['CUDA', 'C++', 'AVX2', 'SIMD', 'Performance Engineering', 'gRPC', 'Distributed Systems', 'GPU Computing', 'Roofline Analysis']
# heroImage: '../../assets/project_images/hetero-benchmark.png'
# githubUrl: 'https://github.com/EdgarReyesRivera/Heterogeneous-Compute-Benchmark'
featured: false
---

## Overview

The interesting question in performance work isn't *whether* a GPU beats a CPU — it's *why*, by how much, and when it stops being worth it. This project implements the same computational kernel, dense matrix multiplication, at four levels of the hardware stack and measures where the performance actually comes from at each step.

## Planned Design

**CPU baseline.** A straightforward triple-nested-loop implementation on a Ryzen 9 5950X establishes the reference, then gets rewritten with AVX2 SIMD intrinsics to process eight floats per instruction. Comparing achieved throughput against the CPU's theoretical peak reveals the first lesson: the bottleneck is memory bandwidth, not compute.

**Single GPU.** A CUDA implementation on an RTX 4070, starting from a naive one-thread-per-element kernel and moving to shared-memory tiling — the canonical GPU optimization that cuts global memory traffic by staging data in fast on-chip memory. Nsight Compute profiling quantifies memory throughput and occupancy rather than guessing at them.

**Distributed multi-GPU.** A gRPC service distributes work across two machines with mismatched GPUs (RTX 4070 and RTX 2060). Because static work splitting lets the slower card become the bottleneck, a work-stealing scheduler lets the faster GPU dynamically claim more blocks. Two GPUs will not deliver 2x — and measuring exactly why (network transfer, coordination overhead) is the point.

**Roofline analysis.** Every implementation gets placed on a roofline plot — achieved performance against the machine's compute and memory-bandwidth ceilings — turning a table of timings into a visual explanation of what limits each one.

## Why This Project

Most benchmark projects report speedup numbers. This one is built to answer the follow-up questions: why is the SIMD version bound at a fraction of peak, why does tiling matter on a GPU, and why doesn't adding a second GPU double throughput? Being able to walk through a measured bottleneck at each level of the stack — CPU, GPU, and network — is the skill this project is designed to build and demonstrate.

## Status

Planned for spring 2027, following the FPGA neural network accelerator.
