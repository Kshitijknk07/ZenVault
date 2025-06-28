# ZenVault

A personal file storage system built with Node.js, Express, TypeScript, PostgreSQL, and Redis. This project aims to provide Google Drive-like functionality with secure authentication and file management capabilities.

## Overview

ZenVault is a work-in-progress personal project that will eventually include comprehensive file storage, sharing, and management features. Currently, the authentication system is implemented as the foundation for future development.

## Current Features

### Authentication System
- User registration and login
- JWT-based authentication with refresh tokens
- Role-based access control (User, Moderator, Admin)
- Password reset functionality
- Email verification (ready for implementation)
- Session management with Redis
- Secure password hashing with bcrypt

### Security Features
- Helmet.js for security headers
- CORS configuration
- Rate limiting
- Input validation with Joi
- SQL injection prevention
- XSS protection
- Environment variable validation
- Secure Docker configuration

## Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL 15
- **Cache**: Redis 7
- **Authentication**: JWT, bcrypt
- **Validation**: Joi
- **Logging**: Winston
- **Security**: Helmet, CORS, Rate Limiting
- **Containerization**: Docker & Docker Compose

## Prerequisites

- Node.js 18+
- Docker & Docker Compose
- Git

## Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ZenVault
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
```bash
cp env.example .env
```

Edit `.env` file and set secure values:
```env
# Generate strong JWT secrets (REQUIRED)
JWT_SECRET=your-64-character-strong-jwt-secret-here
JWT_REFRESH_SECRET=your-64-character-strong-refresh-jwt-secret-here

# Set secure database password
DB_PASSWORD=your_secure_database_password_here

# Other configurations...
NODE_ENV=development
PORT=3000
API_VERSION=v1
DB_HOST=localhost
DB_PORT=5433
DB_NAME=zenvault
DB_USER=zenvault_user
REDIS_HOST=localhost
REDIS_PORT=6380
```

### 4. Start Database Services
```bash
docker compose up -d
```

### 5. Build and Start the Application
```bash
# Build TypeScript
npm run build

# Start in development mode
npm run dev

# Or start in production mode
npm start
```

The API will be available at `http://localhost:3000`

## Security Configuration

### JWT Secrets
Generate strong JWT secrets using:
```bash
# Generate 64-character random string
openssl rand -base64 48

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(48).toString('base64'))"
```

### Environment Variables
- All sensitive data is stored in environment variables
- `.env` files are excluded from Docker builds via `.dockerignore`
- JWT secrets are required and validated at startup

## API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "username",
  "firstName": "John",
  "lastName": "Doe",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

#### Refresh Token
```http
POST /auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

#### Get Profile
```http
GET /auth/profile
Authorization: Bearer your-access-token
```

#### Update Profile
```http
PUT /auth/profile
Authorization: Bearer your-access-token
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith",
  "username": "newusername"
}
```

#### Change Password
```http
PUT /auth/change-password
Authorization: Bearer your-access-token
Content-Type: application/json

{
  "currentPassword": "OldPass123!",
  "newPassword": "NewPass123!",
  "confirmNewPassword": "NewPass123!"
}
```

#### Forgot Password
```http
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

#### Reset Password
```http
POST /auth/reset-password
Content-Type: application/json

{
  "resetToken": "reset-token-from-email",
  "newPassword": "NewPass123!",
  "confirmNewPassword": "NewPass123!"
}
```

#### Logout
```http
POST /auth/logout
Authorization: Bearer your-access-token
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

#### Verify Token
```http
GET /auth/verify-token
Authorization: Bearer your-access-token
```

### Health Check
```http
GET /health
```

## Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
npm run lint:fix    # Fix ESLint errors
npm run format      # Format code with Prettier

# Database
npm run db:migrate  # Run database migrations
npm run db:seed     # Seed database with sample data

# Testing
npm test            # Run tests
npm run test:watch  # Run tests in watch mode
```

## Docker

### Development
```bash
# Start only database services
docker compose up -d

# Start application (after installing dependencies)
npm run dev
```

## Project Structure

```
ZenVault/
├── src/
│   ├── config/           # Configuration files
│   │   ├── database.ts   # Database configuration
│   │   └── logger.ts     # Winston logger setup
│   ├── controllers/      # Route controllers
│   │   └── AuthController.ts
│   ├── middleware/       # Express middleware
│   │   ├── auth.ts       # Authentication middleware
│   │   └── validation.ts # Request validation
│   ├── models/           # Database models
│   │   └── User.ts       # User model
│   ├── routes/           # API routes
│   │   └── auth.ts       # Authentication routes
│   ├── services/         # Business logic
│   │   └── AuthService.ts
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   └── index.ts          # Application entry point
├── database/
│   └── init/             # Database initialization scripts
│       └── 01_create_users_table.sql
├── logs/                 # Application logs
├── dist/                 # Compiled JavaScript
├── docker-compose.yml    # Docker services
├── .dockerignore         # Docker ignore file
├── .env.example          # Environment variables template
├── package.json
├── tsconfig.json
└── README.md
```

## Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NODE_ENV` | Environment mode | No | `development` |
| `PORT` | Server port | No | `3000` |
| `API_VERSION` | API version | No | `v1` |
| `DB_HOST` | PostgreSQL host | No | `localhost` |
| `DB_PORT` | PostgreSQL port | No | `5433` |
| `DB_NAME` | Database name | No | `zenvault` |
| `DB_USER` | Database user | No | `zenvault_user` |
| `DB_PASSWORD` | Database password | **Yes** | - |
| `REDIS_HOST` | Redis host | No | `localhost` |
| `REDIS_PORT` | Redis port | No | `6380` |
| `REDIS_PASSWORD` | Redis password | No | - |
| `JWT_SECRET` | JWT secret key | **Yes** | - |
| `JWT_EXPIRES_IN` | JWT expiration | No | `7d` |
| `JWT_REFRESH_SECRET` | Refresh token secret | **Yes** | - |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiration | No | `30d` |
| `BCRYPT_ROUNDS` | Password hashing rounds | No | `12` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | No | `900000` (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | No | `100` |

## Security Features

- Password Requirements: Minimum 8 characters with uppercase, lowercase, number, and special character
- JWT Security: Separate secrets for access and refresh tokens (required)
- Rate Limiting: Prevents brute force attacks
- Input Validation: All inputs validated with Joi schemas
- SQL Injection Protection: Parameterized queries
- XSS Protection: Helmet.js security headers
- CORS Configuration: Restricts cross-origin requests
- Environment Variable Validation: Required secrets validated at startup
- Docker Security: Sensitive files excluded from Docker builds

## Planned Features

This authentication system serves as the foundation for future development. Planned features include:

1. **File Management System**
   - File upload/download
   - Folder organization
   - File metadata

2. **Sharing & Permissions**
   - File sharing
   - Permission management
   - Public/private links

3. **Advanced Features**
   - File preview
   - Version control
   - Search functionality
   - Real-time collaboration

4. **Frontend Application**
   - React/Vue.js frontend
   - File browser interface
   - User dashboard

## Development Status

This is a personal project in active development. The authentication system is complete and functional, providing a solid foundation for the planned file management features.

---

**ZenVault** - Personal file storage system 