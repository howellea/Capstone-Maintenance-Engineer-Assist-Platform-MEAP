# Maintenance Engineer Assist Platform (MEAP)

## Overview
The **Maintenance Engineer Assist Platform (MEAP)** is a role-aware full-stack application tailored for industrial environments. It supports maintenance engineers, electrical/instrumentation technicians, and mechanics in monitoring, troubleshooting, and optimizing equipment performance.

The platform connects securely to a simulated OPC UA server to retrieve real-time industrial data. It also supports historical analytics, equipment profile management, and fault logging/resolution workflows.

➡️ The OPC UA Edge Client that collects and sends data to MongoDB Atlas is developed and maintained in a separate repository: [MEAPEdgeClient](https://github.com/howellea/MEAPEdgeClient).

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

➡️ The Edge Client code lives in a dedicated repo: [MEAPEdgeClient](https://github.com/howellea/MEAPEdgeClient)

...
