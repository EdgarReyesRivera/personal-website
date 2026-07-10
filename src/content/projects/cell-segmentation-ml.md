---
title: 'Cell Segmentation with Classical Machine Learning'
description: 'A per-pixel segmentation pipeline for fluorescence microscopy that compares four classical classifiers on the Cell Tracking Challenge — and finds that feature engineering, not model complexity, drives accuracy.'
status: 'Completed'
pubDate: 2026-04-27
tags: ['Python', 'scikit-learn', 'Machine Learning', 'Computer Vision', 'Image Processing', 'Feature Engineering']
featured: false
---

## Overview

I built a segmentation pipeline that identifies individual cells in fluorescence microscopy images using classical machine learning, then used it to answer a comparison question: when the features are good, does a more complex classifier actually help? Working with the Fluo-N2DH-GOWT1 sequence from the Cell Tracking Challenge — GFP-expressing mouse stem cells imaged in 2D — I implemented and compared four supervised methods for pixel-wise segmentation: logistic regression, an RBF-kernel SVM, a random forest, and gradient boosting. The answer turned out to be counterintuitive, and it says more about feature design than about the models themselves.

## How It Works

The pipeline treats segmentation as per-pixel binary classification: each pixel is labeled cell or background, and connected-component labeling then recovers individual cell instances for scoring. Every pixel is described by a 30-dimensional feature vector built from its local neighborhood. Twenty-five of those values come from a 5×5 patch of raw intensities centered on the pixel; the other five are handcrafted descriptors chosen to encode what a cell looks like — a Gaussian-blur response for smooth interiors, Sobel gradient magnitude for boundaries, a Laplacian-of-Gaussian response for blob-like centers, and the local mean and standard deviation for brightness and contrast context.

Training on full 512×512 frames would be intractable, so I sample 500 pixels per frame, balanced 250 foreground and 250 background, drawn uniformly from each class. Across the 92 training frames this yields 46,000 balanced samples. All four classifiers train on that same feature matrix, and inference re-runs the sliding-window extraction across every pixel of a validation frame before the labeling step reconstructs instances.

The train and validation splits are sequences `01` and `02` — two independent acquisitions of the same cell line, 92 frames each. Because they are separate imaging runs, no validation frame can be derived from a training frame, which makes the reported scores a fair estimate of generalization rather than memorization.

## Technical Challenges

The central design tension was cost versus expressiveness. A kernel SVM scales quadratically in the number of training samples, and gradient boosting trains its trees strictly in sequence, so both resist the parallelism that a random forest and logistic regression enjoy. Keeping the experiment honest meant holding features, sampling, and the evaluation protocol identical across all four models so that any difference in score could be attributed to the classifier alone — and then accepting the runtime that a fair comparison demands. The full train-and-evaluate sweep across all four models took roughly thirteen and a half hours, dominated by SVM training and by forest inference, which pushes every pixel of every frame through 100 trees.

## Results

Evaluated with mean Intersection-over-Union and the Cell Tracking Challenge's SEGMeasure across all 92 validation frames, the models landed close together: logistic regression led at 0.847 mean IoU, followed by the SVM at 0.837, the random forest at 0.834, and gradient boosting at 0.810. The simplest model winning is the finding. Once the handcrafted spatial features make foreground and background nearly linearly separable, the ensembles have little remaining non-linearity to exploit, and their extra capacity adds variance instead of accuracy. Feature engineering, not model choice, was the primary driver of performance.

## Future Work

The clearest next steps follow from the pipeline's two limits. Multi-scale features at larger window sizes would capture coarser cell structure that a single 5×5 patch misses, and a U-Net baseline trained on the same split would likely match or beat these scores at a fraction of the inference time by sharing spatial computation across the image rather than classifying every pixel independently.
