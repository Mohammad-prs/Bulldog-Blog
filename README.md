# 🐶 Bulldog Blog – CMS Web Application

A dynamic content management system (CMS) blog app built using **Node.js**, **Express**, and **PostgreSQL**, designed to manage articles and categories with full CRUD functionality and responsive UI.

## 🔗 Live Demo & GitHub

- 🔴 Live: https://bulldog-blog.vercel.app 
- 🟣 GitHub: https://github.com/Mohammad-prs/Bulldog-Blog
---

## 🛠️ Technology Stack

**Frontend:**
- HTML5  
- CSS3 (Bootstrap 5)  
- JavaScript / jQuery  

**Backend:**
- Node.js  
- Express.js  

**Database:**
- PostgreSQL (Cloud-hosted on [Neon.tech](https://neon.tech))

---

## ✨ Key Features

- 📝 Add, edit, view, and delete blog articles  
- 📂 Manage article categories and filter by category/date  
- 💡 Dynamic EJS-based rendering  
- 🔒 Secure database connection with environment variables  
- 📱 Responsive UI using Bootstrap 5  
- 💥 Full error handling for invalid routes and DB issues  

---

## 🧠 Route Summary

| Route                 | Description              |
|----------------------|--------------------------|
| `/` or `/about`      | Static About Page        |
| `/articles`          | List all articles        |
| `/categories`        | List all categories      |
| `/articles/add`      | Add new article          |
| `/article/:id`       | View article by ID       |
| `/articles/edit/:id` | Edit article by ID       |

---

## 🗃️ PostgreSQL Integration

- Switched from JSON to **PostgreSQL** using the `pg` library  
- Connected via a secure cloud database on **Neon.tech**  
- Credentials managed using `.env`  
- SSL-enabled database communication  

---

## ✅ Improvements Over Time

- Refactored all data access to use SQL queries  
- Improved UI responsiveness with Bootstrap  
- Added error messages for 404s and DB issues  
- Enabled category-based filtering for articles  
- Built full CRUD routes for articles and admin functionality  

---



## 👤 Author

**Mohammadreza Parsafard**  
📧 mparsafard@myseneca.ca  
🌐 [GitHub – Mohammad-prs](https://github.com/Mohammad-prs)

