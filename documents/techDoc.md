# Maintenance Engineer Assist Platform (MEAP)

## Overview
The **Maintenance Engineer Assist Platform (MEAP)** is a role-aware full-stack application tailored for industrial environments. It supports maintenance engineers, electrical/instrumentation technicians, and mechanics in monitoring, troubleshooting, and optimizing equipment performance.

The platform connects securely to a simulated OPC UA server to retrieve real-time industrial data. It also supports historical analytics, equipment profile management, and fault logging/resolution workflows.

---

## 📁 Table of Contents

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
- [8. Decision Summary](#8-decision-summary)
- [9. Edge Client Requirements (MacBook #1)](#9-edge-client-requirements-macbook-1)
- [10. Cloud Infrastructure](#10-cloud-infrastructure)
- [11. Next Steps](#11-next-steps)

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
- JWT authentication using email/password
- Role-based access: `engineer`, `technician`
- Role-specific dashboards and permissions

### 2.2 Dashboard
- Personalized welcome message
- KPI cards:
  - MTBF (Mean Time Between Failures)
  - MTTR (Mean Time to Repair)
  - Uptime %
  - Open Work Orders
- Live sensor data and equipment health

### 2.3 Equipment Monitoring
- Live readings from sensors (temperature, flow rate, vibration, etc.)
- Historical readings over user-defined date ranges

### 2.4 Fault Logging
- Submit fault reports with type, severity, and notes
- View and resolve faults within the UI
- Future logic: auto-log faults from anomalous sensor data

### 2.5 User Profile Page
- View stats for own or other users by username
- Future updates: profile editing and password change

---

## 3. Backend Details

### 3.1 Models
- **User**: email, username, hashed password, role
- **EquipmentProfile**: type, location, install date, tags
- **LiveReading / HistoricalReading**: metrics + timestamps
- **EquipmentFault**: type, severity, notes, resolved flag

### 3.2 GraphQL API
- **Queries**:
  - `me`
  - `equipmentProfiles`
  - `liveReadings(equipmentId: String!)`
  - `historicalReadings(equipmentId: String!, from: String!, to: String!)`
  - `equipmentFaults(equipmentId: String!)`
- **Mutations**:
  - `addUser(input: UserInput!)`
  - `login(email: String!, password: String!)`
  - `addEquipmentFault(input: FaultInput!)`
  - `resolveFault(faultId: ID!)`

---

## 4. Simulator Integration

### 4.1 Prosys OPC UA Simulation Server
- macOS-compatible and secure transport
- Simulated equipment includes:
  - Pump
  - Conveyor
  - Checkweigher
  - Bagger
  - Robotic Palletizer

### 4.2 Integration Strategy
- Node.js `node-opcua` connects to `opc.tcp://localhost:53530/OPCUA/SimulationServer`
- Reads tag values like temperature, motorStatus, flowRate, vibration
- Stores readings in MongoDB using Mongoose
- Runs polling loop every 5 seconds

---

## 5. Deployment

### 5.1 Scripts
```bash
npm run install         # Install dependencies
npm run start:dev       # Start dev mode
npm run build           # Build the project
npm run seed            # Seed DB with test data
```

### 5.2 Environments
- `.env` holds:
  - MongoDB connection string (Atlas)
  - JWT secrets
- Hosting:
  - Backend: Render
  - Frontend: Render or Netlify
  - Database: MongoDB Atlas (IP allow-list enabled)

---

## 6. Roadmap & Future Features
- Real-time WebSocket integration
- Equipment health scoring
- Predictive fault detection
- Avatar/profile image upload
- Equipment documentation and images
- Work order and maintenance log tracking
- Notification system (email/SMS)
- Export data to CSV/PDF

---

## 7. Credits
- Created by **Eddy Howell** for **Capstone Bootcamp (2025)**
- GitHub: [howellea](https://github.com/howellea)
- Repository: [MEAP](https://github.com/howellea/MEAP)
- Tools:
  - [Prosys OPC UA](https://www.prosysopc.com/products/opc-ua-simulation-server/)
  - [Node-OPCUA](https://github.com/node-opcua/node-opcua)
  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  - [Render](https://render.com)

---

## 8. Decision Summary
- **MacBook #1** acts as the **edge client**, hosting the OPC UA simulator and client
- Client reads data and sends it to **MongoDB Atlas**
- Backend and frontend hosted separately via Render

---

## 9. Edge Client Requirements (MacBook #1)

### Software & Tools:
1. Node.js installed
2. Folder: `opcua-edge-client/`
   - Contains:
     - `index.ts` (main script)
     - `services/opcClient.ts` (OPC UA logic)
     - `config/db.ts` (MongoDB connection)
     - `models/Reading.ts`
     - `.env` with `MONGO_URI`
3. MongoDB Atlas cluster created
   - IP allow-listed
4. Prosys OPC UA Server running
5. Launch polling loop:
```bash
cd ~/path/to/opcua-edge-client
node dist/index.js  # or ts-node src/index.ts
```
6. Testing:
   - Console shows readings
   - MongoDB receives new entries

---

## 10. Cloud Infrastructure

### Backend (Render):
- Folder: `meap_server/`
- Apollo GraphQL handles auth and data access
- Secure `.env` file with DB and JWT settings

### Frontend (Render or Netlify):
- Folder: `client/`
- Built with React + Vite + TypeScript
- Deployed as static site with public access

---

## 11. Next Steps
- [ ] Finalize `opcua-edge-client/` repo structure
- [ ] Confirm `.env` and DB access
- [ ] Build and launch `index.ts`
- [ ] Verify MongoDB receives data
- [ ] Log in to MEAP app and view readings

