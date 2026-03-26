# 🚀 Infrastructure Health Monitor System
A Full-Stack (MERN) application developed for 6th Semester Project.

## 🏗️ Three-Tier Architecture
This project is built using a decoupled architecture:
1. **Presentation Tier (Frontend):** Developed with **React & Vite**. Uses Axios for asynchronous API calls and Lucide-React for the UI.
2. **Logic Tier (Backend):** Built with **Node.js & Express**. Features a background worker that performs automated health pings every 60 seconds.
3. **Data Tier (Database):** Uses **MongoDB Atlas** (Cloud) to persist service metadata and health status.

## 🛠️ Tech Stack
- **Frontend:** React.js, Tailwind-style CSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose ODM)
- **DevOps:** NVM for version management, REST API architecture

## ⚡ Key Features
- **Real-time Monitoring:** Automated background pings to verify service uptime.
- **Dynamic Dashboard:** Instant UI updates when services go Up/Down.
- **Full CRUD:** Ability to add, view, and clear monitored services.
