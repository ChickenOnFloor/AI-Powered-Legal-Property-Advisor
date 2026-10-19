# Legal Property Advisor

AI-Powered Legal Consultation Platform for Property Law

---

A platform combining AI (Google Gemini) and real lawyers for property-related legal matters in Pakistan. Features lawyer booking, client–lawyer chat, case and document management, and admin tools.

## 🚀 Key Features

- **AI Legal Assistant**: Instant property law guidance via Gemini AI
- **Client–Lawyer Chat**: Messaging between clients and booked lawyers (REST polling). A Socket.io server for real-time chat and WebRTC call signalling is included but not yet wired into the UI (see below)
- **Booking System**: 48-hour lawyer access, real-time availability, secure sessions
- **Case Management**: Create, track, and update legal cases with document uploads
- **Document Storage**: Upload metadata and sharing. ⚠️ `lib/storage.js` is a stub that returns fake URLs; no file is actually stored yet
- **Notifications**: In-app notifications. ⚠️ `lib/email.js` is a stub that only logs; no email is actually sent yet
- **Admin Dashboard**: Analytics, lawyer verification, user management, revenue tracking
- **PWA & Mobile**: Installable, offline support, push notifications, mobile-optimized UI
- **Security**: JWT in an httpOnly cookie, bcrypt password hashing, role checks (client/lawyer/admin). No rate limiting yet

## 🛠️ Technology Stack

**Frontend**
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Socket.io Client
- PWA support

**Backend**
- Next.js API Routes
- MongoDB + Mongoose
- Socket.io (WebSocket server)
- JWT, bcryptjs

**AI & Services**
- Google Gemini AI
- Nodemailer (or similar) for email
- Cloud Storage (S3, GCS, etc.)

**Dev Tools**
- ESLint, PostCSS, Autoprefixer

## 📦 Quick Start

1. **Clone & Install**
   ```bash
   git clone https://github.com/yourusername/legal-property-advisor.git
   cd legal-property-advisor
   npm install
   # or
   pnpm install
   ```
