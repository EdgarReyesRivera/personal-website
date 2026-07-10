---
title: 'Obstacle-Avoiding Arduino Robot'
description: 'An IR-remote-controlled differential-drive robot that holds a straight line with encoder feedback and steers itself around obstacles using a servo-mounted ultrasonic sensor.'
status: 'Completed'
pubDate: 2026-04-14
tags: ['Arduino', 'C++', 'Embedded Systems', 'Robotics', 'Control Systems']
featured: false
---

## Overview

For my robotics lab course I built a two-wheeled Arduino robot that takes drive commands from an IR remote, holds a straight line using wheel-encoder feedback, and gets itself around obstacles on its own. It came together across five lab milestones, each layering a new capability onto the same chassis, with a 16×2 LCD reporting live distance and drive status.

## How It Works

A three-state machine — stop, forward, backward — sits at the core of the sketch, switched by NEC-decoded IR remote buttons. The two drive motors run through an H-bridge with PWM speed control, and each wheel carries an encoder wired to a hardware interrupt.

Two motors given the same PWM value never spin at quite the same rate, so a proportional controller compares the wheels' accumulated tick counts each loop and trims both PWM outputs in opposite directions, steering the error back toward zero.

While driving forward the robot continuously pings a servo-mounted ultrasonic sensor. Within four inches of an obstacle it stops, sweeps the sensor right and left to measure the clearance on each side, and executes an encoder-counted 90-degree pivot toward the more open path before resuming.

## Technical Challenges

The trickiest constraint was a timer conflict: the standard Arduino Servo library takes over the timer that generates PWM on pins 9 and 10 — exactly the two motor speed pins. I replaced the library with a minimal servo driver that generates the 50 Hz pulse train directly, masking interrupts for the microseconds each pulse is high so the encoder and IR interrupt handlers can't stretch it. The counts those handlers maintain are likewise read atomically before the controller uses them.

## Results

The finished robot meets all of the course's lab requirements: it responds to remote commands, visibly self-corrects its heading instead of drifting, and completes the full sense-decide-turn evasion sequence without intervention.

## Future Work

The evasion routine only scans after it has already stopped; sweeping the servo continuously while driving would let the robot steer around obstacles smoothly, and upgrading the proportional controller to full PID would tighten the straight-line tracking further.
