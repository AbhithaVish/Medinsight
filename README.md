# MedInsight 🏥💊

MedInsight is a full-stack healthcare commerce and service platform that connects **patients, pharmacies, hospital assistants, consultants, shop owners, and administrators** in one unified system.

---

## 📁 Project Folder Structure

### Root
```
medinsight/
├── backend/
├── frontend/
└── README.md
```

---

## 🧠 Backend Structure (Node.js + Express + Sequelize)

```
backend/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   ├── db.js
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Shop.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── HospitalAssistant.js
│   │   ├── AssistantHospital.js
│   │   ├── Consultant.js
│   │   └── ConsultantHospital.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── assistant.controller.js
│   │   ├── consultant.controller.js
│   │   ├── admin.controller.js
│   │   └── product.controller.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── assistant.routes.js
│   │   ├── consultant.routes.js
│   │   ├── admin.routes.js
│   │   └── product.routes.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── role.middleware.js
│   └── utils/
│       └── jwt.js
├── uploads/
├── .env
├── package.json
└── nodemon.json
```

---

## 🎨 Frontend Structure (React + Vite)

```
frontend/
├── src/
│   ├── api/
│   │   └── axios.js
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── AssistantSidebar.jsx
│   │   ├── ConsultantSidebar.jsx
│   │   └── DashboardLayout.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── user/
│   │   │   ├── UserDashboard.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Orders.jsx
│   │   │   └── Profile.jsx
│   │   ├── owner/
│   │   │   ├── OwnerDashboard.jsx
│   │   │   ├── MyShop.jsx
│   │   │   ├── AddProduct.jsx
│   │   │   └── MyProducts.jsx
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── ManageShops.jsx
│   │   ├── assistants/
│   │   │   ├── AssistantLogin.jsx
│   │   │   ├── AssistantRegister.jsx
│   │   │   ├── AssistantDashboard.jsx
│   │   │   ├── AssistantProfile.jsx
│   │   │   └── AssistantPublicList.jsx
│   │   └── consultants/
│   │       ├── ConsultantLogin.jsx
│   │       ├── ConsultantRegister.jsx
│   │       ├── ConsultantDashboard.jsx
│   │       ├── ConsultantProfile.jsx
│   │       └── ConsultantPublicList.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
└── package.json
```

---

## 👥 User Roles & Features

### 👤 Normal User
- Browse pharmacies & products
- Add to cart & place orders
- View hospital assistants & consultants
- Contact assistants/consultants

### 🏪 Shop Owner
- Register shop
- Add / manage products
- Handle orders

### 🧑‍⚕️ Hospital Assistant
- Separate registration & login
- Add working hospitals
- Set hourly rates
- Public profile listing

### 🧠 Consultant
- Same feature set as assistants
- Separate tables & authentication

### 🛡️ Admin
- Approve / block shops
- View users, orders, assistants, consultants
- Platform monitoring

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- Axios
- React Router
- Context API

**Backend**
- Node.js
- Express.js
- Sequelize ORM
- MySQL
- JWT Authentication

---

## ⚙️ Setup Instructions

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🚀 Version

**v1.0.0 – Initial Stable Release**

---

## 📌 Roadmap
- Booking & scheduling
- Payments (Stripe)
- Ratings & reviews
- Admin analytics dashboard
- Mobile app (React Native)

---

## 👨‍💻 Author
**Abhitha Vishvajith**

---

## 📜 License
MIT License
