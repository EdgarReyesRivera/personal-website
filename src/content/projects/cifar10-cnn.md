---
title: 'CIFAR-10 CNN Design and Ablation Study'
description: 'A ten-layer convolutional network for CIFAR-10 designed through twelve controlled experiments, reaching 92.2% test accuracy — nearly 17 points over the course baseline.'
status: 'Completed'
pubDate: 2026-05-09
tags: ['Python', 'PyTorch', 'Deep Learning', 'Machine Learning', 'Computer Vision']
featured: false
---

## Overview

For my deep learning course final, a partner and I redesigned a convolutional network for CIFAR-10 image classification under a hard constraint: at most ten convolutional and fully-connected layers. The course baseline — an eight-layer network built around large 11×11 and 7×7 kernels — topped out at 75.5% test accuracy. Rather than guessing at improvements, we treated the redesign as an experiment: twelve controlled runs, each changing exactly one variable, decided what earned a place in the final model. The result reaches 92.2%, a gain of nearly 17 percentage points.

## How It Works

The final architecture is VGG-style: four blocks of paired 3×3 convolutions, with batch normalization and GELU activation after every convolution, channel width doubling from 32 to 256 as max-pooling halves the spatial resolution. Two stacked 3×3 convolutions cover the same receptive field as a single 5×5 with fewer parameters and an extra non-linearity, which is what lets ten layers outperform the baseline's large kernels. Global average pooling replaces a flattened fully-connected bottleneck, feeding a dropout-regularized two-layer classifier — exactly ten counted layers, 1.24 million parameters.

Training matters as much as architecture: SGD with momentum at a high initial learning rate of 0.1, cosine-annealed over 100 epochs, plus label smoothing and augmentation with random crops, flips, color jitter, and random erasing.

## Technical Challenges

The hard part was deciding what to keep, because short ablations can mislead. Each experiment ran 30 epochs to stay affordable, but strong regularizers look bad at that horizon — random erasing and color jitter scored neutral-to-negative there, yet earn their keep across the full 100-epoch schedule. Weighing those short-run signals against how each technique behaves over longer training was the core judgment call of the project.

## Results

The final model's best test accuracy is 92.21%, against the baseline's 75.53%. Per-class results follow the usual CIFAR-10 pattern: distinctive-silhouette vehicle classes score highest (automobile at 96.5%), while cat and dog trail — fine-grained texture classes that are hard to separate at 32×32 resolution. The ablations were as informative as the final number: removing batch normalization cost 6.1 points, by far the largest drop, while adding residual skip connections actually hurt slightly — techniques built for very deep networks don't automatically transfer to an eight-convolution stack.

## Future Work

The natural extensions are the ones the layer cap ruled out: a properly residual design at greater depth, plus stronger augmentation strategies like mixup that the experiment budget didn't cover.
