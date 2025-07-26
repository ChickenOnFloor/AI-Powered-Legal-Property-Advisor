# Legal Property Advisor

AI-Powered Legal Consultation Platform for Property Law

---

A production-ready platform combining advanced AI (Google Gemini) and real lawyers for property-related legal matters. Features real-time chat, video calls, document management, and robust admin tools.

## 🚀 Key Features

- **AI Legal Assistant**: Instant property law guidance via Gemini AI
- **Real-Time Chat & Video**: WebSocket-powered messaging, typing indicators, online status, and video calls
- **Booking System**: 48-hour lawyer access, real-time availability, secure sessions
- **Case Management**: Create, track, and update legal cases with document uploads
- **Document Storage**: Secure uploads, sharing, presigned URLs, and validation
- **Notifications**: Real-time and email alerts for bookings, messages, reviews, and cases
- **Admin Dashboard**: Analytics, lawyer verification, user management, revenue tracking
- **PWA & Mobile**: Installable, offline support, push notifications, mobile-optimized UI
- **Security**: JWT auth, bcrypt password hashing, RBAC, CORS, rate limiting, input validation

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
- Email: `FROM_EMAIL`, `EMAIL_USER`, `EMAIL_PASS`, etc.
- Storage: `STORAGE_BASE_URL`, `STORAGE_BUCKET`, AWS keys
- PWA: `PWA_NAME`, `PWA_THEME_COLOR`, etc.

## 🏗️ Project Structure

```
app/         # Next.js App Router (API, pages, dashboards)
components/  # Reusable UI & chat/video components
lib/         # Utilities: db, email, storage, socket
models/      # Mongoose models (User, Booking, Case, etc.)
public/      # Static assets, manifest, service worker
styles/      # Global styles
```

## 📡 API Overview

All API endpoints are under `/api/` and follow RESTful conventions. Authentication is required for most endpoints (JWT via cookies or headers).

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
- `POST /api/booking/check` — Check booking status
- `POST /api/booking/access-check` — Check access for booking
- `POST /api/appointments` — Create appointment
- `GET /api/appointments/byLawyer` — Appointments for a lawyer
- `GET /api/bookings/byLawyer` — Bookings for a lawyer

### Lawyers
- `GET /api/lawyers` — List/search lawyers
- `GET /api/lawyers/search` — Search lawyers
- `GET /api/lawyers/[lawyerId]` — Get lawyer by ID
- `GET /api/lawyers/clients` — Get lawyer's clients
- `GET /api/lawyers/by-ids` — Get multiple lawyers by IDs

### Cases
- `GET /api/cases` — List user cases
- `POST /api/cases` — Create a case
- `GET /api/caseoflawyer` — Cases for a lawyer

### Chat & Messaging
- `POST /api/chat` — AI legal assistant (Gemini)
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
- `POST /api/video-calls` — Initiate video call
- `POST /api/video-calls/offer` — Send call offer
- `POST /api/video-calls/answer` — Answer call
- `POST /api/video-calls/ice-candidate` — ICE candidate exchange

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

- **WebSocket**: Real-time chat, typing, online status, video call signaling, notifications
- **Email**: Welcome, booking, message, case, review, verification, password reset
- **Storage**: File/image/document upload, validation, presigned URLs, sharing

## 📱 PWA & Mobile
- Installable on iOS/Android
- Offline support, push notifications
- Touch-optimized, responsive, mobile navigation

## 🔒 Security
- JWT auth, bcrypt password hashing
- RBAC (client/lawyer/admin)
- Input validation, CORS, rate limiting
- Secure file uploads

## 🚀 Deployment

**Vercel**
```bash
npm i -g vercel
vercel login
vercel
# Set env vars in dashboard
vercel --prod
```

**Docker**
```bash
docker build -t legal-advisor .
docker run -p 3000:3000 legal-advisor
```

## 🤝 Contributing
- Fork, branch, commit, PR
- Add tests if possible
- See [LICENSE](LICENSE)

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