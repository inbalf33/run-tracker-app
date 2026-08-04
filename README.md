# 🏃‍♂️ RunTracker App

A Full-Stack Running Tracker Application designed to record, track, and analyze running activities.

---

## 🚀 Tech Stack

### **Backend**
* **Node.js & Express.js** – RESTful API server architecture
* **MongoDB & Mongoose** – NoSQL database & Object Data Modeling
* **JWT (JSON Web Tokens)** – Secure user authentication & authorization
* **bcryptjs** – Password hashing

### **Frontend**
* **React (Vite)** – Modern component-based UI
* **React Router DOM** – Single Page Application (SPA) routing & protected routes
* **Formik & Yup** – Form state management and schema validation
* **Bootstrap 5 & FontAwesome** – Responsive layout and modern UI components
* **Axios** – HTTP requests with custom JWT interceptors
* **React Toastify** – Interactive notifications

---

## ✨ Features

* **User Authentication:** Registration, Login, and JWT session persistence.
* **Protected Routes:** Restricts dashboard access to authenticated users only.
* **Activity Logging:** Add running sessions with distance, formatted time (Hours:Minutes:Seconds converted to decimal minutes), and optional notes.
* **Personal Dashboard:** Displays activity history alongside overall distance, total duration, and calculated average pace.
* **Responsive & RTL Design:** Fully optimized layout for modern web browsers.

---

## 🛠️ Installation & Setup

### **1. Clone the repository**
```bash
git clone <repository-url>
cd RunTracker