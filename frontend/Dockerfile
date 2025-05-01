FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code and env files
COPY . .

# Make sure environment variables are available during build
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_BACKEND_URL

# Build the application
RUN pnpm build

# Expose the port the app runs on
EXPOSE 4173

# Command to run the application
CMD ["pnpm", "preview", "--host", "0.0.0.0"]