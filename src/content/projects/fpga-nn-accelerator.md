---
title: 'FPGA Neural Network Inference Accelerator'
description: 'A custom matrix multiply accelerator implemented in SystemVerilog on a Zynq SoC, controllable from Linux via an AXI4-Lite software driver, targeting neural network inference workloads.'
status: 'Future'
tags: ['FPGA', 'SystemVerilog', 'Vivado', 'AXI4', 'Zynq', 'C++', 'Embedded Linux', 'Hardware Accelerator']
# heroImage: '../../assets/project_images/fpga-nn-accelerator.png'
# githubUrl: 'https://github.com/EdgarReyesRivera/FPGA-NN-Accelerator'
featured: false
---

## Project Overview

This project is a direct extension of my existing FPGA work — taking the hardware design skills from the Gaussian blur pipeline and applying them to AI acceleration. The goal is to design a custom matrix multiply unit in SystemVerilog, integrate it into a Zynq SoC system via an AXI4-Lite bus interface, and write a Linux software driver that allows ARM-side code to offload matrix computations to the FPGA fabric.

Matrix multiplication is the fundamental operation in neural network inference, so this is essentially a minimal custom AI accelerator — the same class of hardware as Google's TPU or Apple's Neural Engine, just at a much smaller scale.

## System Design

**Hardware Side (FPGA Fabric)**

A synthesizable SystemVerilog module implementing 4×4 integer matrix multiplication, wrapped in an AXI4-Lite slave interface. The interface maps the input and output matrices to memory-mapped registers, and a control register triggers computation. The design is synthesized and implemented in Vivado targeting the Zynq device.

**Software Side (ARM Linux)**

A C++ driver using `/dev/mem` to memory-map the accelerator's register space directly from user space. The driver exposes a clean API — write two matrices in, get the result matrix out — hiding all the register-level detail. Performance is measured by timing thousands of multiplications in both software and hardware to calculate a concrete speedup number.

**Integration Goal**

The final demo uses weights extracted from a trained neural network (from my CUDA Vision Pipeline project) and runs one fully-connected layer through the FPGA accelerator, comparing the result against a software reference to verify correctness.

## Why This Project

My previous FPGA work (Gaussian Blur, RISC-V Processor) was self-contained hardware — logic running entirely on the FPGA fabric with no host processor involvement. This project tackles a different and more industry-relevant challenge: designing custom compute logic that a CPU can offload work to via a standard bus interface. The AXI4-Lite interface and Linux driver are entirely new territory, and they directly answer the question that the AI hardware industry cares about: how do you move computation off a general-purpose processor and onto dedicated silicon?

## Current Status

Planned. Development begins after completing the CUDA Vision Pipeline project.
