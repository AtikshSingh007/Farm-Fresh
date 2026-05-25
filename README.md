# Farm Fresh — B2B2C Agri-Tech Marketplace

Farm Fresh is a robust, production-ready B2B2C agricultural marketplace built on the MERN ecosystem. It bridges the gap between rural farmers and bulk buyers—such as restaurants, retail stores, and food processors—to bypass exploitative middlemen, prevent distress selling, and optimize logistics via group village shipments.

## 🚀 Key Features

*   **Direct B2B2C Trading:** Connects rural farmers directly with commercial bulk purchasers.
*   **Geospatial Sourcing:** Location-aware search allows buyers to find agricultural produce nearest to them, minimizing transport costs and carbon footprint.
*   **Logistics & Order Pooling:** Tracks pooled logistics (`isPooled` flag) to enable cost-effective group village shipments for smallholder farmers.
*   **Smart Distress Sale Prevention:** Features an interactive dashboard for farmers with visual alerts triggered if market prices fall below defined minimums.

---

## 🛠️ Tech Stack

*   **Database:** MongoDB with Mongoose (Geospatial, Text, and Compound Indexing)
*   **Backend:** Express.js, Node.js (JWT Authentication, centralized error handling)
*   **Frontend:** React (Vite, Tailwind CSS, Lucide React icons, Context API)

---

## 📁 Repository Structure

```
farm-fresh/
├── server/                      # Node.js + Express backend
│   ├── config/                  # Database and configuration files
│   ├── controllers/             # Request handlers / controllers
│   ├── middleware/              # Authentication & global error middleware
│   ├── models/                  # Validated Mongoose Schemas (User, Listing, Order)
│   ├── routes/                  # Express routing layers
│   ├── .env.example             # Example environment configurations
│   └── server.js                # Server entry point
│
└── client/                      # React + Vite frontend (Vite & Tailwind CSS)
    ├── src/
    │   ├── components/          # Reusable presentation components
    │   ├── context/             # Global states (AuthContext, etc.)
    │   ├── hooks/               # Custom hooks
    │   └── pages/               # Page components (Farmer Dashboard, Auth pages)
    ├── tailwind.config.js       # Tailwind CSS configuration
    └── vite.config.js           # Vite build tool config
```

---

## 🔧 Installation & Setup

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/farm-fresh.git
    cd farm-fresh
    ```

2.  **Environment Setup:**
    Configure `.env` variables inside the `/server` folder matching the variables in `server/.env.example`.

3.  **Run Development Environment:**
    Install dependencies and launch both servers simultaneously:
    ```bash
    npm install
    npm run dev
    ```
