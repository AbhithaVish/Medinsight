# MedInsight 🏥🧠💊

### AI-Assisted Healthcare Ecosystem Platform

**MedInsight** is a full-stack healthcare ecosystem platform designed to improve healthcare accessibility, diagnostics, and patient support services through **AI-assisted X-ray analysis and integrated healthcare services**.

The platform connects **patients, pharmacies, hospital assistants, consultants, shop owners, and administrators** into a unified digital system.

MedInsight aims to reduce the **fragmentation of healthcare workflows** by integrating **diagnostics, pharmacy access, and healthcare support services** into a single platform.

---

# 🚀 Core Features

### 🧠 AI-Assisted X-Ray Diagnostics

* Upload X-ray images
* AI model analyzes images using CNN
* Detects possible fractures or abnormalities
* Generates Grad-CAM heatmaps
* Stores diagnostic history

### 💊 Online Pharmacy Marketplace

* Pharmacies register their shops
* Manage products and inventory
* Patients can search medicines
* Order medicines online

### 🧑‍⚕️ Hospital Assistant Services

* Assistants create public profiles
* Add working hospitals
* Set hourly rates
* Patients can find and contact assistants

### 🧘 Mental Health Consultant Services

* Consultants create professional profiles
* Offer consultation services
* Patients can contact consultants

### 🛡️ Admin Platform Management

* Approve or block pharmacy shops
* Monitor system users
* Manage services and transactions

---

# 🏗 System Architecture

MedInsight follows a **three-tier microservice architecture**.

```
React Frontend
      │
      ▼
Node.js / Express Backend API
      │
      ▼
Python AI Diagnostic Service
      │
      ▼
TensorFlow CNN Models
```

### System Layers

**Frontend Layer**

* React.js user interface
* Dashboards for all user roles

**Backend Layer**

* Node.js REST API
* Business logic
* Authentication & authorization

**AI Service Layer**

* Python inference service
* TensorFlow deep learning models
* Heatmap visualization

---

# 📁 Project Structure

```
medinsight/
│
├── ai-xray-service/                # AI Diagnostic Microservice
│   ├── models/
│   │   ├── medinsight_fracture_professional_model.h5
│   │   └── medinsight_xray_model.h5
│   │
│   ├── utils/
│   │   ├── heatmap.py
│   │   ├── predict.py
│   │   ├── preprocess.py
│   │   ├── recommender.py
│   │   └── visualize.py
│   │
│   ├── __pycache__/
│   ├── app.py                      # AI inference API
│   ├── schemas.py
│   ├── requirements.txt
│   └── uvicorn.txt
│
├── backend/                        # Node.js Backend
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── auth.js
│   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Shop.js
│   │   │   ├── Product.js
│   │   │   ├── Order.js
│   │   │   ├── HospitalAssistant.js
│   │   │   ├── AssistantHospital.js
│   │   │   ├── Consultant.js
│   │   │   └── ConsultantHospital.js
│   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── assistant.controller.js
│   │   │   ├── consultant.controller.js
│   │   │   ├── admin.controller.js
│   │   │   └── product.controller.js
│   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── assistant.routes.js
│   │   │   ├── consultant.routes.js
│   │   │   ├── admin.routes.js
│   │   │   └── product.routes.js
│   │
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   └── role.middleware.js
│   │
│   │   └── utils/
│   │       └── jwt.js
│   │
│   ├── uploads/
│   ├── package.json
│   ├── nodemon.json
│   └── .env
│
├── frontend/                       # React Frontend
│   ├── public/
│   │
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── AssistantSidebar.jsx
│   │   │   └── ConsultantSidebar.jsx
│   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   │
│   │   │   ├── user/
│   │   │   │   ├── UserDashboard.jsx
│   │   │   │   ├── Cart.jsx
│   │   │   │   ├── Orders.jsx
│   │   │   │   └── Profile.jsx
│   │   │   │
│   │   │   ├── owner/
│   │   │   │   ├── OwnerDashboard.jsx
│   │   │   │   ├── MyShop.jsx
│   │   │   │   ├── AddProduct.jsx
│   │   │   │   └── MyProducts.jsx
│   │   │   │
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   └── ManageShops.jsx
│   │   │   │
│   │   │   ├── assistants/
│   │   │   │   ├── AssistantLogin.jsx
│   │   │   │   ├── AssistantRegister.jsx
│   │   │   │   ├── AssistantDashboard.jsx
│   │   │   │   ├── AssistantProfile.jsx
│   │   │   │   └── AssistantPublicList.jsx
│   │   │   │
│   │   │   └── consultants/
│   │   │       ├── ConsultantLogin.jsx
│   │   │       ├── ConsultantRegister.jsx
│   │   │       ├── ConsultantDashboard.jsx
│   │   │       ├── ConsultantProfile.jsx
│   │   │       └── ConsultantPublicList.jsx
│   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
└── README.md
```

---

# 👥 User Roles

### 👤 Patient

* Upload X-ray images
* View AI diagnostic results
* Browse pharmacy products
* Place medicine orders
* Contact hospital assistants
* Contact mental health consultants

### 🏪 Pharmacy Owner

* Register pharmacy shop
* Manage product inventory
* Handle medicine orders

### 🧑‍⚕️ Hospital Assistant

* Create assistant profile
* Add hospitals
* Set hourly service rate

### 🧠 Consultant

* Provide consultation services
* Create professional profile

### 🛡️ Admin

* Approve or block shops
* Manage users
* Monitor system activities

---

# 🛠 Technology Stack

### Frontend

* React.js (Vite)
* Axios
* React Router
* Context API
* CSS3

### Backend

* Node.js
* Express.js
* Sequelize ORM
* MySQL
* JWT Authentication

### AI & Machine Learning

* Python
* TensorFlow
* Keras
* NumPy
* Pandas

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```
git clone https://github.com/AbhithaVish/Medinsight.git
cd Medinsight
```

---

## 2️⃣ Backend Setup

```
cd backend
npm install
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

## 3️⃣ Frontend Setup

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

## 4️⃣ AI Service Setup

```
cd ai-xray-service
pip install -r requirements.txt
uvicorn app:app --reload
```

AI service runs on:

```
http://localhost:8000
```

---

# 🔐 Security Features

* JWT Authentication
* Role-Based Access Control (RBAC)
* Password hashing
* Protected API routes
* Secure image upload handling

---

# 📈 Future Improvements

* Video telemedicine integration
* Online payment gateway (Stripe)
* Ratings and reviews
* AI model improvement for multi-disease detection
* Mobile application (React Native)
* Electronic Health Records integration

---

# 📌 Version

**Version2.0.0 – Final Version of MedInsight**

---

# 👨‍💻 Author

**Abhitha Vishvajith**

Higher Diploma in Software Engineering
ICBT Campus – Cardiff Metropolitan University

---

# 📜 License

MIT License
