---
title: 'TinyRISC-V RV1 Processor'
description: 'A single-cycle 32-bit RISC-V processor (RV1) in Verilog, supporting a subset of the RISC-V ISA.'
status: 'Completed'
pubDate: 2024-05-16
tags: ['Verilog', 'RISC-V', 'Digital Circuit Design', 'Hardware', 'Python']
# heroImage: '../../assets/preview.png' # TODO: Change this to a real project image
githubUrl: 'https://github.com/EdgarReyesRivera/Tiny_RISC-V_FPGA'
---

## Motivation

This project was the final assignment for my computer organization course, designed to solidify our understanding of digital logic and processor design. The primary goal was to design and implement a single-cycle 32-bit RISC-V processor in Verilog that could execute a basic subset of the RISC-V instruction set architecture (ISA).

## System Architecture

The RV1 is a single-cycle processor, meaning each instruction is executed in one clock cycle. The architecture consists of several key components:

* **Program Counter (PC):** Holds the address of the current instruction.
* **Instruction Memory:** Fetches the instruction from memory based on the PC.
* **Control Unit:** Decodes the instruction's opcode and generates control signals for all other components.
* **Register File:** Manages 32 general-purpose registers, handling read and write operations.
* **ALU (Arithmetic Logic Unit):** Performs arithmetic and logical operations (add, sub, and, or, slt).
* **Data Memory:** Handles load (lw) and store (sw) operations to memory.


## Technical Challenges

One of the most significant challenges was designing and verifying the control unit. Mapping each instruction's opcode and funct3/funct7 fields to the correct set of multiplexer selectors, register write-enables, and ALU operations was a complex combinatorial logic problem.

Another large challenge was trying to display the register values, memory address, and operations being done, onto the 7-segment displays built onto the fpga. All while letting the user step the memory locations for each operation, one by one, or letting it run by itself. This allowed them to stop the execution of the program whenever they wanted, and check the values in each register, but was an incredibly difficult feature to implement.

The final challenge was creating the custom assembler in Python. This required parsing RISC-V assembly mnemonics and register names, translating them into their corresponding 32-bit binary machine code, and formatting them into a `.mif` (Memory Initialization File) file that the Quartus simulator could load into the instruction memory.

## Performance Benchmarks

I implemented several test programs in RISC-V assembly, which were then converted by the Python assembler. These programs tested:

1.  **Arithmetic/Logical Ops:** A series of `addi`, `add`, `sub`, `and`, `or` instructions to verify ALU correctness.
2.  **Memory Access:** A program to `sw` (store word) a value to memory, then `lw` (load word) it back into a different register to ensure the data path to/from Data Memory was functional.
3.  **Branching:** A `beq` (branch if equal) instruction within a simple loop to verify the PC was updated correctly.

All test programs executed successfully and produced the expected values in the register file and data memory, validating the processor's design.

## Future Work

The current implementation only supports TinyRV1 instructions, I plan to revisit this project and implement the necessary instructions for TinyRV2. As well as creating a block diagram to show the system architecture, to serve as the image for this project.