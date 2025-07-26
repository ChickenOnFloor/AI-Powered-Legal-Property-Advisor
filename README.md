# Legal Property Advisor - AI-Powered Legal Consultation Platform

A comprehensive, production-ready legal consultation platform that combines AI-powered guidance with human lawyer expertise for property-related legal matters.

## 🚀 **NEW FEATURES ADDED**

### **Real-Time Features**
- ✅ **WebSocket Integration** - Live chat between clients and lawyers
- ✅ **Real-time Notifications** - Instant updates for messages, bookings, and case updates
- ✅ **Typing Indicators** - See when someone is typing
- ✅ **Online Status** - Real-time online/offline status
- ✅ **Live Document Sharing** - Share documents in real-time during consultations

### **Email Notification System**
- ✅ **Welcome Emails** - Automated welcome emails for new users
- ✅ **Booking Confirmations** - Email confirmations for lawyer bookings
- ✅ **Message Notifications** - Email alerts for new messages
- ✅ **Case Updates** - Email notifications for case status changes
- ✅ **Review Notifications** - Email alerts for new reviews
- ✅ **Lawyer Verification** - Email notifications for verification status

### **Cloud Storage System**
- ✅ **Document Upload** - Secure file upload with validation
- ✅ **Image Upload** - Profile pictures and document images
- ✅ **File Management** - Organize and share documents
- ✅ **Storage Validation** - File type and size validation
- ✅ **Presigned URLs** - Secure file access

### **Progressive Web App (PWA)**
- ✅ **Mobile App Experience** - Install as native app on mobile devices
- ✅ **Offline Support** - Access cached content when offline
- ✅ **Service Worker** - Background sync and caching
- ✅ **Push Notifications** - Browser-based push notifications
- ✅ **App Manifest** - Native app-like experience
- ✅ **Mobile Navigation** - Touch-optimized navigation

### **Mobile Optimization**
- ✅ **Responsive Design** - Optimized for all screen sizes
- ✅ **Touch Gestures** - Pull-to-refresh and swipe actions
- ✅ **Mobile Navigation** - Bottom navigation bar for mobile
- ✅ **Install Prompts** - Easy app installation on mobile
- ✅ **Mobile Headers** - Optimized headers for mobile screens

## 🎯 **Core Features**

### **AI-Powered Legal Assistant**
- Instant legal guidance using Google's Gemini AI
- Property law expertise and best practices
- Natural language processing for complex queries
- Context-aware responses and follow-up suggestions

### **Lawyer Booking System**
- Browse verified property lawyers
- Real-time availability checking
- 48-hour access periods for consultations
- Secure booking and payment integration
- Lawyer verification and rating system

### **Case Management**
- Create and track legal cases
- Document upload and management
- Case status tracking
- Lawyer assignment system
- Case history and updates

### **Review & Rating System**
- Rate lawyers after consultations
- Detailed review system with comments
- Average rating calculations
- Review moderation and verification

### **Admin Dashboard**
- Comprehensive platform analytics
- Lawyer verification management
- User management and oversight
- System monitoring and reporting
- Revenue tracking and insights

### **User Management**
- Secure authentication system
- Role-based access control (Client, Lawyer, Admin)
- Profile management and customization
- Settings and preferences
- Privacy controls

## 🛠 **Technology Stack**

### **Frontend**
- **Next.js 14** - React framework with App Router
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Socket.io Client** - Real-time communication
- **PWA Support** - Progressive Web App features

### **Backend**
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Socket.io** - Real-time WebSocket server
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing

### **AI & External Services**
- **Google Gemini AI** - Advanced language model
- **Email Service** - Automated email notifications
- **Cloud Storage** - File upload and management
- **PWA Service Worker** - Offline functionality

### **Development Tools**
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📦 **Installation & Setup**

### **Prerequisites**
- Node.js 18+ 
- MongoDB 6+
- npm or pnpm