2. **Setup Environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```
3. **Run MongoDB** (local or Atlas)
   ```bash
   mongod
   ```
4. **Start Dev Server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```
5. **Access**: [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

**Environment Variables** (see `.env.example`):
- `MONGODB_URI`, `JWT_SECRET`, `GEMINI_API_KEY`, `NEXT_PUBLIC_SITE_URL`
- Email (stub): `FROM_EMAIL`, `FROM_NAME`
- Storage (stub): `STORAGE_BASE_URL`, `STORAGE_BUCKET`

> **Use a long random hex `JWT_SECRET`** (e.g. `openssl rand -hex 64`). Next.js expands `$NAME` inside `.env` values, so a secret containing `$` is silently truncated. Never commit `.env` files.

### Real-time server (optional)

`npm run dev` / `npm start` run plain Next.js. To also run the Socket.io server (`lib/socket.mjs`, authenticated by the same `token` cookie), use:

```bash
npm run dev:socket     # development
npm run build && npm run start:socket   # production
```

This needs a host that runs a long-lived Node process (not Vercel serverless).

## 🏗️ Project Structure

```
app/         # Next.js App Router (API, pages, dashboards)
components/  # Reusable UI & chat/video components
lib/         # Utilities: db, auth, email (stub), storage (stub), socket
models/      # Mongoose models (User, Booking, Case, etc.)
public/      # Static assets, manifest, service worker
server.mjs   # Optional custom server that adds Socket.io
```

## 📡 API Overview

All API endpoints are under `/api/` and follow RESTful conventions. Authentication is required for most endpoints (JWT in the httpOnly `token` cookie). Registration only accepts `client` or `lawyer`; admin accounts must be created directly in the database.

### Auth & User
- `POST /api/login` — User login
- `POST /api/register` — User registration
- `GET /api/auth/me` — Get current user info
- `POST /api/user/change-password` — Change password
- `GET/PUT /api/user/profile` — Get/update user profile
- `GET/PUT /api/user/settings` — Get/update user settings

### Booking & Appointments
- `POST /api/booking` — Book a lawyer (48-hour access)
- `GET /api/booking/active` — Get active bookings
- `GET /api/booking/check` — Check booking status
- `POST /api/booking/access-check` — Check access for booking
- `POST /api/appointments` — Create appointment
- `GET /api/appointments/byLawyer` — Appointments for a lawyer
- `GET /api/bookings/byLawyer` — Bookings for a lawyer

### Lawyers
- `GET /api/lawyers` — List verified lawyers
- `GET /api/lawyers/search` — Search lawyers
- `GET /api/lawyers/[lawyerId]` — Get lawyer by ID
- `GET /api/lawyers/clients` — Get lawyer's cases (that lawyer or admin only)
- `POST /api/lawyers/by-ids` — Get multiple lawyers by IDs

### Cases
- `GET /api/cases` — List user cases
- `POST /api/cases` — Create a case
- `GET /api/caseoflawyer` — Cases for a lawyer (that lawyer or admin only)

### Chat & Messaging
- `POST /api/chat` — AI legal assistant (Gemini, logged-in users only)
- `GET/POST /api/lawyerchat` — Lawyer-client chat
- `POST /api/lawyerchat/send` — Send message
- `GET /api/lawyerchat/messages` — Get chat messages

### Documents
- `GET/POST /api/documents` — List/upload documents
- `PUT/DELETE /api/documents` — Update/delete documents

### Reviews & Notifications
- `GET/POST /api/reviews` — List/add reviews
- `GET/POST /api/notifications` — List/send notifications

### Video Calls
- `GET/POST /api/video-calls` — Call records (WebRTC signalling goes through the optional Socket.io server)

### Analytics & Admin
- `GET /api/analytics` — Platform analytics (role-based)
- `GET /api/admin/stats` — Admin stats
- `POST /api/admin/verify-lawyer` — Verify lawyer

## 🗄️ Database Models (Mongoose)

- **User**: name, email, password, userType (client/lawyer/admin), specialization, image, location, bio, verified, sessionRate, availableSlots, settings (notifications, privacy, preferences)
- **Booking**: lawyerId, userId, accessStatus, expiresAt, status, createdAt
- **Case**: title, status, lawyer, date, userId
- **Review**: lawyerId, clientId, rating, comment (unique per lawyer-client)
- **Notification**: userId, type, title, message, read, data, priority
- **Document**: title, description, fileName, fileUrl, fileSize, fileType, uploadedBy, sharedWith, caseId, bookingId, isPublic, tags, status
- **Message**: bookingId, senderId, senderType, content, timestamp, status

## ⚡ Real-Time & Utilities

- **WebSocket** (optional, `npm run dev:socket`): chat, typing, online status, video call signalling, notifications. The client components (`RealTimeChat`, `VideoCall`) are not yet used by any page
- **Email** (stub): templates for welcome, booking, message, case, review, verification, password reset
- **Storage** (stub): upload, validation and sharing API without a real storage backend

## 📱 PWA & Mobile
- Installable on iOS/Android
- Offline support, push notifications
- Touch-optimized, responsive, mobile navigation

## 🔒 Security
- JWT auth (httpOnly, `sameSite=strict` cookie), bcrypt password hashing (min. 8 characters)
- Role checks (client/lawyer/admin); self-registration as admin is blocked
- Not yet implemented: rate limiting, real file storage, CSRF tokens

## 🚀 Deployment

**Vercel**
```bash
npm i -g vercel
vercel login
vercel
# Set env vars in dashboard
vercel --prod
```


## 🤝 Contributing
- Fork, branch, commit, PR
- Add tests if possible

## 🗺️ Roadmap
- [ ] Video calling (WebRTC)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Document collaboration
- [ ] AI-powered case analysis
- [ ] Legal DB integration
- [ ] Mobile app (React Native)
- [ ] Advanced payment processing
- [ ] Performance: DB indexing, CDN, image optimization, code splitting, caching

---

**Built with ❤️ for the legal community** 