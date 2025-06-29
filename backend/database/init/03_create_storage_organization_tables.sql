-- Storage & Organization System Tables

-- Create storage_quotas table for user storage limits
CREATE TABLE IF NOT EXISTS storage_quotas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    total_quota BIGINT NOT NULL DEFAULT 10737418240, -- 10GB default
    used_quota BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Create indexes for storage_quotas
CREATE INDEX IF NOT EXISTS idx_storage_quotas_user_id ON storage_quotas(user_id);
CREATE INDEX IF NOT EXISTS idx_storage_quotas_used_quota ON storage_quotas(used_quota);

-- Create trigger for storage_quotas updated_at
CREATE TRIGGER update_storage_quotas_updated_at 
    BEFORE UPDATE ON storage_quotas 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create file_metadata table for custom file metadata
CREATE TABLE IF NOT EXISTS file_metadata (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_id UUID NOT NULL REFERENCES files(id) ON DELETE CASCADE,
    key VARCHAR(100) NOT NULL,
    value TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create indexes for file_metadata
CREATE INDEX IF NOT EXISTS idx_file_metadata_file_id ON file_metadata(file_id);
CREATE INDEX IF NOT EXISTS idx_file_metadata_key ON file_metadata(key);
CREATE INDEX IF NOT EXISTS idx_file_metadata_key_value ON file_metadata(key, value);

-- Create unique constraint for file metadata key
CREATE UNIQUE INDEX IF NOT EXISTS idx_file_metadata_unique ON file_metadata(file_id, key);

-- Create trigger for file_metadata updated_at
CREATE TRIGGER update_file_metadata_updated_at 
    BEFORE UPDATE ON file_metadata 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create folder_stats table for folder statistics
CREATE TABLE IF NOT EXISTS folder_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    folder_id UUID NOT NULL REFERENCES folders(id) ON DELETE CASCADE,
    total_files INTEGER NOT NULL DEFAULT 0,
    total_size BIGINT NOT NULL DEFAULT 0,
    last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    UNIQUE(folder_id)
);

-- Create indexes for folder_stats
CREATE INDEX IF NOT EXISTS idx_folder_stats_folder_id ON folder_stats(folder_id);
CREATE INDEX IF NOT EXISTS idx_folder_stats_total_size ON folder_stats(total_size);

-- Create trigger for folder_stats updated_at
CREATE TRIGGER update_folder_stats_last_updated 
    BEFORE UPDATE ON folder_stats 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create file_categories table for file type categorization
CREATE TABLE IF NOT EXISTS file_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL UNIQUE,
    display_name VARCHAR(100) NOT NULL,
    extensions TEXT[] NOT NULL,
    mime_types TEXT[] NOT NULL,
    max_size BIGINT NOT NULL DEFAULT 104857600, -- 100MB default
    is_previewable BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create indexes for file_categories
CREATE INDEX IF NOT EXISTS idx_file_categories_name ON file_categories(name);
CREATE INDEX IF NOT EXISTS idx_file_categories_extensions ON file_categories USING GIN(extensions);
CREATE INDEX IF NOT EXISTS idx_file_categories_mime_types ON file_categories USING GIN(mime_types);

-- Create trigger for file_categories updated_at
CREATE TRIGGER update_file_categories_updated_at 
    BEFORE UPDATE ON file_categories 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert default file categories
INSERT INTO file_categories (name, display_name, extensions, mime_types, max_size, is_previewable) VALUES
('document', 'Documents', ARRAY['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt', 'pages'], 
 ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/rtf', 'application/vnd.oasis.opendocument.text', 'application/x-iwork-pages-sffpages'], 
 52428800, true), -- 50MB

('image', 'Images', ARRAY['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp', 'tiff'], 
 ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/svg+xml', 'image/webp', 'image/tiff'], 
 104857600, true), -- 100MB

('video', 'Videos', ARRAY['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv', 'm4v'], 
 ARRAY['video/mp4', 'video/x-msvideo', 'video/quicktime', 'video/x-ms-wmv', 'video/x-flv', 'video/webm', 'video/x-matroska', 'video/x-m4v'], 
 1073741824, false), -- 1GB

('audio', 'Audio', ARRAY['mp3', 'wav', 'flac', 'aac', 'ogg', 'wma', 'm4a'], 
 ARRAY['audio/mpeg', 'audio/wav', 'audio/flac', 'audio/aac', 'audio/ogg', 'audio/x-ms-wma', 'audio/mp4'], 
 104857600, false), -- 100MB

('archive', 'Archives', ARRAY['zip', 'rar', '7z', 'tar', 'gz', 'bz2'], 
 ARRAY['application/zip', 'application/x-rar-compressed', 'application/x-7z-compressed', 'application/x-tar', 'application/gzip', 'application/x-bzip2'], 
 524288000, false), -- 500MB

('other', 'Other Files', ARRAY[], ARRAY[], 104857600, false) -- 100MB
ON CONFLICT (name) DO NOTHING;

