# 🔗 URL Shortener (MERN Stack)

A simple and efficient **URL Shortener** web application built with **React**, **Node.js**, **Express**, and **MongoDB**.  
It allows users to shorten long URLs, share them easily, and track their usage.  

---

## 🚀 Features

### **Frontend (React)**
- 📌 Form to submit **long URLs**
- 🔍 Display **shortened URLs** after submission
- 🎨 Clean and modern UI

### **Backend (Node.js + Express + MongoDB)**
- **POST `/api/shorten`** – Accepts long URL and returns a short code
- **GET `/:shortcode`** – Redirects to the original long URL
- **Mongoose Schema** for storing URL mappings

### **Bonus Features (Optional)**
- 👨‍💼 **Admin-only Page**:
  - View all shortened URLs
  - Track number of visits for each URL

---

## 🛠️ Tech Stack

| Layer         | Technology            |
|--------------|-----------------------|
| **Frontend** | React, Axios, CSS      |
| **Backend**  | Node.js, Express.js    |
| **Database** | MongoDB, Mongoose      |
| **Others**   | Nodemon, dotenv        |

---

## 📂 Project Structure

url-shortener/
│
├── backend/
│ ├── models/
│ │ └── Url.js
│ ├── routes/
│ │ └── url.js
│ ├── server.js
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ └── UrlForm.js
│ │ ├── App.js
│ │ └── index.js
│ ├── package.json
│
└── README.md

yaml
Copy
Edit

---

## ⚙️ Installation & Setup

### **1️⃣ Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/url-shortener.git
cd url-shortener
2️⃣ Backend Setup
bash
Copy
Edit
cd backend
npm install
Create a .env file in the backend folder:

ini
Copy
Edit
MONGO_URI=your_mongodb_connection_string
BASE_URL=http://localhost:5000
PORT=5000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Dinesh123
Start backend server:

bash
Copy
Edit
npm run dev
3️⃣ Frontend Setup
bash
Copy
Edit
cd ../frontend
npm install
npm start
📌 API Endpoints
POST /api/shorten
Request Body:

json
Copy
Edit
{
  "longUrl": "https://example.com/very/long/url"
}
Response:

json
Copy
Edit
{
  "shortUrl": "http://localhost:5000/abc123"
}
GET /:shortcode
Redirects to the original URL.

🔑 Admin Page (Optional)
Accessible only with the correct ADMIN_API_TOKEN

Displays:

All shortened URLs

Visit count for each URL

🎥 Demo Video
Click here to watch demo

🌐 Live Demo
🌐 **Live Demo** → [https://url-shortener-1-nz0m.onrender.com](https://url-shortener-1-nz0m.onrender.com)

📜 License
This project is licensed under the MIT License.

👨‍💻 Author
B Sai Dinesh
📧 Email: your.email@example.com
📌 GitHub: @yourusername
