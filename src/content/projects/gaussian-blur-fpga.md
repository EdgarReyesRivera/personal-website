---
title: 'FPGA-Based Gaussian Blur Image Processing'
description: 'Engineered a Gaussian blur filter on a Cyclone V SOC FPGA using Verilog, processing a 160x120 image through a 3x3 kernel.'
status: 'Completed'
pubDate: 2024-12-13
tags: ['Verilog', 'FPGA', 'Digital Circuit Design', 'Image Processing', 'Quartus']
heroImage: '../../assets/project_images/gaussian-blur-final.png'
githubUrl: 'https://github.com/EdgarReyesRivera/Gaussian-Blur'
---

## Overview

This project implements a Gaussian blur filter on a Cyclone V SoC FPGA using Verilog. The system is designed to process a single 160x120 image, apply a 3x3 Gaussian kernel, and display the blurred result on a 640x480 VGA display. It leverages efficient memory management and the parallel processing capabilities of the FPGA to process an entire frame in approximately 16ms.

## System Architecture

The hardware design consists of several key Verilog modules:

* **`gaussian_processor.v`**: The core of the project. This module implements a 3x3 sliding window, performs the weighted average calculations for the blur, and manages the pixel processing state machine.
* **`vga_driver.v`**: A VGA display controller that generates the necessary horizontal and vertical sync signals (hsync/vsync) for a 640x480 resolution at 60Hz. It also handles scaling the 160x120 processed image up to the 640x480 display.
* **`vga_frame.v`**: Implements the frame buffer memory using Altera's RAM IP core. It provides dual-port access for simultaneous read/write operations, which is crucial for double buffering.
* **`gaussian_blur_top.v`**: The top-level system controller that coordinates all modules, handles user input from the physical keys, and orchestrates the overall processing flow.
* **`debounce.v`**: A simple utility module to clean up the signals from the physical buttons, preventing a single press from being registered multiple times.

## Technical Challenges

A primary challenge was the implementation of the 3x3 sliding window and the fixed-point arithmetic for the kernel weights. The 3x3 kernel required careful management of memory addresses to fetch the 8 neighboring pixels for each central pixel being processed.

The 3x3 Gaussian kernel used was:
```
| 1 2 1 |
| 2 4 2 | / 16
| 1 2 1 |
```

The development process involved several stages of debugging, which were visible on the VGA output. Early versions showed issues such as:
* Diagonal line patterns
* Visible banding artifacts
* Incorrect color channel calculations (resulting in green/blue-tinted images)

These issues were resolved by refining the state machine timing, correcting the fixed-point arithmetic, and ensuring proper synchronization between the processor and the memory buffers.

## Results

The final implementation successfully processes the input image and displays the blurred result. The system operates based on user input:

1.  **KEY[1]**: Starts the Gaussian blur calculation, which processes the entire image and stores it in the back buffer.
2.  **KEY[0]**: Swaps the frame buffers, displaying the newly blurred image on the VGA monitor.

This process can be repeated, allowing the user to apply the blur filter multiple times to see the cumulative effect. The 16ms processing time per frame demonstrates the efficiency of the hardware-based approach.

## Future Work

Potential enhancements for this project include:
* Making the Gaussian kernel size configurable.
* Allowing for multiple blur passes to be run with a single button press.
* Implementing other image processing effects, such as edge detection, using the same framework.