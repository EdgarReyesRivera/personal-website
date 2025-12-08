---
title: 'Bare Metal Systems Fundamentals'
description: 'A foundational project to master host (CPU) and device (FPGA/GPU) architectures without the abstraction of an Operating System.'
status: 'Future'
tags: ['C++', 'CUDA', 'Zynq', 'Vivado', 'HAL', 'Embedded Systems']
---

## Motivation

To truly understand how modern computing hardware operates, it is necessary to strip away the Operating System and interact directly with the silicon. The goal of this project is to stop relying on standard libraries and OS drivers, and instead build a robust, compile-time verified Hardware Abstraction Layer (HAL) from scratch.

## Core Features

This project is divided into two key architectural explorations:

### 1. Zynq Hardware Abstraction Layer (HAL)
I will design a driver system for the Zynq PS to control the AXI GPIO (blinking an LED).
* **Safety First:** Instead of writing to arbitrary memory addresses like `0x41200000`, I will implement a type-safe register mapping system.
* **C++20 Concepts:** I will utilize `requires` clauses to ensure that only valid register structures can be passed to driver functions, catching hardware interface errors at compile-time rather than runtime.

### 2. CUDA Vector Add with Unified Memory
On the GPU side, I will explore the physical separation of CPU and GPU memory spaces by implementing a vector addition engine ($C = A + B$).
* **Unified Memory:** I will use `cudaMallocManaged` to create pointers accessible by both processors.
* **Synchronization:** A critical component is implementing `cudaDeviceSynchronize()` to manage the timing between the CPU preparing data and the GPU executing the parallel math.

## Verification

A major focus of this project is verifying that high-level abstractions do not incur performance penalties. I will use `objdump -d` to analyze the compiled assembly code, ensuring that my complex C++ templates compile down to single, efficient assembly instructions (like `str` store register), achieving the "zero-cost abstraction" ideal.