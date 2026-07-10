---
title: 'FPGA Neural Network Inference Accelerator'
description: 'A 4×4 integer matrix multiply accelerator in SystemVerilog on a Zynq SoC, driven from ARM Linux over AXI4-Lite and demonstrated on a real MNIST network layer.'
status: 'Future'
tags: ['FPGA', 'SystemVerilog', 'Vivado', 'AXI4', 'Zynq', 'C++', 'Embedded Linux', 'Hardware Accelerator']
# heroImage: '../../assets/project_images/fpga-nn-accelerator.png'
featured: false
---

## Overview

Matrix multiplication is the operation neural network inference spends nearly all of its time on, which makes it the natural target for custom hardware — the same problem TPUs and phone neural engines solve at industrial scale. This project builds a small version of that idea end to end: a 4×4 integer matrix multiply unit in SystemVerilog on a Zynq SoC, exposed to the chip's ARM cores over an AXI4-Lite bus so ordinary Linux software can offload matrix work to the FPGA fabric.

## Planned Design

**Hardware core.** The multiply unit unrolls all sixteen dot products into a parallel multiply-accumulate array mapped onto the FPGA's DSP slices, so a full 4×4 product completes in a single clock cycle. It gets verified in simulation against a software reference before any synthesis run.

**Bus interface.** A hand-written AXI4-Lite slave — deliberately not the IP-generator shortcut — maps the two input matrices, the result matrix, and control and status registers into the ARM cores' address space, with a simple idle/compute/done state machine sequencing each operation.

**Software.** A C++ reference implementation serves as both the correctness ground truth and the CPU baseline. A small C driver memory-maps the accelerator's registers through `/dev/mem` and wraps them in a clean write-A, write-B, start, read-C API. Performance comes from timing thousands of multiplies end to end against the ARM baseline — AXI transfers included, because honest numbers have to count data movement, not just compute.

**The demo.** Weights from a pre-trained PyTorch MNIST model, quantized to 8-bit integers and tiled into 4×4 blocks, run one fully-connected layer through the accelerator. The predicted digit has to match software inference.

## Why This Project

My completed FPGA work — the Gaussian blur pipeline, the TinyRV1 processor — is self-contained: logic running entirely on the fabric with no host processor involved. This project is about hardware/software co-design instead: custom compute that a CPU offloads to across a standard bus, which is how accelerators actually get used. The measurement I care most about is where the time goes. With a single-cycle compute core, the AXI transfers will likely dominate, and that data-movement bottleneck is exactly the trade-off that shapes real accelerator design.

## Status

Planned for fall 2026, after the FPGA network packet parser. The heterogeneous computing benchmark suite follows in spring 2027.
