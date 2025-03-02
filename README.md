# ZenVault – Secure & Scalable Cloud Storage

## Overview
ZenVault is a modern cloud storage platform designed for secure, scalable, and efficient file management. Built with TypeScript and integrated with Google Cloud Storage, it offers enterprise-grade file storage capabilities with robust user management and security features.

## Features
- **Secure File Storage**: End-to-end encryption and secure file handling
- **Cloud Integration**: Native Google Cloud Storage (GCS) integration
- **User Authentication**: Clerk-based authentication system
- **Role-Based Access Control (RBAC)**: Flexible user roles (USER, ADMIN)
- **Scalable Architecture**: Built with TypeScript for maintainability
- **Database**: PostgreSQL with Prisma ORM
- **Logging**: Comprehensive monitoring and debugging system
- **Error Handling**: Robust error management
- **Environment Management**: Secure configuration using environment variables

## Tech Stack
- **Backend Framework**: Node.js with TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: Clerk
- **Cloud Storage**: Google Cloud Storage
- **Development Tools**: ESLint, Prettier
- **Logging**: Custom logging implementation

## Project Structure
```
zenvault-backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # API endpoints
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
├── prisma/
│   └── schema.prisma   # Database schema
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- Google Cloud Platform account
- Clerk account

### Environment Variables
Create a `.env` file in the root directory and add the following:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/zenvault"
GOOGLE_CLOUD_PROJECT_ID="your-project-id"
GOOGLE_CLOUD_BUCKET_NAME="your-bucket-name"
CLERK_SECRET_KEY="your-clerk-secret"
```

### Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/zenvault-backend.git
cd zenvault-backend
```
2. Install dependencies:
```bash
npm install
```
3. Set up the database:
```bash
npx prisma generate
npx prisma migrate dev
```
4. Start the development server:
```bash
npm run dev
```

## Database Schema

### ClerkUser Model
```prisma
model ClerkUser {
  id        String   @id @default(uuid())
  clerkId   String   @unique
  email     String   @unique
  name      String?
  role      String   @default("USER")
  createdAt DateTime @default(now())
}
```

### User Model
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  role      String   @default("USER")
}
```

## API Documentation

### Authentication
All authenticated endpoints require a valid Clerk session token.

### User Management
- `POST /users` - Create a new user
- `GET /users/:id` - Get user details
- `PUT /users/:id` - Update user details
- `DELETE /users/:id` - Delete user

### File Operations
- `POST /files/upload` - Upload a file
- `GET /files/:id` - Download a file
- `DELETE /files/:id` - Delete a file
- `GET /files` - List all files

## Security Features
- Clerk-based authentication
- Role-based access control (RBAC)
- Secure file storage with Google Cloud Storage
- Environment variable protection
- Type-safe implementations

## Error Handling
ZenVault implements comprehensive error handling, including:
- Custom error types
- Detailed error logging
- User-friendly error messages
- HTTP status code mapping

