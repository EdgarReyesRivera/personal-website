---
title: 'TinyRV1 RISC-V Processor'
description: 'A single-cycle 32-bit RISC-V processor in Verilog on a DE1-SoC FPGA, with push-button single-stepping, live register inspection on the 7-segment displays, and a custom Python assembler.'
status: 'Completed'
pubDate: 2025-05-16
tags: ['Verilog', 'RISC-V', 'FPGA', 'Digital Circuit Design', 'Python']
# heroImage: '../../assets/preview.png' # TODO: Change this to a real project image
githubUrl: 'https://github.com/EdgarReyesRivera/Tiny_RISC-V_FPGA'
featured: true
---

## Overview

For my computer organization course I designed a 32-bit processor in Verilog implementing TinyRV1, an eight-instruction teaching subset of RISC-V (add, addi, mul, lw, sw, jal, jr, bne). It runs on a DE1-SoC FPGA board, executing programs from on-chip memory. What makes it more than a datapath exercise is the debug interface built around it: the processor can be slowed down or single-stepped from the board's pushbuttons while the 7-segment displays show the program counter, ALU results, or the live contents of any register. A companion Python assembler I wrote translates RISC-V assembly into the memory image the FPGA loads at configuration.

## System Architecture

The core is a single-cycle, non-pipelined design: the full datapath — fetch, decode, execute, memory access, write-back — serves one instruction at a time. Instructions come from a 1024-word block RAM initialized from a `.mif` file; a second block RAM holds data memory for loads and stores. Decode derives every control signal combinationally from the opcode and funct fields, so each signal's logic reads directly off the ISA encoding table. The register file implements all 32 registers with x0 hardwired to zero, two read ports for the datapath, and a third read port reserved for the debug display. An immediate generator handles all five RISC-V encoding formats, and the ALU needs only three operations: add for arithmetic and address generation, subtract to drive the zero flag that decides bne, and multiply for the one M-extension instruction in the subset.

A board-level wrapper turns this into something you can watch run. In continuous mode the processor is clocked at 2.5Hz, divided down from the board's 50MHz oscillator, so execution unfolds at human speed. Pressing KEY[1] switches to step mode, where each press of KEY[2] advances exactly one instruction. A switch flips the displays between an execution view (current PC and ALU result) and a register view, where five switches select any register and the displays show its contents.

## Technical Challenges

The debug clocking was the most delicate part of the design. Driving a processor clock from pushbuttons means dealing with asynchronous, mechanically noisy inputs: each key is sampled through a two-stage register chain with edge detection, so a press yields exactly one clean clock pulse, and the reset is synchronized before it reaches the core. The processor clock is simply a mux between the free-running divided clock and these single-step pulses.

The assembler was its own project. It makes two passes — collecting label addresses, then encoding — and handles all five instruction formats, including the B- and J-type immediates whose bits are scattered across the instruction word. It accepts ABI register names, pseudo-instructions like `j` and `jr`, and emits a memory initialization file with the program placed at the reset vector and the rest of the 1024-word space filled with NOPs.

## Results

I verified the processor two ways. In simulation, a ModelSim testbench monitors the write-back stage every cycle, maintains its own model of what the register file should contain, and at the end of the program reads back all 31 writable registers through the debug port and compares. On hardware, I wrote four test programs — register arithmetic, immediates including negative values, multiplication chains, and a store/load round trip — each compiled to its own FPGA bitstream with documented expected register and memory values, then checked on the board through the register-inspect display. All four programs produced the expected results in both environments.

## Future Work

The natural next step is TinyRV2, the larger subset that adds logical operations, shifts, and comparison branches — the decode structure already has room for them. After that, pipelining the datapath would turn this from an ISA exercise into a real microarchitecture project.
