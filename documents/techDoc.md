Absolutely! Here's your complete `techDoc.md` with the **linked Table of Contents** and all sections cleanly organized:

---

# Maintenance Engineer Assist Platform (MEAP)

## Overview
The **Maintenance Engineer Assist Platform (MEAP)** is a role-aware full-stack application tailored for industrial environments to help maintenance engineers, technicians (electrical, instrumentation), and mechanics monitor, troubleshoot, and optimize equipment performance.

The platform connects to a simulated OPC UA server for secure, real-time industrial data and supports historical analytics, equipment profile management, and fault logging/resolution workflows.

---

## 📑 Table of Contents

- [Overview](#overview)
- [1. System Architecture](#1-system-architecture)
  - [1.1 Technologies Used](#11-technologies-used)
  - [1.2 Directory Structure](#12-directory-structure)
- [2. Core Features](#2-core-features)
  - [2.1 Authentication & Roles](#21-authentication--roles)
  - [2.2 Dashboard](#22-dashboard)
  - [2.3 Equipment Monitoring](#23-equipment-monitoring)
  - [2.4 Fault Logging](#24-fault-logging)
  - [2.5 User Profile Page](#25-user-profile-page)
- [3. Backend Details](#3-backend-details)
  - [3.1 Models](#31-models)
  - [3.2 GraphQL API](#32-graphql-api)
- [4. Simulator Integration](#4-simulator-integration)
  - [4.1 Prosys OPC UA Simulation Server](#41-prosys-opc-ua-simulation-server)
  - [4.2 Integration Strategy](#42-integration-strategy)
- [5. Deployment](#5-deployment)
  - [5.1 Scripts](#51-scripts)
  - [5.2 Environments](#52-environments)
- [6. Roadmap & Future Features](#6-roadmap--future-features)
- [7. Credits](#7-credits)

---

## 1. System Architecture

### 1.1 Technologies Used
- **Frontend:** React (Vite), TypeScript, Tailwind CSS (if used)
- **Backend:** Node.js, Express, Apollo Server (GraphQL)
- **Database:** MongoDB + Mongoose (Atlas Cloud or local)
- **Auth:** JWT-based authentication, bcrypt for password hashing
- **Simulation:** Prosys OPC UA Simulation Server

### 1.2 Directory Structure
```
Capstone-MEAP/
├── client/                → React frontend
│   ├── components/        → UI components (Header, Footer, etc.)
│   ├── pages/             → Login, Signup, Dashboard, Profile
│   ├── interfaces/        → Shared TypeScript interfaces
│   └── utils/             → GraphQL queries/mutations, auth helpers
├── meap_server/           → Express + Apollo backend
│   ├── models/            → Mongoose schemas (User, Equipment, Readings, Faults)
│   ├── schemas/           → GraphQL typeDefs and resolvers
│   ├── config/            → MongoDB connection
│   ├── utils/             → JWT, auth middleware
│   └── seeds/             → DB seeding scripts
├── package.json           → Root project scripts
└── .env                   → Secure environment configuration
```

---

## 2. Core Features

### 2.1 Authentication & Roles
- Users authenticate with email/password
- JWTs issued upon login, stored in localStorage
- Two roles supported: `engineer`, `technician`
- Role-based UI rendering and access control

### 2.2 Dashboard
- Welcome message based on user profile
- KPI cards:
  - MTBF (Mean Time Between Failures)
  - MTTR (Mean Time to Repair)
  - Uptime %
  - Open Work Orders
- Equipment health and sensor data sections

### 2.3 Equipment Monitoring
- **Live Readings**: Recent data from sensors (temp, flow, vibration, etc.)
- **Historical Readings**: Trends over user-defined time ranges

### 2.4 Fault Logging
- Engineers/Techs can submit fault reports
- Faults tagged by type, severity, and notes
- Faults can be resolved via UI

### 2.5 User Profile Page
- View own stats or another user’s by username
- Add/Edit profile info (in future update)
- Change password (planned)

---

## 3. Backend Details

### 3.1 Models
- **User**: email, username, hashed password, role
- **EquipmentProfile**: type, location, install date, tags
- **LiveReading** / **HistoricalReading**: metrics + timestamps
- **EquipmentFault**: type, severity, notes, resolved flag

### 3.2 GraphQL API
- **Queries:**
  - `me`
  - `equipmentProfiles`
  - `liveReadings(equipmentId: String!)`
  - `historicalReadings(equipmentId: String!, from: String!, to: String!)`
  - `equipmentFaults(equipmentId: String!)`
- **Mutations:**
  - `addUser(input: UserInput!)`
  - `login(email: String!, password: String!)`
  - `addEquipmentFault(input: FaultInput!)`
  - `resolveFault(faultId: ID!)`

---

## 4. Simulator Integration

### 4.1 Prosys OPC UA Simulation Server
- Chosen for macOS compatibility and secure transport
- Simulates equipment:
  - Pump
  - Conveyor
  - Checkweigher
  - Bagger
  - Robotic Palletizer

### 4.2 Integration Strategy
- Use `node-opcua` to connect to `opc.tcp://localhost:53530/OPCUA/SimulationServer`
- Read selected tag values (temperature, motorStatus, flowRate, vibration)
- Save data to MongoDB as live readings using Mongoose
- Use a scheduled polling loop (e.g., every 5 seconds)
- Optional future logic to auto-log faults from abnormal readings

---

## 5. Deployment

### 5.1 Scripts
```bash
npm run install         # Installs server and client deps
npm run start:dev       # Dev mode (server + client concurrently)
npm run build           # Full build
npm run seed            # Seed DB with test data
```

### 5.2 Environments
- `.env` file used for storing:
  - MongoDB connection string (Atlas)
  - JWT secret keys
- Render (or Railway) used for backend hosting
- MongoDB Atlas with IP allow-listing for simulator security

---

## 6. Roadmap & Future Features
- Real-time WebSocket integration
- Equipment health scores
- Predictive fault alerts
- User avatars and profile editing
- Upload equipment images or documents
- Maintenance logs and work order tracking
- Notification system (email/SMS)
- Export readings to CSV/PDF

---

## 7. Credits
- Created by **Eddy Howell** for **Capstone Bootcamp (2025)**
- Simulated using [Prosys OPC UA Simulation Server](https://www.prosysopc.com)

---

Let me know if you’d like to add diagrams, screenshots, or API response examples next!