### **Quick Start**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/legal-property-advisor.git
   cd legal-property-advisor
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/legal-advisor
   JWT_SECRET=your-super-secret-jwt-key
   GEMINI_API_KEY=your-gemini-api-key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Database Setup**
   ```bash
   # Start MongoDB (if using local instance)
   mongod
   
   # The app will automatically create collections on first run
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

6. **Access the Application**
   - Open [http://localhost:3000](http://localhost:3000)
   - Register as a client or lawyer
   - Start exploring the platform

## 🏗 **Project Structure**

```
legal-property-advisor/
├── app/                          # Next.js App Router
│   ├── api/                      # API endpoints
│   │   ├── auth/                 # Authentication
│   │   ├── booking/              # Booking management
│   │   ├── cases/                # Case management
│   │   ├── chat/                 # AI chat
│   │   ├── documents/            # Document management
│   │   ├── lawyers/              # Lawyer management
│   │   ├── notifications/        # Notification system
│   │   ├── reviews/              # Review system
│   │   └── user/                 # User management
│   ├── client/                   # Client dashboard
│   ├── lawyer/                   # Lawyer dashboard
│   ├── admin/                    # Admin dashboard
│   └── globals.css               # Global styles
├── components/                   # Reusable components
│   ├── ui/                       # UI components
│   ├── chat/                     # Chat components
│   └── theme-provider.tsx        # Theme provider
├── lib/                          # Utility libraries
│   ├── db.js                     # Database connection
│   ├── email.js                  # Email service
│   ├── storage.js                # Cloud storage
│   └── socket.js                 # WebSocket setup
├── models/                       # Database models
├── public/                       # Static assets
│   ├── manifest.json             # PWA manifest
│   ├── sw.js                     # Service worker
│   └── offline.html              # Offline page
└── types/                        # TypeScript types
```

## 🔧 **Configuration**

### **Environment Variables**

```env
# Core Configuration
MONGODB_URI=mongodb://localhost:27017/legal-advisor
JWT_SECRET=your-super-secret-jwt-key
GEMINI_API_KEY=your-gemini-api-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Email Configuration
FROM_EMAIL=noreply@legaladvisor.com
FROM_NAME=Legal Property Advisor
EMAIL_SERVICE=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password

# Storage Configuration
STORAGE_BASE_URL=https://storage.legaladvisor.com
STORAGE_BUCKET=legal-documents
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key

# PWA Configuration
PWA_NAME=Legal Property Advisor
PWA_SHORT_NAME=LegalAdvisor
PWA_THEME_COLOR=#2563eb
```

### **Database Models**

- **User** - User accounts and profiles
- **Booking** - Lawyer booking sessions
- **Case** - Legal case management
- **Review** - Lawyer reviews and ratings
- **Notification** - User notifications
- **Document** - File management
- **Message** - Chat messages

## 🚀 **Deployment**

### **Vercel Deployment**

1. **Connect to Vercel**
   ```bash
   npm i -g vercel
   vercel login
   vercel
   ```

2. **Set Environment Variables**
   - Add all environment variables in Vercel dashboard
   - Configure MongoDB Atlas connection
   - Set up email service credentials

3. **Deploy**
   ```bash
   vercel --prod
   ```

### **Docker Deployment**

1. **Build Docker Image**
   ```bash
   docker build -t legal-advisor .
   ```

2. **Run Container**
   ```bash
   docker run -p 3000:3000 legal-advisor
   ```

## 📱 **Mobile App Features**

### **PWA Installation**
- Add to home screen on iOS and Android
- Native app-like experience
- Offline functionality
- Push notifications

### **Mobile Optimization**
- Touch-optimized interface
- Responsive design
- Mobile navigation
- Pull-to-refresh
- Swipe gestures

## 🔒 **Security Features**

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation and sanitization
- CORS protection
- Rate limiting
- Secure file uploads

## 📊 **Analytics & Monitoring**

- User activity tracking
- Booking analytics
- Revenue reporting
- Performance monitoring
- Error tracking
- Usage statistics

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 **Support**

- **Documentation**: [Wiki](https://github.com/yourusername/legal-property-advisor/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/legal-property-advisor/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/legal-property-advisor/discussions)

## 🎯 **Roadmap**

### **Upcoming Features**
- [ ] Video calling integration
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Advanced document collaboration
- [ ] AI-powered case analysis
- [ ] Integration with legal databases
- [ ] Mobile app (React Native)
- [ ] Advanced payment processing

### **Performance Optimizations**
- [ ] Database indexing optimization
- [ ] CDN integration
- [ ] Image optimization
- [ ] Code splitting
- [ ] Caching strategies

---

**Built with ❤️ for the legal community** 