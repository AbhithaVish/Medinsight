# MedInsight 🏥🧠

### AI-Assisted Healthcare Ecosystem Platform

MedInsight is a **full-stack healthcare ecosystem platform** designed to improve healthcare accessibility and patient coordination through **AI-assisted diagnostics and integrated medical services**.

The platform connects **patients, pharmacies, hospital assistants, consultants, shop owners, and administrators** into a unified digital system.

It combines:

* 🧠 **AI-Assisted X-Ray Diagnostics**
* 💊 **Online Pharmacy Marketplace**
* 🧑‍⚕️ **Hospital Assistant Booking**
* 🧘 **Mental Health Consultant Services**

MedInsight aims to reduce the **fragmentation of healthcare workflows** by bringing diagnostics, medication access, and support services into **one centralized platform**.

---

# 📁 Project Structure

```
medinsight/
├── backend/
├── frontend/
└── README.md
```

---

# 🧠 Backend Architecture

**Node.js + Express + Sequelize + MySQL**

The backend provides **RESTful APIs**, authentication, business logic, and integration with AI diagnostic services.

```
backend/
├── src/
│   ├── app.js
│   ├── server.js
│
│   ├── config/
│   │   ├── db.js
│   │   └── auth.js
│
│   ├── models/
│   │   ├── User.js
│   │   ├── Shop.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── HospitalAssistant.js
│   │   ├── AssistantHospital.js
│   │   ├── Consultant.js
│   │   └── ConsultantHospital.js
│
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── assistant.controller.js
│   │   ├── consultant.controller.js
│   │   ├── admin.controller.js
│   │   └── product.controller.js
│
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── assistant.routes.js
│   │   ├── consultant.routes.js
│   │   ├── admin.routes.js
│   │   └── product.routes.js
│
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── role.middleware.js
│
│   └── utils/
│       └── jwt.js
│
├── uploads/
├── .env
├── package.json
└── nodemon.json
```

---

# 🎨 Frontend Architecture

**React + Vite**

The frontend provides the **interactive user interface** for patients, pharmacies, assistants, consultants, and administrators.

```
frontend/
├── src/
│   ├── api/
│   │   └── axios.js
│
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── AssistantSidebar.jsx
│   │   ├── ConsultantSidebar.jsx
│   │   └── DashboardLayout.jsx
│
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│
│   ├── pages/
│   │
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │
│   │   ├── user/
│   │   │   ├── UserDashboard.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Orders.jsx
│   │   │   └── Profile.jsx
│   │
│   │   ├── owner/
│   │   │   ├── OwnerDashboard.jsx
│   │   │   ├── MyShop.jsx
│   │   │   ├── AddProduct.jsx
│   │   │   └── MyProducts.jsx
│   │
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── ManageShops.jsx
│   │
│   │   ├── assistants/
│   │   │   ├── AssistantLogin.jsx
│   │   │   ├── AssistantRegister.jsx
│   │   │   ├── AssistantDashboard.jsx
│   │   │   ├── AssistantProfile.jsx
│   │   │   └── AssistantPublicList.jsx
│   │
│   │   └── consultants/
│   │       ├── ConsultantLogin.jsx
│   │       ├── ConsultantRegister.jsx
│   │       ├── ConsultantDashboard.jsx
│   │       ├── ConsultantProfile.jsx
│   │       └── ConsultantPublicList.jsx
│
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── public/
└── package.json
```

---

# 👥 User Roles

## 👤 Patient

* Register and login
* Upload X-ray images for AI analysis
* View diagnostic results
* Browse pharmacies
* Order medicines
* Contact hospital assistants
* Contact mental health consultants

---

## 🏪 Pharmacy Owner

* Register pharmacy shop
* Manage inventory
* Add / edit / delete products
* Process medicine orders
* Manage shop profile

---

## 🧑‍⚕️ Hospital Assistant

* Create assistant profile
* Add working hospitals
* Set hourly service rate
* Public listing for patients
* Manage availability

---

## 🧠 Consultant (Mental Health)

* Register consultant account
* Create consultation profile
* Set session pricing
* Public profile listing

---

## 🛡️ Admin

* Approve or block pharmacy shops
* Manage users
* Monitor platform activities
* View orders and services
* Manage healthcare service providers

---

# 🧠 AI Diagnostic Module

MedInsight integrates an **AI-powered X-ray diagnostic system**.

Features:

* Upload X-ray images (JPG/PNG/DICOM)
* CNN-based analysis
* Preliminary diagnostic insights
* Grad-CAM visualization
* Diagnostic history storage

The AI model is developed using:

* Python
* TensorFlow
* Keras

---

# 🛠️ Technology Stack

## Frontend

* React.js (Vite)
* Axios
* React Router
* Context API
* CSS3

## Backend

* Node.js
* Express.js
* Sequelize ORM
* MySQL
* JWT Authentication

## AI & Data Processing

* Python
* TensorFlow
* Keras
* NumPy
* Pandas

---

# ⚙️ Installation & Setup

## 1️⃣ Backend

```
cd backend
npm install
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

## 2️⃣ Frontend

```
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🔐 Security Features

* JWT Authentication
* Role-Based Access Control (RBAC)
* Password Hashing
* Secure API routes
* Protected dashboards

---

# 🚀 Future Improvements

Planned enhancements for MedInsight include:

* Online appointment booking
* Integrated video consultation
* Online payment gateway (Stripe)
* AI model improvement for multi-disease detection
* Electronic Health Records (EHR) integration
* Mobile application (React Native)

---

# 📌 Version

**v1.0.0 – Initial Stable Release**

---

# 👨‍💻 Author

**Abhitha Vishvajith**

Higher Diploma in Software Engineering
ICBT Campus – Cardiff Metropolitan University

---

# 📜 License

MIT License
