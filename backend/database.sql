-- Users table (update to include clerk_id if it doesn't exist)
ALTER TABLE IF EXISTS users ADD COLUMN IF NOT EXISTS clerk_id VARCHAR(100) UNIQUE;

-- Create index for clerk_id if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_id);

-- Rest of the database schema remains the same
-- Folders table
CREATE TABLE IF NOT EXISTS folders (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  parent_folder_id INTEGER REFERENCES folders(id) ON DELETE CASCADE,
  is_root BOOLEAN DEFAULT FALSE,
  is_trash BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Files table
CREATE TABLE IF NOT EXISTS files (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  size BIGINT NOT NULL,
  path VARCHAR(500) NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  folder_id INTEGER REFERENCES folders(id) ON DELETE CASCADE,
  is_trashed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- File versions table
CREATE TABLE IF NOT EXISTS file_versions (
  id SERIAL PRIMARY KEY,
  file_id INTEGER REFERENCES files(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  path VARCHAR(500) NOT NULL,
  size BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Shared items table
CREATE TABLE IF NOT EXISTS shared_items (
  id SERIAL PRIMARY KEY,
  item_type VARCHAR(10) NOT NULL,
  item_id INTEGER NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  shared_with_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  share_link VARCHAR(100) UNIQUE,
  permission VARCHAR(10) NOT NULL,
  is_public BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_files_user_id ON files(user_id);
CREATE INDEX IF NOT EXISTS idx_files_folder_id ON files(folder_id);
CREATE INDEX IF NOT EXISTS idx_folders_user_id ON folders(user_id);
CREATE INDEX IF NOT EXISTS idx_folders_parent_id ON folders(parent_folder_id);
CREATE INDEX IF NOT EXISTS idx_shared_items_item ON shared_items(item_type, item_id);