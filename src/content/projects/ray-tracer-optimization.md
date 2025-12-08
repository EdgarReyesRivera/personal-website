---
title: 'High-Performance Ray Tracer (CPU vs. GPU)'
description: 'A study in High-Performance Computing (HPC), optimizing a 3D ray tracer using AVX intrinsics and custom CUDA kernels.'
status: 'Future'
tags: ['CUDA', 'HPC', 'C++', 'AVX', 'Optimization']
---

## Overview

This project is a deep dive into performance engineering. The goal is to render a 3D image by calculating light paths, first optimizing it for the CPU, and then porting it to the GPU to visualize the massive parallelism difference.

## Technical Implementation

### CPU Optimization (SIMD)
Standard C++ loops utilize only a fraction of a modern CPU's power. I will rewrite the rendering logic using **AVX Intrinsics** (`_mm256_add_ps`), forcing the processor to calculate 8 pixels simultaneously per clock cycle using its vector units.

### GPU Port (CUDA)
I will then port the renderer to a custom CUDA kernel. The focus here is not just "making it run," but optimizing memory access patterns.
* **Memory Coalescing:** I will ensure that neighboring threads read from neighboring RAM addresses to maximize memory bandwidth.
* **Verification:** Using **Nsight Compute**, I will measure the actual memory bandwidth usage and plot my kernel's performance on a **Roofline Model** graph. This will mathematically prove whether I have hit the theoretical hardware limits of the device.