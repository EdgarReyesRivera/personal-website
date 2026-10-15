---
title: '3D Gaussian Splatting for Radar Imaging'
description: 'Senior design research extending 3D Gaussian Splatting from optical imaging to radar, evaluating candidate radar and splatting codebases on a V100 GPU cluster and building synthetic 3D ground truth, with findings reported to AFRL researchers.'
status: 'In-Progress'
tags: ['3D Gaussian Splatting', '3D Reconstruction', 'Radar', 'CUDA', 'C++', 'Python', 'PyTorch', 'GPU Computing', 'HPC', 'Slurm', 'Linux', 'Computer Vision']
# heroImage: '../../assets/project_images/radar-gaussian-splatting.png'
featured: false
---

## Overview

3D Gaussian Splatting (3DGS) reconstructs a 3D scene from a set of 2D optical images, representing it as millions of small Gaussian primitives that can be rendered quickly and optimized directly against the input views. Extending that approach from cameras to radar is an open research problem: radar measures range and reflectivity instead of color, and it sees materials very differently than a camera does. This is my senior design project at Miami University. Our team works with a graduate student and reports findings to researchers at the Air Force Research Laboratory (AFRL).

## Approach

**Evaluating what already exists.** The first deliverable is a ranked comparison of candidate radar and Gaussian splatting software, covering eight open codebases plus relevant papers without public code. Each candidate gets built and smoke-tested on Miami's Redhawk HPC cluster, which uses Slurm scheduling and Tesla V100 GPU nodes. That means building C++ and CUDA code against a pinned PyTorch/CUDA toolchain on an older CentOS base, and treating a clean failure on our hardware as a finding rather than a dead end.

**Building our own ground truth.** Measured radar data is scarce, so the second deliverable is synthetic data we control: 3D scenes with per-material labels, rendered from known camera poses. Optical 3DGS acts as the test harness. If it reconstructs our scene from our own renders, the geometry, poses, and data format are validated. Swapping optical intensity for a radar reflectivity model then leaves the sensor as the only variable that changed.

## Why This Project

Most of my work so far has been at the hardware/software boundary: processors, FPGA pipelines, and bus interfaces. This project applies that same systems discipline to a research problem. Getting research CUDA code to build and run on real, older GPU hardware takes care with the toolchain, and designing an experiment where only one variable changes at a time takes care with the method.

## Status

In development as of fall 2026. Candidate evaluation and the synthetic scene pipeline are both underway, and the ranked comparison will be presented at the end of the semester.
