# Luxe Reserve — Hotel Booking System

A full-stack luxury hotel booking platform with a Vite + React frontend and a Node.js / Express / MongoDB backend. Built as Future Interns Full-Stack task **FUTURE_FS_03**.

> Discover destinations, browse curated rooms, filter by price / amenities / room type, sign up, book a stay, and manage your reservations.

---

## ✨ Features

### Frontend (React + Vite)

- **Home** — animated hero with search bar, curated destinations, editor's choice rooms
- **Destinations** (`/rooms`) — server-driven list with reactive filters (price slider, room type, amenities), sort (recommended / price asc / desc), pagination, URL-driven query params from the Hero search
- **Room Details** (`/rooms/:id`) — gallery, amenities, integrated booking form with date overlap validation
- **Experiences** (`/experiences`) — editorial content: signature journeys carousel, artisan series grid, bespoke CTA
- **Gallery** (`/gallery`) — masonry layout with category tabs and progressive "View More"
- **Offers** (`/offers`) — alternating offer cards with bespoke concierge CTA
- **Auth** — Register / Sign in with JWT, persistent session via `localStorage`
- **My Bookings** (`/bookings`) — protected route, list + cancel reservations
- Fully responsive (mobile hamburger menu, fluid typography, breakpoint grids)

### Backend (Express + MongoDB)

- REST API: `/api/auth`, `/api/rooms`, `/api/bookings`
- JWT authentication middleware
- Booking conflict detection (rejects overlapping date ranges)
- Mongoose models: `User`, `Room`, `Booking`
- Atlas-ready connection string
- Seed script to populate sample rooms

---

## 🛠 Tech Stack

| Layer    | Tech                                                    |
| -------- | ------------------------------------------------------- |
| Frontend | React 18, Vite 5, React Router 6, Axios                 |
| Backend  | Node.js, Express 4, Mongoose 8, JWT, bcryptjs           |
| Database | MongoDB Atlas (or local MongoDB)                        |
| Styling  | Plain CSS with design tokens (Playfair Display + Inter) |

---

## 📁 Project Structure

```
FUTURE_FS_03/
├── client/                      # Vite + React frontend
│   ├── index.html
│   ├── vite.config.js           # /api proxied to http://localhost:5000
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx              # AuthProvider + routes
│   │   └── index.css            # design tokens
│   ├── pages/
│   │   ├── Home.jsx · Rooms.jsx · RoomDetails.jsx
│   │   ├── Experiences.jsx · Gallery.jsx · Offers.jsx
│   │   ├── Login.jsx · Register.jsx · MyBookings.jsx
│   ├── components/
│   │   ├── Navbar.jsx · Footer.jsx · Hero.jsx
│   │   ├── RoomCard.jsx · DestinationCard.jsx
│   │   ├── FilterSidebar.jsx · Pagination.jsx
│   └── services/
│       ├── api.js               # axios instance + JWT interceptor
│       ├── AuthContext.jsx      # session provider
│       ├── authService.js · roomService.js · bookingService.js
│       └── mockData.js          # fallback when API unreachable
└── server/                      # Express API
    ├── server.js
    ├── seed.js                  # populates 8 sample rooms
    ├── config/db.js
    ├── models/                  # User · Room · Booking
    ├── controllers/             # auth · room · booking
    ├── middleware/authMiddleware.js
    └── routes/                  # authRoutes · roomRoutes · bookingRoutes
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+**
- **npm** (or pnpm / yarn)
- A **MongoDB Atlas** cluster (free tier works) — or a local MongoDB instance

### 1. Clone and install

```bash
git clone <your-repo-url> FUTURE_FS_03
cd FUTURE_FS_03

# Backend deps
cd server && npm install

# Frontend deps
cd ../client && npm install
```

### 2. Configure environment

Create `server/.env` (copy from `.env.example`):

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<url-encoded-password>@<cluster>.mongodb.net/hotel-booking?retryWrites=true&w=majority
JWT_SECRET=replace_with_a_long_random_string
```

> ⚠️ If your Atlas password contains `@`, `:`, `/`, `?`, `#` or `%`, URL-encode them (e.g. `@` → `%40`).

### 3. Seed sample rooms

```bash
cd server
npm run seed
```

This inserts 8 luxury rooms (Heritage Suite, Azure Ocean Villa, Skyline Penthouse, etc.).

### 4. Run both servers

In two terminals:

```bash
# Terminal 1 — API
cd server && npm run dev      # http://localhost:5000

# Terminal 2 — Web app
cd client && npm run dev      # http://localhost:5173
```

Open **http://localhost:5173**.

---

## 🔐 First-Time Sign In

This is a fresh installation — there are no pre-existing accounts. To get in:

1. Open **http://localhost:5173**
2. Click **Sign in** (top right) → on the Login page, click **Create an account** (or go straight to `/register`)
3. Enter your **name**, **email**, and a **password** (min 6 chars). Submit.
4. You'll be **auto-logged in** and redirected back to the home page. Your avatar (first initial) appears top-right.
5. From there, click any room → pick dates → **Confirm Booking** → review under **My Bookings**.