-- Create function to update folder stats
CREATE OR REPLACE FUNCTION update_folder_stats()
RETURNS TRIGGER AS $$
BEGIN
    -- Update folder stats when files are inserted, updated, or deleted
    IF TG_OP = 'INSERT' THEN
        INSERT INTO folder_stats (folder_id, total_files, total_size, last_updated)
        VALUES (NEW.folder_id, 1, NEW.size, NOW())
        ON CONFLICT (folder_id) DO UPDATE SET
            total_files = folder_stats.total_files + 1,
            total_size = folder_stats.total_size + NEW.size,
            last_updated = NOW();
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        -- Handle folder change
        IF OLD.folder_id IS DISTINCT FROM NEW.folder_id THEN
            -- Decrease count in old folder
            IF OLD.folder_id IS NOT NULL THEN
                UPDATE folder_stats SET
                    total_files = total_files - 1,
                    total_size = total_size - OLD.size,
                    last_updated = NOW()
                WHERE folder_id = OLD.folder_id;
            END IF;
            
            -- Increase count in new folder
            IF NEW.folder_id IS NOT NULL THEN
                INSERT INTO folder_stats (folder_id, total_files, total_size, last_updated)
                VALUES (NEW.folder_id, 1, NEW.size, NOW())
                ON CONFLICT (folder_id) DO UPDATE SET
                    total_files = folder_stats.total_files + 1,
                    total_size = folder_stats.total_size + NEW.size,
                    last_updated = NOW();
            END IF;
        ELSE
            -- Same folder, just update size difference
            UPDATE folder_stats SET
                total_size = total_size + (NEW.size - OLD.size),
                last_updated = NOW()
            WHERE folder_id = NEW.folder_id;
        END IF;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        -- Decrease count in folder
        IF OLD.folder_id IS NOT NULL THEN
            UPDATE folder_stats SET
                total_files = total_files - 1,
                total_size = total_size - OLD.size,
                last_updated = NOW()
            WHERE folder_id = OLD.folder_id;
        END IF;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update folder stats
CREATE TRIGGER update_folder_stats_trigger
    AFTER INSERT OR UPDATE OR DELETE ON files
    FOR EACH ROW
    EXECUTE FUNCTION update_folder_stats();

-- Create function to update user storage quota
CREATE OR REPLACE FUNCTION update_user_storage_quota()
RETURNS TRIGGER AS $$
BEGIN
    -- Update user storage quota when files are inserted, updated, or deleted
    IF TG_OP = 'INSERT' THEN
        INSERT INTO storage_quotas (user_id, total_quota, used_quota)
        VALUES (NEW.owner_id, 10737418240, NEW.size) -- 10GB default
        ON CONFLICT (user_id) DO UPDATE SET
            used_quota = storage_quotas.used_quota + NEW.size,
            updated_at = NOW();
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        -- Update quota based on size difference
        UPDATE storage_quotas SET
            used_quota = used_quota + (NEW.size - OLD.size),
            updated_at = NOW()
        WHERE user_id = NEW.owner_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        -- Decrease quota
        UPDATE storage_quotas SET
            used_quota = used_quota - OLD.size,
            updated_at = NOW()
        WHERE user_id = OLD.owner_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update user storage quota
CREATE TRIGGER update_user_storage_quota_trigger
    AFTER INSERT OR UPDATE OR DELETE ON files
    FOR EACH ROW
    EXECUTE FUNCTION update_user_storage_quota();

-- Create function to get folder path
CREATE OR REPLACE FUNCTION get_folder_path(folder_uuid UUID)
RETURNS TABLE (
    id UUID,
    name VARCHAR(255),
    depth INTEGER
) AS $$
WITH RECURSIVE folder_tree AS (
    -- Base case: start with the target folder
    SELECT f.id, f.name, f.parent_folder_id, 0 as depth
    FROM folders f
    WHERE f.id = folder_uuid
    
    UNION ALL
    
    -- Recursive case: get parent folders
    SELECT f.id, f.name, f.parent_folder_id, ft.depth + 1
    FROM folders f
    INNER JOIN folder_tree ft ON f.id = ft.parent_folder_id
)
SELECT id, name, depth
FROM folder_tree
ORDER BY depth DESC;
$$ LANGUAGE SQL;

-- Create function to get folder tree
CREATE OR REPLACE FUNCTION get_folder_tree(user_uuid UUID, parent_folder_uuid UUID DEFAULT NULL)
RETURNS TABLE (
    id UUID,
    name VARCHAR(255),
    path TEXT,
    depth INTEGER,
    has_children BOOLEAN,
    file_count BIGINT,
    total_size BIGINT
) AS $$
BEGIN
    RETURN QUERY
    WITH RECURSIVE folder_tree AS (
        -- Base case: root folders
        SELECT 
            f.id,
            f.name,
            f.name as path,
            0 as depth,
            f.parent_folder_id,
            COALESCE(fs.total_files, 0) as file_count,
            COALESCE(fs.total_size, 0) as total_size
        FROM folders f
        LEFT JOIN folder_stats fs ON f.id = fs.folder_id
        WHERE f.owner_id = user_uuid 
        AND (parent_folder_uuid IS NULL AND f.parent_folder_id IS NULL 
             OR parent_folder_uuid IS NOT NULL AND f.parent_folder_id = parent_folder_uuid)
        
        UNION ALL
        
        -- Recursive case: child folders
        SELECT 
            f.id,
            f.name,
            ft.path || '/' || f.name,
            ft.depth + 1,
            f.parent_folder_id,
            COALESCE(fs.total_files, 0) as file_count,
            COALESCE(fs.total_size, 0) as total_size
        FROM folders f
        LEFT JOIN folder_stats fs ON f.id = fs.folder_id
        INNER JOIN folder_tree ft ON f.parent_folder_id = ft.id
        WHERE f.owner_id = user_uuid
    )
    SELECT 
        ft.id,
        ft.name,
        ft.path,
        ft.depth,
        EXISTS(SELECT 1 FROM folders f WHERE f.parent_folder_id = ft.id) as has_children,
        ft.file_count,
        ft.total_size
    FROM folder_tree ft
    ORDER BY ft.path;
END;
$$ LANGUAGE plpgsql;

-- Grant permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO zenvault_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO zenvault_user;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO zenvault_user; 