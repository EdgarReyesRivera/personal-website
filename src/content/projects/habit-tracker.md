---
title: 'Focus & Habit Dashboard'
description: 'Full-stack productivity web application with Firebase sync, enabling habit tracking, task management, and focus timer across devices.'
status: 'Completed'
pubDate: 2025-12-28
tags: ['React', 'Firebase', 'JavaScript', 'Tailwind CSS', 'Full-Stack', 'Web Development', 'Cloud Sync', 'PWA']
# heroImage: '../../assets/project_images/habit-tracker-dashboard.png'
githubUrl: 'https://github.com/EdgarReyesRivera/habit-tracker'
# liveUrl: 'https://habits.reyesrivera.dev'
featured: true
---

## Overview
**[🔗 Live Demo](https://habits.reyesrivera.dev)**

Focus & Habit Dashboard is a comprehensive productivity application I built to address a personal need: maintaining consistent habits while balancing academic and personal projects. Rather than using existing habit trackers with unnecessary features or subscription models, I designed a system optimized for my workflow with the exact feature set I needed.

The application runs entirely in the browser with no backend server, leveraging Firebase for authentication and real-time data synchronization. This architecture choice allows the app to work offline while seamlessly syncing across my desktop, laptop, and phone when connectivity is restored.

## Technical Architecture

### Frontend Stack
* **React 18**: Functional components with hooks for state management
* **Tailwind CSS**: Utility-first styling with custom dark mode implementation
* **Vanilla JavaScript**: No build step required—runs directly in the browser using ES6 modules
* **localStorage**: Client-side persistence for offline-first functionality

### Backend Services
* **Firebase Authentication**: Google OAuth integration for secure, passwordless login
* **Cloud Firestore**: Real-time NoSQL database with automatic synchronization
* **Firebase Security Rules**: Domain-restricted API access preventing unauthorized usage

### Key Features Implemented

#### 1. Habit Tracking System
* **Flexible Scheduling**: Categorize habits by time of day (Morning, Evening, School, Work, Personal, Health)
* **Priority System**: Three-tier priority (Normal, High, Critical) with visual indicators and point multipliers
* **Emergency Passes**: Limited "skip" tokens (3 per cycle) for unavoidable circumstances
* **Historical Tracking**: Date-based completion records stored in nested object structure

#### 2. Task Management
* **Priority Matrix**: Four-level system (A, B, C, D) with visual differentiation
* **Due Date Tracking**: Real-time countdown display with color-coded urgency
  - Red blinking: Less than 1 hour remaining
  - Orange: Less than 24 hours
  - Blue: More than 1 day
* **Categorization**: Tasks organized by the same categories as habits for workflow coherence
* **Completion Archiving**: Completed tasks remain accessible but visually separated

#### 3. Focus Timer (Custom Pomodoro)
* **Precision Timestamp Math**: Uses `Date.now()` for drift-free timing instead of interval accumulation
* **Break Banking**: Unused break time accumulates for later use (preventing the "I'll skip my break" trap)
* **20% Rule**: Break duration automatically calculated as 20% of work session plus any banked time
* **Audio & Visual Notifications**: Browser notifications and sound alerts when timers complete

#### 4. Rewards System
* **Points Economy**: Earn points by completing habits, spend on custom rewards
* **User-Defined Rewards**: Create personal incentives with custom point costs
* **Delayed Gratification**: Encourages consistent habit completion to "afford" rewards

#### 5. Cross-Device Synchronization
* **Real-Time Updates**: Firestore listeners automatically reflect changes across all devices
* **Conflict Resolution**: Last-write-wins strategy with timestamp tracking
* **Offline Support**: Full functionality without internet, syncs when reconnected
* **Migration Support**: Seamless transition from localStorage to cloud storage on first login

## Technical Challenges & Solutions

### Challenge 1: Timer Drift
**Problem**: Using `setInterval` with a 1-second delay accumulates error over time. After 30 minutes, the timer could be off by several seconds.

**Solution**: Store the session start timestamp and calculate elapsed time using `Date.now() - startTime`. The interval only updates the UI—the math is always precise.

```javascript
// Timestamp-based approach (accurate)
const startTimeRef = useRef(Date.now());
const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
setWorkTime(initialTime + elapsed);
```

### Challenge 2: Timezone-Independent Date Tracking
**Problem**: JavaScript's `Date.toISOString()` returns UTC, which can cause habits to appear on the wrong day depending on timezone.

**Solution**: Generate date strings using local timezone components:
```javascript
const getLocalDate = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
```

### Challenge 3: Syncing State Between localStorage and Cloud
**Problem**: Users should be able to use the app offline, then login later without losing data.

**Solution**: Implement a bidirectional sync pattern:
1. On startup, check for authenticated user
2. If logged in, listen to Firestore and update local state
3. If offline, load from localStorage
4. On every state change, write to both localStorage AND Firestore (if authenticated)
5. When logging in for the first time, migrate localStorage data to cloud

### Challenge 4: Responsive Dark Mode
**Problem**: Users expect dark mode to persist across sessions and sync across devices.

**Solution**: Store dark mode preference in localStorage for immediate application, and include it in the Firestore document so it syncs. Apply the class to `document.documentElement` for Tailwind's dark mode selectors to work:
```javascript
useEffect(() => {
  if (darkMode) document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
}, [darkMode]);
```

## Performance Optimizations

1. **Debounced Firestore Writes**: Rather than writing to Firestore on every keystroke, state updates batch within the React render cycle
2. **Selective Re-renders**: Used React's dependency arrays to prevent unnecessary component updates
3. **Lazy Loading**: Modal components only render when opened
4. **Efficient Data Structure**: History object uses date strings as keys for O(1) lookups instead of array iteration

## User Experience Design Decisions

### Why No Build Process?
Using React via CDN and ES6 modules means:
- Zero configuration
- Instant deployment (just push HTML file)
- No `node_modules` bloat
- Easy to inspect and debug in browser DevTools

The trade-off is a larger initial bundle, but for a single-page app used primarily by one person, the simplicity outweighs the optimization benefits of webpack/Vite.

### Why Firebase Instead of a Custom Backend?
- **Zero Server Maintenance**: No need to manage databases, handle scaling, or pay for hosting
- **Built-in Authentication**: Google OAuth works out of the box
- **Real-Time Sync**: WebSocket connections are handled automatically
- **Free Tier**: More than sufficient for personal use

### Why Pomodoro with Banking?
Traditional Pomodoro enforces rigid 25/5 intervals. My system:
- Allows variable work session lengths (focus until natural break point)
- Banks unused break time to prevent "break guilt"
- Calculates break duration as a percentage of work time (fairer for long vs short sessions)

## Deployment & Security

The application is deployed as a static site with Firebase security rules configured to only accept requests from my domain. The API keys are client-side (necessary for Firebase) but domain-restricted, preventing unauthorized usage even if someone extracts the keys from the source code.

**Security Rules Example**:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Metrics & Usage

Since deploying for personal use:
- **Daily Active Use**: Used every day for a week
- **Data Integrity**: Zero data loss incidents across multiple devices
- **Sync Reliability**: Sub-second synchronization when both devices online
- **Offline Resilience**: Full functionality with degraded network conditions

## Future Enhancements

Potential features for version 2:
* **Habit Streaks**: Visual indicators for consecutive completions
* **Analytics Dashboard**: Charts showing habit completion trends over time
* **Recurring Tasks**: Automatically generate tasks on a schedule
* **Notification Scheduling**: System reminders for time-specific habits
* **Export Functionality**: Download habit history as CSV for external analysis
* **Mobile App**: Native iOS/Android version using React Native with shared business logic

## Key Takeaways

This project taught me valuable lessons about production web development:

1. **User-Centric Design**: Building for a real user (myself) forced honest evaluation of feature utility
2. **Simplicity as a Feature**: Not every project needs a complex build pipeline or microservices architecture
3. **State Management Trade-offs**: For this scale, React hooks + Firebase is simpler than Redux or MobX
4. **Offline-First Matters**: Even with reliable internet, offline support improves user experience significantly
5. **Dogfooding Works**: Using your own product reveals bugs and UX issues faster than any testing framework

## Technical Skills Demonstrated

- React functional components and hooks (useState, useEffect, useRef)
- Firebase Authentication and Firestore integration
- Real-time data synchronization and conflict resolution
- Browser API usage (Notifications, localStorage, Audio Context)
- Responsive design with Tailwind utility classes
- Timestamp-based timing for precision
- Client-side state management patterns
- Progressive Web App concepts (offline-first architecture)