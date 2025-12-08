---
title: 'HFT Market Data Parser: Software vs. Hardware'
description: 'A latency benchmarking showdown comparing Kernel Bypass (io_uring) against FPGA Offload for processing high-frequency trading data.'
status: 'Future'
tags: ['SystemVerilog', 'C++', 'io_uring', 'UDP', 'High Frequency Trading']
---

## Motivation

In the world of High-Frequency Trading (HFT), standard TCP/IP stacks are too slow. Market data arrives via UDP, and detecting packet loss immediately is critical. This project aims to ingest millions of trade packets per second and benchmarks two distinct architectural approaches to handling the stream: a software-optimized approach and a hardware-accelerated approach.

## Technical Challenge

The system must parse a continuous stream of binary structures—containing a sequence number, ticker symbol, and price—and detect "sequence gaps" (packet loss) in real-time.

## Implementation Details

### The Software Challenger (Kernel Bypass)
For the software implementation, I will bypass the standard Linux networking stack using **io_uring**, Linux's modern asynchronous I/O interface. The goal is to minimize context switches and system call overhead. I will measure the latency from "Packet Arrival" to "Gap Logged" using high-resolution system clocks.

### The Hardware Challenger (FPGA Offload)
For the hardware implementation, I will design a **SystemVerilog Finite State Machine (FSM)** that accepts an AXI-Stream interface directly from the network controller.
* **Cut-Through Switching:** Instead of buffering the whole packet, the FSM will parse the struct byte-by-byte as it flows in.
* **The Goal:** The hardware logic should be able to detect a sequence gap and trigger an interrupt to the CPU in **less than 10 clock cycles**, drastically outperforming the software solution.