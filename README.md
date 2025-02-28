# ZenVault – Secure & Scalable Cloud Storage

## Overview
ZenVault is a **cloud storage platform** designed for **secure, scalable, and efficient file management**. It allows users to **store, share, and manage files seamlessly**, ensuring data integrity and high availability.

## Features
- **Secure File Storage**: Robust security with encryption and IAM roles.
- **Scalable Architecture**: Built on NestJS for high performance.
- **Cloud Integration**: Supports Google Cloud Storage (GCS) for efficient file handling.
- **User Management**: Signup, authentication, and role-based access control (RBAC).
- **Modern Tech Stack**: Uses TypeScript, NestJS, and PostgreSQL.
- **Extensible API**: RESTful endpoints for easy integration with other services.

## Project Setup

```bash
# Clone the repository
git clone https://github.com/your-repo/zenvault.git
cd zenvault

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env

# Start the development server
pnpm run start:dev
```

## API Endpoints

```bash
# Health check
GET /

# User Signup
POST /users/signup

# File Upload
POST /files/upload
```

## Running the Application

```bash
# Start in development mode
pnpm run start:dev

# Start in production mode
pnpm run start:prod

# Run unit tests
pnpm run test

# Run e2e tests
pnpm run test:e2e

# Check test coverage
pnpm run test:cov
```


## Security Best Practices
- **Do not commit sensitive files** (e.g., `gcp-key.json`, `.env`).
- **Use IAM roles and least privilege access** for cloud integrations.
- **Encrypt user data** at rest and in transit.

## Useful Resources
- [NestJS Documentation](https://docs.nestjs.com)
- [Google Cloud Storage](https://cloud.google.com/storage/docs/)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [Docker](https://docs.docker.com/)

More to come ------
