---
title: 'CUDA-Accelerated Image Processing & Deep Learning Pipeline'
description: 'Custom CUDA image processing kernels integrated with PyTorch C++ Extensions, powering an end-to-end CNN inference pipeline for image classification.'
status: 'In-Progress'
tags: ['CUDA', 'PyTorch', 'Python', 'C++', 'Deep Learning', 'Computer Vision', 'GPU Computing', 'Image Processing']
# heroImage: '../../assets/project_images/cuda-vision-pipeline.png'
# githubUrl: 'https://github.com/EdgarReyesRivera/CUDA-Vision-Pipeline'
featured: false
---

## Project Overview

This project bridges my background in hardware design with modern deep learning by building a computer vision pipeline from the ground up — starting at the CUDA kernel level and working up to a trained CNN classifier.

The core idea is to write custom image processing kernels in CUDA (grayscale conversion, Gaussian blur, Sobel edge detection, and histogram equalization), bind them into Python using PyTorch's C++ Extension API, and then use those kernels as the preprocessing stage for a trained image classification model.

## What I'm Building

**Custom CUDA Kernels**

Each kernel is written in CUDA C++ and optimized for the GPU memory hierarchy. The Gaussian blur kernel uses shared memory tiling to reduce global memory accesses — loading a tile of the image into fast on-chip shared memory so threads can reuse data without going back to global memory on every read. The kernels are compiled and exposed to Python as native `torch.Tensor` operations via a `setup.py` build.

**Deep Learning Pipeline**

On top of the preprocessing kernels, I'm training a convolutional neural network for image classification. The preprocessing and inference run end-to-end: a raw image goes in, my CUDA kernels prepare it, and the model returns a prediction with confidence. All experiments are documented in a Jupyter notebook with training curves, sample predictions, and performance comparisons.

**Performance Analysis**

A key deliverable is a quantitative comparison between three configurations: CPU-only processing with OpenCV, standard PyTorch GPU ops, and my custom CUDA kernels. I'll profile using PyTorch Profiler and NVIDIA Nsight Systems to identify bottlenecks and explain the performance differences.

## Technical Stack

- **CUDA C++** for custom kernel implementation
- **PyTorch C++ Extension API** (`torch.utils.cpp_extension`) for Python integration
- **Python / Jupyter** for training, experiments, and visualization
- **NVIDIA Nsight Systems** for profiling

## Current Status

In progress. Kernel foundations are being implemented and tested.
