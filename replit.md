# Mobile App Manager

## Overview
A responsive web application for managing mobile applications. Built with React and Vite, this app provides an intuitive interface to view, filter, and manage (install/uninstall) mobile apps.

## Current State
✅ Fully functional React application
✅ Running on Replit with proper configuration
✅ Responsive design for mobile and desktop
✅ Deployment configured

## Recent Changes
- **November 17, 2024**: Initial project setup
  - Created React + Vite application structure
  - Implemented mobile app manager with filter functionality
  - Configured Vite server for Replit environment (port 5000, host 0.0.0.0)
  - Added deployment configuration for production

## Project Architecture

### Tech Stack
- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.2
- **Language**: JavaScript (ESM)

### Project Structure
```
.
├── index.html          # Main HTML entry point
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration (host: 0.0.0.0, port: 5000)
├── src/
│   ├── main.jsx        # React entry point
│   ├── App.jsx         # Main application component
│   ├── App.css         # Application styles
│   └── index.css       # Global styles
└── README.md           # Project documentation
```

### Features
- View all mobile apps
- Filter apps by installation status (All, Installed, Not Installed)
- Install/Uninstall apps with a single click
- Responsive card-based layout
- Modern gradient design

### Development
- **Dev Server**: `npm run dev` (runs on 0.0.0.0:5000)
- **Build**: `npm run build`
- **Preview**: `npm run preview`

### Deployment
- Type: Autoscale
- Build: `npm run build`
- Run: Vite preview server

## User Preferences
None specified yet.
