# MEAP

**Maintenance Engineer Assist Platform (MEAP)**  
Simulated Industrial Monitoring Dashboard for Smart Maintenance Teams

Useful links:  
- **Live App**: _coming soon_  
- **GitHub Repo**: [MEAP Capstone](https://github.com/howellea/MEAP)  
- **📄 Technical Documentation**: [techDoc.md](../../Documents/techDoc.md)

---

## Description

This project is a **full-stack industrial maintenance dashboard** built with **React**, **Node.js**, **GraphQL**, and a secure **MongoDB Atlas** backend. It simulates real-time plant data using an OPC UA server and delivers actionable insights to maintenance engineers and technicians.

- **Motivation**: Bring real-time equipment insights to maintenance teams using secure and modern web technologies.  
- **Reason**: Modern manufacturing environments generate data—this tool ensures maintenance personnel can see, understand, and act on that data quickly.  
- **Problem Solved**: MEAP connects industrial sensor data (simulated via OPC UA) to the cloud and presents it in a user-friendly dashboard.  
- **What I Learned**: Built a full industrial data pipeline using OPC UA, practiced secure data transport, GraphQL integration, and role-based frontend UX.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Tests](#tests)
- [Credits](#credits)
- [Questions](#questions)

---

## Installation

To install and run the project locally, follow these steps:

1. Clone the repository:  
   ```bash
   git clone https://github.com/howellea/MEAP.git
   ```
2. Navigate to the root directory:  
   ```bash
   cd MEAP
   ```
3. Install server and client dependencies:  
   ```bash
   npm run install
   ```
4. Start development mode (both server + client):  
   ```bash
   npm run start:dev
   ```

---

## Usage

After starting the development server, open your browser and navigate to:  
```bash
http://localhost:5173
```

### Key Sections:
- **Dashboard**: Real-time readings for pump status, flow rate, temperature, and vibration
- **Profile Page**: Role-based data views for engineers and technicians
- **Login/Signup**: Secure access via JWT
- **Database**: Simulated data flows into MongoDB Atlas for historical + live query support

---

## License

This project is licensed under the [MIT](https://opensource.org/licenses/MIT) license.

---

## Tests

Manual testing checklist:

- [x] Log in and view dashboard as different roles  
- [x] Observe equipment data updating in near real-time  
- [x] Attempt restricted actions as technician (role enforcement)  
- [x] Ensure database logs accurate timestamps + sensor tags  

---

## Credits

GitHub username: howellea  
GitHub repo: [MEAP](https://github.com/howellea/MEAP)  
Prosys OPC UA Simulator: [Prosys Website](https://www.prosysopc.com/products/opc-ua-simulation-server/)  
Node-OPCUA: [GitHub](https://github.com/node-opcua/node-opcua)  
MongoDB Atlas: [Atlas Docs](https://www.mongodb.com/cloud/atlas)  
Render Deployment: [Render](https://render.com/)

---

## Questions

If you’d like to discuss MEAP, OPC UA, or industrial dashboards:

- GitHub: [howellea](https://github.com/howellea)  
- Email: [howelleddy@gmail.com](mailto:howelleddy@gmail.com)

---

