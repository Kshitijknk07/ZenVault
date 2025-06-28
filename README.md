# ZenVault

A secure personal file storage and management system built with Node.js, Express, TypeScript, PostgreSQL, and Redis. ZenVault provides comprehensive file organization, versioning, and access control for personal and professional use.

## Overview

ZenVault is a robust file storage solution that offers secure authentication, advanced file management, and comprehensive organization features. The system is designed for users who need reliable, secure, and organized file storage with version control and detailed access management.

## Features

### Authentication & Security
- Secure user registration and login with JWT tokens
- Role-based access control (User, Moderator, Admin)
- Password reset and email verification capabilities
- Session management with Redis
- Advanced security with Helmet.js, CORS, and rate limiting

### File Management
- **Upload & Download**: Secure file handling with size validation and type checking
- **Organization**: Hierarchical folder structure with unlimited nesting
- **Versioning**: Automatic file versioning with rollback capabilities
- **Metadata**: Rich file metadata including descriptions, tags, and custom properties
- **Search**: Advanced search with filters for type, size, date, and tags
- **Statistics**: Comprehensive storage analytics and usage tracking
- **Access Control**: Granular permissions and public/private file settings

### Advanced Capabilities
- **File Operations**: Move, copy, rename, and organize files efficiently
- **Bulk Operations**: Support for multiple file operations
- **Storage Management**: Soft delete, permanent delete, and storage optimization
- **API Integration**: RESTful API for seamless integration with other systems
- **Scalable Architecture**: Built for performance and scalability

## Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL 15
- **Cache**: Redis 7
- **Authentication**: JWT, bcrypt
- **Validation**: Joi
- **Logging**: Winston
- **Security**: Helmet, CORS, Rate Limiting
- **Containerization**: Docker & Docker Compose

## Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Git

### Installation

1. **Clone the Repository**
```bash
git clone <repository-url>
cd ZenVault
```

2. **Install Dependencies**
```bash
npm install
```

3. **Configure Environment**
```bash
cp env.example .env
```

Edit `.env` with your configuration:
```env
# Required: Generate strong JWT secrets
JWT_SECRET=your-64-character-strong-jwt-secret-here
JWT_REFRESH_SECRET=your-64-character-strong-refresh-jwt-secret-here

# Database configuration
DB_PASSWORD=your_secure_database_password_here

# Application settings
NODE_ENV=development
PORT=3000
API_VERSION=v1
```

4. **Start Services**
```bash
docker compose up -d
```

5. **Build and Run**
```bash
npm run build
npm run dev
```

The API will be available at `http://localhost:3000`

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

### File Management Endpoints

#### Upload File
```http
POST /files/upload
Authorization: Bearer your-access-token
Content-Type: multipart/form-data

file: [file]
folderId: "optional-folder-id"
description: "File description"
isPublic: "false"
tags: "tag1,tag2,tag3"
```

#### Download File
```http
GET /files/{fileId}/download
Authorization: Bearer your-access-token
```

#### Download Specific Version
```http
GET /files/{fileId}/download?version=2
Authorization: Bearer your-access-token
```

#### Get File Info
```http
GET /files/{fileId}
Authorization: Bearer your-access-token
```

#### Update File
```http
PUT /files/{fileId}
Authorization: Bearer your-access-token
Content-Type: application/json

{
  "name": "New File Name",
  "description": "Updated description",
  "isPublic": true,
  "tags": "newtag1,newtag2"
}
```

#### Search Files
```http
GET /files?query=document&mimeType=application/pdf&minSize=1000&maxSize=1000000&page=1&limit=10
Authorization: Bearer your-access-token
```

#### Get File Statistics
```http
GET /files/stats/overview
Authorization: Bearer your-access-token
```

#### Get File Versions
```http
GET /files/{fileId}/versions
Authorization: Bearer your-access-token
```

### Folder Management Endpoints

#### Create Folder
```http
POST /files/folders
Authorization: Bearer your-access-token
Content-Type: application/json

{
  "name": "My Documents",
  "description": "Important documents folder",
  "parentFolderId": "optional-parent-folder-id",
  "isPublic": false
}
```

#### Get Folder
```http
GET /files/folders/{folderId}
Authorization: Bearer your-access-token
```

#### Update Folder
```http
PUT /files/folders/{folderId}
Authorization: Bearer your-access-token
Content-Type: application/json

{
  "name": "Updated Folder Name",
  "description": "Updated description",
  "isPublic": true
}
```

#### Search Folders
```http
GET /files/folders?query=documents&isPublic=false&page=1&limit=10
Authorization: Bearer your-access-token
```

## Development

### Available Scripts
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
```

### Project Structure
```
ZenVault/
├── src/
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Express middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── types/            # TypeScript type definitions
│   └── index.ts          # Application entry point
├── database/
│   └── init/             # Database initialization scripts
├── docker-compose.yml    # Docker services
└── README.md
```

## Security Features

- **Password Security**: Strong password requirements with bcrypt hashing
- **JWT Authentication**: Secure token-based authentication with refresh tokens
- **Rate Limiting**: Protection against brute force attacks
- **Input Validation**: Comprehensive validation with Joi schemas
- **SQL Injection Protection**: Parameterized queries throughout
- **XSS Protection**: Security headers with Helmet.js
- **CORS Configuration**: Controlled cross-origin access
- **Environment Security**: Sensitive data isolated in environment variables

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
| `JWT_SECRET` | JWT secret key | **Yes** | - |
| `JWT_REFRESH_SECRET` | Refresh token secret | **Yes** | - |
| `BCRYPT_ROUNDS` | Password hashing rounds | No | `12` |

## Current Status

ZenVault is a fully functional file storage system with the following completed features:

**✅ Completed:**
- User authentication and authorization
- File upload/download with validation
- Folder organization system
- File versioning and management
- Advanced search and filtering
- Access control and permissions
- File statistics and storage tracking
- Comprehensive API documentation

**🔄 In Development:**
- File sharing and collaboration features
- Advanced search capabilities
- Frontend application

---

**ZenVault** - Secure personal file storage and management system 