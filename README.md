# ZenVault

A secure personal file storage and management system built with Node.js, Express, TypeScript, PostgreSQL, and Redis. ZenVault provides comprehensive file organization, versioning, and access control for personal and professional use.

## Overview

ZenVault is a robust file storage solution that offers secure authentication, advanced file management, and comprehensive organization features. The system is designed for users who need reliable, secure, and organized file storage with version control and detailed access management.

## Features

### Authentication & Security
- Secure user registration and login with JWT tokens
- Role-based access control (User, Moderator, Admin)
- Password reset and email verification capabilities
- Session management with refresh tokens

### File Management
- File upload, download, and versioning
- File sharing with customizable permissions
- File tagging and categorization
- Soft delete with recovery options
- File access logging and audit trails

### Storage & Organization
- **Hierarchical folder structure** with unlimited nesting levels
- **Storage quota management** with per-user limits and usage tracking
- **File metadata management** for custom properties and search
- **File type support** for documents, images, videos, audio, archives, and more
- **Bulk file operations** for move, copy, delete, and tagging
- **Folder statistics** with file counts and size tracking
- **Storage analytics** with usage breakdowns and trends

### Advanced Features
- Real-time file synchronization
- Advanced search with filters and metadata
- File preview capabilities for supported formats
- Automated backup and recovery
- API rate limiting and security

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

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - User logout
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password` - Reset password

### File Management
- `POST /api/v1/files/upload` - Upload file
- `GET /api/v1/files/:fileId/download` - Download file
- `GET /api/v1/files/:fileId` - Get file details
- `PUT /api/v1/files/:fileId` - Update file
- `DELETE /api/v1/files/:fileId` - Delete file
- `GET /api/v1/files/:fileId/versions` - Get file versions
- `GET /api/v1/files/search` - Search files
- `POST /api/v1/files/:fileId/share` - Share file
- `GET /api/v1/files/shared` - Get shared files

### Folder Management
- `POST /api/v1/files/folders` - Create folder
- `GET /api/v1/files/folders/:folderId` - Get folder details
- `PUT /api/v1/files/folders/:folderId` - Update folder
- `DELETE /api/v1/files/folders/:folderId` - Delete folder
- `GET /api/v1/files/folders/:folderId/contents` - Get folder contents
- `POST /api/v1/files/folders/:folderId/move` - Move folder
- `POST /api/v1/files/folders/:folderId/copy` - Copy folder

### Storage & Organization
- `GET /api/v1/storage/quota` - Get user storage quota
- `PUT /api/v1/storage/quota` - Update user storage quota
- `GET /api/v1/storage/usage` - Get storage usage statistics
- `GET /api/v1/storage/file-types` - Get supported file types
- `POST /api/v1/storage/files/:fileId/metadata` - Add file metadata
- `GET /api/v1/storage/files/:fileId/metadata` - Get file metadata
- `PUT /api/v1/storage/files/:fileId/metadata/:key` - Update file metadata
- `DELETE /api/v1/storage/files/:fileId/metadata/:key` - Delete file metadata
- `GET /api/v1/storage/folders/tree` - Get folder tree structure
- `GET /api/v1/storage/folders/hierarchy` - Get complete folder hierarchy
- `GET /api/v1/storage/folders/:folderId/breadcrumb` - Get folder breadcrumb
- `GET /api/v1/storage/folders/:folderId/stats` - Get folder statistics
- `POST /api/v1/storage/files/bulk` - Perform bulk file operations
- `GET /api/v1/storage/analytics` - Get storage analytics

## Database Schema

The system uses PostgreSQL with the following key tables:

### Core Tables
- `users` - User accounts and authentication
- `folders` - Hierarchical folder structure
- `files` - File metadata and storage information
- `file_versions` - File versioning system
- `file_shares` - File and folder sharing
- `file_tags` - File tagging system
- `file_access_logs` - Access tracking and audit

### Storage & Organization Tables
- `storage_quotas` - User storage limits and usage
- `file_metadata` - Custom file metadata
- `folder_stats` - Folder statistics and analytics
- `file_categories` - File type categorization

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