To create an **admin** user (for future admin endpoints), promote your user manually in MongoDB:

```js
// in mongo shell or Atlas data explorer
db.users.updateOne({ email: "you@example.com" }, { $set: { role: "admin" } });
```

---

## 🔌 API Reference (summary)

| Method | Endpoint                   | Auth | Purpose                                 |
| ------ | -------------------------- | ---- | --------------------------------------- |
| POST   | `/api/auth/register`       | —    | Create account, returns JWT             |
| POST   | `/api/auth/login`          | —    | Login, returns JWT                      |
| GET    | `/api/rooms`               | —    | List rooms (supports query filters)     |
| GET    | `/api/rooms/:id`           | —    | Single room                             |
| POST   | `/api/bookings`            | ✅   | Create booking (validates date overlap) |
| GET    | `/api/bookings/my`         | ✅   | Current user's bookings                 |
| PUT    | `/api/bookings/:id/cancel` | ✅   | Cancel a booking                        |

Auth header format: `Authorization: Bearer <token>`

---

## 🌐 Deployment

### Recommended stack (all free tiers)

- **Database** → MongoDB Atlas
- **Backend API** → Render / Railway / Fly.io
- **Frontend** → Vercel / Netlify

### A. MongoDB Atlas

1. Create a free M0 cluster at [cloud.mongodb.com](https://cloud.mongodb.com)
2. **Database Access** → add a user with read/write
3. **Network Access** → add `0.0.0.0/0` (or your deployment provider's IPs)
4. Copy the **connection string** → set as `MONGO_URI`

### B. Deploy backend (Render example)

1. Push the repo to GitHub
2. On Render → **New +** → **Web Service** → connect repo
3. Settings:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. **Environment** → add: `MONGO_URI`, `JWT_SECRET`, `PORT=5000`
5. Deploy. Note the URL (e.g. `https://luxe-api.onrender.com`).
6. Run the seed once from your local machine (with the prod `MONGO_URI` in `.env`): `npm run seed`.

> Update `server/server.js` CORS to whitelist your frontend domain:
>
> ```js
> app.use(
>   cors({
>     origin: ["https://luxe-reserve.vercel.app", "http://localhost:5173"],
>   }),
> );
> ```

### C. Deploy frontend (Vercel example)

1. On Vercel → **Add New Project** → import the same repo
2. Settings:
   - **Root Directory**: `client`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. **Environment Variables**: add `VITE_API_URL=https://luxe-api.onrender.com`
4. Update `client/services/api.js` to read `import.meta.env.VITE_API_URL` (falls back to `/api` in dev via the Vite proxy).
5. Deploy.

### D. Post-deploy checklist

- [ ] Register a test account on the live site
- [ ] Create a booking and verify it appears under My Bookings
- [ ] Verify CORS does **not** block requests (check browser console)
- [ ] Rotate `JWT_SECRET` and Atlas password from any value you used in development

---

## 🗺 Roadmap — What's Left to Make It "Production Full-Stack"

The core full-stack loop (auth → list → book → manage) is **complete**. Below is what would harden it for real-world use:

### High-impact (recommended next)

- **Admin panel** — CRUD for rooms, view all bookings, manage users (the `User.role: 'admin'` field already exists)
- **Stripe / payment integration** — currently bookings are saved as `status: 'pending'` with no payment
- **Email confirmations** — Nodemailer + SendGrid/Resend on booking creation
- **Image uploads** — Cloudinary / S3 instead of hard-coded Unsplash URLs
- **Real availability calendar** — block dates already booked on the Room Details page

### Quality / DX

- **Form validation library** (Zod / Yup + React Hook Form)
- **Toast notifications** (react-hot-toast) instead of inline messages
- **Loading skeletons** instead of plain "Loading…" text
- **Unit + integration tests** — Vitest for frontend, Jest + Supertest for the API
- **API rate limiting** (express-rate-limit) + helmet for security headers
- **Centralised error logging** — Sentry

### Content

- **Reviews & ratings** per room
- **Real backend-driven** Offers / Experiences / Gallery (currently hard-coded)
- **Search by date availability** at the room-list level
- **Wishlist / favourites** per user

---

## 📜 Scripts Reference

### `server/`

| Script         | Action                  |
| -------------- | ----------------------- |
| `npm start`    | Production server       |
| `npm run dev`  | Dev server with nodemon |
| `npm run seed` | Reseed sample rooms     |

### `client/`

| Script            | Action                         |
| ----------------- | ------------------------------ |
| `npm run dev`     | Vite dev server (port 5173)    |
| `npm run build`   | Production build → `dist/`     |
| `npm run preview` | Preview the prod build locally |

---

## 📝 License

MIT — feel free to adapt.

Built for **Future Interns** | Full-Stack Web Development Track | Task 03.
