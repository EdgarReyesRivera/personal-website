---
title: 'FPGA-Accelerated Neural Network Inference Engine'
description: 'Custom hardware accelerator for matrix operations on Zynq FPGA, achieving 3x speedup over ARM CPU baseline for ML inference workloads.'
status: 'Future'
tags: ['FPGA', 'SystemVerilog', 'AXI4', 'Machine Learning', 'Hardware Acceleration', 'Zynq', 'DMA', 'Embedded Linux']
# heroImage: '../../assets/project_images/fpga-ml-accelerator.png'
# githubUrl: 'https://github.com/EdgarReyesRivera/FPGA-ML-Accelerator'
featured: false
---

## Project Vision

This project aims to design and implement a custom AI accelerator on a Zynq FPGA, bridging the gap between hardware design and machine learning. By creating specialized silicon for matrix multiplication—the fundamental operation in neural networks—this project demonstrates hardware/software co-design principles used in modern AI chips like Google's TPU and Apple's Neural Engine.

## Planned Architecture

The system will consist of three integrated layers:

### Hardware Core (RTL Design)
* **Matrix Multiply Unit**: Custom SystemVerilog module implementing 4×4 integer matrix multiplication using DSP48 primitives
* **AXI4-Lite Interface**: Industry-standard bus protocol enabling CPU-to-accelerator communication
* **DMA Controller**: Direct memory access for efficient data transfer without CPU intervention
* **Control State Machine**: Orchestrates computation pipeline (IDLE → COMPUTE → DONE states)

### Software Driver Layer
* **Bare-Metal C Driver**: Low-level interface using `/dev/mem` for register access
* **API Abstraction**: Clean function calls hiding hardware complexity: `hw_matmul(A, B, C)`
* **Performance Profiling**: Instrumentation for latency measurement and throughput analysis

### ML Inference Pipeline
* **MNIST Dataset Integration**: Real-world digit recognition workload
* **Quantization**: Converting floating-point weights to fixed-point for hardware efficiency
* **Accuracy Validation**: Ensuring hardware-accelerated results match software baseline

## Technical Objectives

**Primary Goal**: Achieve measurable speedup over ARM CPU baseline while maintaining inference accuracy.

**Key Challenges**:
1. **Fixed-Point Arithmetic**: Hardware doesn't efficiently handle floating-point—requires careful quantization to maintain accuracy
2. **AXI Bus Optimization**: Minimizing register access latency through burst transfers and proper addressing
3. **Resource Utilization**: Balancing performance with FPGA resource constraints (LUTs, DSPs, Block RAM)
4. **Timing Closure**: Meeting 100MHz clock frequency target across all logic paths

**Success Metrics**:
* 2-5x speedup over ARM Cortex-A9 software implementation
* <10% FPGA resource utilization for scalability
* Inference accuracy within 1% of software baseline
* <20ms latency for single-layer forward pass

## Development Methodology

The project follows industry best practices for hardware/software co-design:

1. **Algorithm Validation**: Implement and verify matrix multiplication in C++ before hardware design
2. **RTL Development**: Design hardware module with comprehensive testbenches in Vivado Simulator
3. **Integration**: Package IP with AXI interface using Vivado IP Packager
4. **System Assembly**: Create complete Zynq system using Vivado Block Design
5. **Driver Development**: Write bare-metal C code for hardware control
6. **Optimization**: Profile and iterate based on performance bottlenecks

## Expected Outcomes

Upon completion, this project will demonstrate:

* **Hardware Design Expertise**: RTL coding, synthesis, timing analysis
* **Bus Protocol Knowledge**: AXI4 transactions, address mapping, handshaking
* **Systems Integration**: Connecting custom IP to processor subsystems
* **Performance Engineering**: Roofline analysis, bandwidth vs. compute trade-offs
* **ML Hardware Understanding**: Why specialized accelerators exist and their limitations

## Why This Matters

AI acceleration is a multi-billion dollar industry. This project provides hands-on experience with the fundamental concepts behind:
* Data center AI accelerators (Google TPU, AWS Inferentia)
* Edge AI processors (Apple Neural Engine, Qualcomm AI Engine)
* Automotive compute platforms (Tesla FSD chip, NVIDIA Drive)

Most importantly, it demonstrates the ability to work across the hardware/software boundary—a rare and valuable skill in systems engineering.

## Future Enhancements

Potential extensions beyond the initial implementation:

* **Multi-Layer Support**: Chaining multiple matrix operations for deeper networks
* **Systolic Array Architecture**: Implementing the design pattern used in modern AI chips
* **Quantization-Aware Training**: Co-designing network and hardware constraints
* **PYNQ Integration**: Python bindings for easier experimentation and deployment