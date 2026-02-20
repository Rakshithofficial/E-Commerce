# E-Commerce

## ⚠️ IMPORTANT – How to Run This Project

All backend commands **must be run inside the `flux-backend` folder**.


# FLUX – E-Commerce Project (Django Backend)

This project uses **Django** as the backend for authentication and data storage, with a **static frontend** (HTML/CSS/JS).

The backend handles:
- User authentication (signup, login, sessions)
- Database storage
- Django admin panel

The frontend handles:
- UI pages (signup, login, products, cart, etc.)

---

## 📁 Project Structure
FLUX/
├── flux-backend/ # Django backend
│ ├── accounts/
│ ├── flux/
│ ├── manage.py
│ ├── db.sqlite3
│ └── requirements.txt
│
├── pages/ # Frontend HTML pages
├── assets/
├── index.html

---

## How This Project Works

- The frontend is built using **static HTML, CSS, and JavaScript**.
- The backend is built using **Django**.
- Django is responsible for:
  - User authentication (signup, login, sessions)
  - Database management
  - Admin panel
- The frontend communicates with the Django backend using HTTP requests.
- During development, frontend and backend are **decoupled**.

This setup keeps the UI simple while using Django for core backend functionality.


## contributors 

< Ranadheerveldi> - Fronted Review & Testing

