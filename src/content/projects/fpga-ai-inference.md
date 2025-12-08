---
title: 'FPGA-Accelerated AI Inference'
description: 'Building a custom "Mini-TPU" (Matrix Multiply Unit) on an FPGA to offload Neural Network inference from the CPU.'
status: 'Future'
tags: ['FPGA', 'DSP', 'Machine Learning', 'Python', 'Hardware Co-Design']
---

## Motivation

As AI models grow in complexity, general-purpose CPUs struggle to keep up. This project demonstrates the power of **Hardware/Software Co-Design** by building a custom hardware accelerator—specifically a GEMM (General Matrix Multiply) core—to speed up the math-heavy portions of a neural network.

## System Architecture

### Custom GEMM Core
I will design a hardware module capable of performing 4x4 integer matrix multiplication (C = A*B).
* **DSP Slices:** To maximize performance, I will utilize the dedicated DSP (Digital Signal Processing) slices available on the Zynq chip.
* **Pipelining:** The logic will be deeply pipelined to accept new matrices every clock cycle, rather than stalling while a calculation finishes.
* **Integration:** This core will be connected to the Zynq's ARM CPU via **AXI DMA**, reusing the high-speed data transport techniques I explored in previous projects.

### Full Stack Demo
To prove the system's utility, I will write a Python script running on the PYNQ Linux environment that processes MNIST digit images. The script will offload the heavy matrix math to my custom FPGA core via DMA, allowing me to benchmark the inference speed against a standard software-only implementation.