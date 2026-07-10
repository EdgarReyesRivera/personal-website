---
title: 'FPGA-Based Gaussian Blur Image Processing'
description: 'A hardware Gaussian blur filter in Verilog on a DE1-SoC FPGA — a custom state machine convolves a 160x120 image with a 3x3 kernel and drives a VGA display.'
status: 'Completed'
pubDate: 2024-12-13
tags: ['Verilog', 'FPGA', 'Digital Circuit Design', 'Image Processing', 'Quartus']
heroImage: '../../assets/project_images/gaussian-blur-final.png'
githubUrl: 'https://github.com/EdgarReyesRivera/Gaussian-Blur'
featured: true
---

## Overview

I built a Gaussian blur filter entirely in hardware on a DE1-SoC board's Cyclone V FPGA. A 160x120 24-bit color image lives in on-chip block RAM, a custom Verilog state machine convolves it with a 3x3 Gaussian kernel, and the result is displayed on a 640x480 VGA monitor at 60Hz. There is no CPU in the loop — the convolution, memory management, and VGA signal generation are all digital logic I described in Verilog and synthesized with Quartus. A full blur pass over the frame completes in about 4.5 milliseconds at the 50MHz system clock.

## System Architecture

The design is four Verilog modules with clear responsibilities:

* **`gaussian_processor.v`** — the core. A state machine walks the image pixel by pixel; for each one it fetches the 3x3 neighborhood from frame memory (one read per clock), computes the weighted average for each color channel, and writes the result back.
* **`vga_frame.v`** — the frame memory, built on Altera's on-chip RAM megafunction. It stores 24-bit pixels and is initialized with the source image from a `.mif` file when the FPGA is configured.
* **`vga_driver.v`** — generates 640x480 VGA timing (hsync, vsync, blanking) at 60Hz, with the 25MHz pixel clock derived from the 50MHz system clock by clock division.
* **`gaussian_blur_top.v`** — the top level, which arbitrates frame memory between the display path and the processor and turns debounced button presses into control signals.

The image is a quarter of the display resolution in each dimension, so scaling up is done in the addressing itself: the display path drops the low two bits of the screen coordinates, and each image pixel fills a 4x4 block on screen at no extra memory or logic cost.

## Technical Challenges

**Sharing one memory between two consumers.** The VGA scan-out reads the frame continuously, and the blur pass needs both read and write access to the same memory. I resolved this with an ownership multiplexer: while a blur is running, the processor owns the frame RAM's address and data ports, and control returns to the display path when it finishes.

**Convolution without dividers or multipliers worth the name.** The kernel is the classic binomial approximation of a Gaussian:

```
| 1 2 1 |
| 2 4 2 |  / 16
| 1 2 1 |
```

The weights are small powers-of-two-friendly integers and sum to exactly 16, so each channel accumulates into a 12-bit sum and the normalization is just taking the top 8 bits — a wire slice, no divider circuit at all.

**Pipelining the window reads.** The block RAM returns data one clock after the address is presented, so the state machine issues the nine neighborhood addresses back to back and captures each pixel one cycle behind, filling the 3x3 window in ten clocks instead of stalling on every read.

**Boundary handling.** The filter processes interior pixels only, leaving the one-pixel border untouched — the datapath stays uniform, with no edge-case logic inside the convolution.

## Results

Each pixel takes twelve clock cycles (ten window reads, one compute, one write-back), so the roughly 18,600 interior pixels finish in about 224,000 cycles — around 4.5ms at 50MHz, far faster than a frame is drawn. On the board, KEY[1] triggers a blur pass, and KEY[0] resets the control logic; because the filter runs in place on the frame memory, repeated passes compound the blur, which makes the effect easy to see live on the monitor.

## Future Work

A line-buffer architecture could cut memory traffic from nine reads per pixel to one by caching the previous two rows, and the same framework would support other 3x3 kernels — edge detection or sharpening — selected at runtime.
