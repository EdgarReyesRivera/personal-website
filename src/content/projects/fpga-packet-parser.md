---
title: 'FPGA Network Packet Parser'
description: 'A UDP-style packet parser built as a SystemVerilog state machine on a Zynq SoC, exposing parsed header fields to the ARM cores over AXI4-Lite with a measured hardware-vs-software latency comparison.'
status: 'In-Progress'
tags: ['FPGA', 'SystemVerilog', 'Vivado', 'AXI4', 'Zynq', 'C++', 'Networking']
# heroImage: '../../assets/project_images/fpga-packet-parser.png'
# githubUrl: (add once the repository is public)
featured: false
---

## Overview

Low-latency networking is where FPGAs earn their keep. A packet that has to climb through a NIC driver and an operating system's network stack before software can even look at it has already spent microseconds in transit; parse it in hardware and the fields are sitting in registers a few clock cycles after the last header byte arrives. This project implements that idea at a learnable scale: a UDP-style packet parser on a Zynq SoC that accepts a byte stream, walks a fixed-format header with a finite state machine, and exposes the parsed fields to the chip's ARM cores through AXI4-Lite registers.

## Design

**Protocol and reference first.** The packet format is deliberately simple — a four-byte source address, four-byte destination address, two-byte payload length, and up to 32 bytes of payload. Before any RTL, a C++ software parser establishes the ground truth, with a shared set of test vectors: a valid packet, a malformed one, and back-to-back packets. The same vectors drive both the software unit tests and the hardware testbench, so hardware and software are always judged against identical cases.

**Hardware state machine.** The SystemVerilog FSM consumes one byte per clock, stepping through the header fields, latching each as it completes, and asserting a packet-valid strobe for one cycle when the payload ends — at which point every parsed field is stable and readable. The FSM is verified in simulation, transition by transition, before synthesis.

**System integration.** An AXI4-Lite slave wrapper maps control, status (packet-valid and error flags), the parsed header fields, and a payload window into the ARM address space. The parser joins the Zynq block design as a memory-mapped peripheral, and a C driver on the ARM side feeds in the test vectors byte by byte and checks every field against the C++ reference.

**The measurement.** A free-running hardware cycle counter timestamps the first byte in and the packet-valid strobe out, giving a cycle-accurate parse latency. The same packets then run through the software parser on the ARM core, and the final deliverable is that comparison — a concrete number for what moving a parsing workload into hardware actually buys.

## Why This Project

The FPGA systems that matter most commercially — market data feeds, order execution, network security appliances — are network-driven. My earlier FPGA projects were compute-shaped: an image filter and a processor that each own their data. A parser is stream-shaped — bytes arrive on the wire's schedule, not the design's, and the hardware has to keep up, flag malformed input, and re-arm for the next packet immediately. That is a different discipline, and it is the one networked hardware runs on.

## Status

In development as of summer 2026. The hardware and software halves are being built against the shared test vectors, with the end-to-end latency comparison as the final milestone.
