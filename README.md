# 6M_2025_MERN_JobHorizon_Sahil

Includes three panel: <br>
admin, user and company, company can post job user can apply

**JobHorizon** is a full-stack job portal web application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It enables users (candidates) to apply for jobs, companies to post and manage job listings, and admins to oversee the platform.

---

## 📌 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Running the Project](#installation--running-the-project)
- [Screenshots](#screenshots)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

---

## 🚀 Features

- 🔐 Authentication system with JWT (Sign-up/Login for Candidates, Companies, and Admins)
- 🧑‍💼 Candidate panel to browse and apply for jobs
- 🏢 Company panel to post, update, and delete job listings
- ⚙️ Admin panel for managing users and job listings
- 📨 Application management system
- 🌐 Responsive UI built with Bootstrap

---

## ⚙️ Tech Stack

**Frontend:**

- React.js
- Bootstrap CSS
- Axios
- React Router

**Backend:**

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- Bcrypt for password hashing

---

## 📁 Project Structure

6M_2025_MERN_JobHorizon_Sahil/ │ <br>
├── FrontEnd/ # React frontend <br>
├── Backend/ # Express backend with MongoDB <br>
├── .PostManCollections <br>
├── .Presentation <br>
├── .Wireframe <br>
├── README.md <br>
└── gitignore <br>

---

## 🛠️ Installation & Running the Project

### Prerequisites

Ensure you have the following installed:

- Node.js (v16+ recommended)
- MongoDB (local or Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/6M_2025_MERN_JobHorizon_Sahil.git
cd 6M_2025_MERN_JobHorizon_Sahil
```

### 2. Set Up the Server

cd folderName <br>
npm install <br>

<li>Create a .env file in the server directory with the following content:</li>
<br>
PORT=5000
<br>
MONGO_URI=your_mongo_connection_string
<br>
JWT_SECRET=your_jwt_secret_key
<br>
<br>
<li>Start the server:</li>
npm run dev

### 3. Sarting the Backend

cd ../Backend <br>
npm install <br>
npm start <br>

### 4. Sarting the FrontEnd

cd ../FrontEnd <br>
npm install <br>
npm run dev <br>

🤝 Contributing <br>
Feel free to fork this repository, improve the code, and submit pull requests. All contributions are welcome!

📝 License <br>
This project is licensed under the MIT License.

👤 Author <br>
Sahil Kumar <br>
B.Tech Electronics and Computer <br> Engineering, Guru Nanak Dev University <br>
GitHub: [github.com](https://github.com/sahilkumar1689)
