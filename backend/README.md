# ZenVault Backend

A secure cloud file storage backend built with Node.js, Express.js, and AWS S3 integration.

## 🚀 Features

- **Secure Authentication**: JWT-based authentication with refresh tokens
- **File Management**: Upload, download, organize, and share files
- **Folder Organization**: Create, manage, and navigate folder structures
- **AWS S3 Integration**: Scalable cloud storage with presigned URLs
- **Email Verification**: Secure email verification and password reset
- **Rate Limiting**: API rate limiting for security
- **Redis Caching**: Session management and caching
- **PostgreSQL Database**: Reliable data storage
- **File Sharing**: Share files with other users with permissions

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- Redis (v6 or higher)
- AWS S3 bucket
- SMTP email service (Gmail, SendGrid, etc.)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ZenVault/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=zenvault
   DB_USER=postgres
   DB_PASSWORD=your_password
   
   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key_here
   JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here
   JWT_EXPIRES_IN=15m
   JWT_REFRESH_EXPIRES_IN=7d
   
   # AWS S3 Configuration
   AWS_REGION=us-east-1
   AWS_ACCESS_KEY_ID=your_aws_access_key_id
   AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
   S3_BUCKET_NAME=zenvault-storage
   
   # Redis Configuration
   REDIS_URL=redis://localhost:6379
   
   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   
   # Frontend URL (for email links)
   FRONTEND_URL=http://localhost:3000
   ```

4. **Set up PostgreSQL database**
   ```sql
   CREATE DATABASE zenvault;
   CREATE USER zenvault_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE zenvault TO zenvault_user;
   ```

5. **Initialize database tables**
   ```bash
   npm run init-db
   ```

6. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── db.js        # Database configuration
│   │   ├── s3.js        # AWS S3 configuration
│   │   └── redis.js     # Redis configuration
│   ├── controllers/     # Route controllers
│   │   ├── auth.controller.js
│   │   ├── file.controller.js
│   │   ├── folder.controller.js
│   │   └── user.controller.js
│   ├── middlewares/     # Custom middlewares
│   │   └── auth.middleware.js
│   ├── models/          # Database models
│   │   ├── user.model.js
│   │   ├── file.model.js
│   │   └── folder.model.js
│   ├── routes/          # API routes
│   │   ├── auth.routes.js
│   │   ├── file.routes.js
│   │   ├── folder.routes.js
│   │   └── user.routes.js
│   ├── utils/           # Utility functions
│   │   └── email.js
│   └── server.js        # Main server file
├── package.json
├── env.example
└── README.md
```

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/refresh-token` | Refresh access token |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/verify/:token` | Verify email address |
| POST | `/api/auth/forgot-password` | Request password reset |
| POST | `/api/auth/reset-password` | Reset password |
| GET | `/api/auth/profile` | Get user profile |
| PUT | `/api/auth/profile` | Update user profile |

### Files

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/files` | Get user files |
| POST | `/api/files/upload-url` | Get presigned upload URL |
| GET | `/api/files/:id/download-url` | Get presigned download URL |
| PUT | `/api/files/:id` | Update file metadata |
| DELETE | `/api/files/:id` | Delete file |
| POST | `/api/files/:id/share` | Share file with user |
| DELETE | `/api/files/:id/share/:userId` | Remove file share |

### Folders

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/folders` | Get user folders |
| POST | `/api/folders` | Create new folder |
| PUT | `/api/folders/:id` | Update folder |
| DELETE | `/api/folders/:id` | Delete folder |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/search?q=term` | Search users for sharing |

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: API rate limiting to prevent abuse
- **Input Validation**: Comprehensive input validation
- **CORS Protection**: Cross-origin resource sharing protection
- **Token Blacklisting**: Secure token revocation
- **Email Verification**: Account verification via email
- **Password Reset**: Secure password reset flow

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://yourdomain.com

# Database
DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=zenvault
DB_USER=zenvault_user
DB_PASSWORD=secure_password

# JWT (use strong secrets)
JWT_SECRET=your-very-long-and-secure-jwt-secret
JWT_REFRESH_SECRET=your-very-long-and-secure-refresh-secret

# AWS S3
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
S3_BUCKET_NAME=zenvault-production

# Redis
REDIS_URL=redis://your-redis-host:6379

# Email (use production email service)
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📊 Health Check

The API includes a health check endpoint:

```bash
GET /health
```

Response:
```json
{
  "status": "OK",
  "message": "ZenVault API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@zenvault.com or create an issue in the repository. 