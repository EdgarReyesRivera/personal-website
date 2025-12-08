---
title: 'Custom AXI4-Lite PWM Controller'
description: 'Designing a custom silicon IP Core for peripheral control, implementing the industry-standard AXI4-Lite bus protocol.'
status: 'Future'
tags: ['SystemVerilog', 'AXI4-Lite', 'CocoTB', 'Python', 'Digital Circuit Design']
---

## Overview

While toggling a GPIO pin is a standard "Hello World" for embedded systems, designing the actual hardware logic that a driver talks to is a significant step up. This project involves engineering a custom silicon IP Core that controls power to external devices (such as motors or LEDs) using Pulse Width Modulation (PWM).

## System Architecture

The core of this project is the implementation of an **AXI4-Lite Slave interface**. Unlike simple direct-register access, this requires handling a robust handshake protocol (Address Valid $\to$ Address Ready) to ensure data integrity across the bus.

* **PWM Logic:** The hardware will generate variable duty-cycle signals based on register values written by the processor.
* **SystemVerilog Assertions (SVA):** To guarantee reliability, I will embed assertions directly into the hardware code. For example, ensuring that if a Write Address arrives, a Write Response must occur within a specific number of clock cycles.

## Verification Strategy

Testing hardware on the physical chip is slow and difficult to debug. To solve this, I will use **CocoTB** (a Python-based verification framework) to simulate processor transactions. This allows me to write complex test scenarios in Python that mimic the Zynq processor writing to my hardware, verifying the logic in simulation before ever synthesizing the bitstream.