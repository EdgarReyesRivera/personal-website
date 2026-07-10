---
title: 'Focus & Habit Dashboard'
description: 'A habit, task, and focus-timer dashboard in a single static HTML file — offline-first, syncing across devices through Firebase, with no build step at all.'
status: 'Completed'
pubDate: 2025-12-28
tags: ['React', 'Firebase', 'JavaScript', 'Tailwind CSS', 'Web Development']
# heroImage: '../../assets/project_images/habit-tracker-dashboard.png'
githubUrl: 'https://github.com/EdgarReyesRivera/habit-tracker'
featured: false
---

## Overview

Focus & Habit Dashboard is the productivity app I use every day: habit tracking, task management, a focus timer, and a points-based reward system in one place, live at [habits.reyesrivera.dev](https://habits.reyesrivera.dev). Existing trackers bundled features I didn't need behind subscriptions I didn't want, so I built exactly the system my routine calls for. The whole application is a single static HTML file — React 18 and Tailwind loaded from CDNs, the interface composed directly from React calls — so there is no build step, no bundler, and no server of my own; deploying an update means pushing one file.

## How It Works

The app is offline-first. Habits, tasks, points, and history live in localStorage, so everything works with no account and no connection. Signing in with Google upgrades that: a Cloud Firestore listener streams my data into the app in real time, every change is written to local storage and the cloud together, and the first sign-in migrates existing local data up — which is how my desktop, laptop, and phone stay on the same state.

Habits carry a category, an optional time of day, and a priority tier that scales their point value; the dashboard groups them into morning, afternoon, and evening sections. Completed habits earn points to spend on self-defined rewards, and a small stock of emergency passes covers the days when a habit genuinely can't happen. Tasks get A-through-D priorities and a live countdown to their due dates. The focus timer inverts classic Pomodoro: sessions count up instead of down, and a break taken at any point is 20% of the work time plus whatever break time was banked earlier — unused break minutes are saved rather than lost, which removes the incentive to skip breaks entirely.

## Technical Challenges

Two correctness requirements shaped the design. A timer that adds one second per interval tick drifts, because ticks never arrive exactly on time — so the timer stores its start timestamp and recomputes elapsed time from the clock on every update, and the interval does nothing but repaint. And a habit's "day" has to be the user's day: date keys derived from UTC timestamps can file a late-evening completion under tomorrow, so history keys are built from local date components instead.

## Results

The app has been my daily driver across three devices since deployment — local storage carries it through connectivity gaps, and every device picks up changes in real time once it's back online. The single-file constraint has held: every feature added since launch still ships as one HTML file.

## Future Work

Streak tracking and a completion-trends view are the natural next features; the date-keyed history structure already stores everything they need.
