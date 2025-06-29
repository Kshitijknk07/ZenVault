import { postgresPool } from "../config/database";
import { Folder, User } from "../types";

export class FolderModel {
  static async create(folderData: {
    name: string;
    description?: string;
    parentFolderId?: string;
    ownerId: string;
    isPublic?: boolean;
  }): Promise<Folder> {
    const query = `
      INSERT INTO folders (name, description, parent_folder_id, owner_id, is_public)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const values = [
      folderData.name,
      folderData.description,
      folderData.parentFolderId,
      folderData.ownerId,
      folderData.isPublic || false,
    ];

    const result = await postgresPool.query(query, values);
    return this.mapToFolder(result.rows[0]);
  }

  static async findById(
    id: string,
    includeRelations = false
  ): Promise<Folder | null> {
    let query = `
      SELECT f.*, 
             u.id as owner_id, u.email as owner_email, u.username as owner_username,
             u.first_name as owner_first_name, u.last_name as owner_last_name
      FROM folders f
      LEFT JOIN users u ON f.owner_id = u.id
      WHERE f.id = $1
    `;

    if (includeRelations) {
      query += `
        ORDER BY f.created_at DESC
      `;
    }

    const result = await postgresPool.query(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    const folder = this.mapToFolder(result.rows[0]);

    if (includeRelations) {
      // Load subfolders
      folder.subFolders = await this.findByParentId(id);
    }

    return folder;
  }

  static async findByOwnerId(
    ownerId: string,
    parentFolderId?: string
  ): Promise<Folder[]> {
    let query = `
      SELECT f.*, 
             u.id as owner_id, u.email as owner_email, u.username as owner_username,
             u.first_name as owner_first_name, u.last_name as owner_last_name
      FROM folders f
      LEFT JOIN users u ON f.owner_id = u.id
      WHERE f.owner_id = $1
    `;

    const values: any[] = [ownerId];

    if (parentFolderId !== undefined) {
      query += ` AND f.parent_folder_id = $2`;
      values.push(parentFolderId);
    } else {
      query += ` AND f.parent_folder_id IS NULL`;
    }

    query += ` ORDER BY f.name ASC`;

    const result = await postgresPool.query(query, values);
    return result.rows.map((row: any) => this.mapToFolder(row));
  }

  static async findByParentId(parentId: string): Promise<Folder[]> {
    const query = `
      SELECT f.*, 
             u.id as owner_id, u.email as owner_email, u.username as owner_username,
             u.first_name as owner_first_name, u.last_name as owner_last_name
      FROM folders f
      LEFT JOIN users u ON f.owner_id = u.id
      WHERE f.parent_folder_id = $1
      ORDER BY f.name ASC
    `;

    const result = await postgresPool.query(query, [parentId]);
    return result.rows.map((row: any) => this.mapToFolder(row));
  }

  static async update(
    id: string,
    updates: {
      name?: string;
      description?: string;
      isPublic?: boolean;
    }
  ): Promise<Folder | null> {
    const setClause: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (updates.name !== undefined) {
      setClause.push(`name = $${paramCount++}`);
      values.push(updates.name);
    }

    if (updates.description !== undefined) {
      setClause.push(`description = $${paramCount++}`);
      values.push(updates.description);
    }

    if (updates.isPublic !== undefined) {
      setClause.push(`is_public = $${paramCount++}`);
      values.push(updates.isPublic);
    }

    if (setClause.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const query = `
      UPDATE folders 
      SET ${setClause.join(", ")}, updated_at = NOW()
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await postgresPool.query(query, values);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapToFolder(result.rows[0]);
  }

  static async updateWithParent(
    id: string,
    updates: {
      name?: string;
      description?: string;
      isPublic?: boolean;
      parentFolderId?: string;
    }
  ): Promise<Folder | null> {
    const setClause: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (updates.name !== undefined) {
      setClause.push(`name = $${paramCount++}`);
      values.push(updates.name);
    }

    if (updates.description !== undefined) {
      setClause.push(`description = $${paramCount++}`);
      values.push(updates.description);
    }

    if (updates.isPublic !== undefined) {
      setClause.push(`is_public = $${paramCount++}`);
      values.push(updates.isPublic);
    }

    if (updates.parentFolderId !== undefined) {
      setClause.push(`parent_folder_id = $${paramCount++}`);
      values.push(updates.parentFolderId);
    }

    if (setClause.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const query = `
      UPDATE folders 
      SET ${setClause.join(", ")}, updated_at = NOW()
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await postgresPool.query(query, values);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapToFolder(result.rows[0]);
  }

  static async delete(id: string): Promise<boolean> {
    const query = "DELETE FROM folders WHERE id = $1";
    const result = await postgresPool.query(query, [id]);
    return (result.rowCount || 0) > 0;
  }

  static async search(params: {
    query?: string;
    ownerId?: string;
    isPublic?: boolean;
    parentFolderId?: string;
    page?: number;
    limit?: number;
  }): Promise<{ folders: Folder[]; total: number }> {
    let whereConditions: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (params.query) {
      whereConditions.push(
        `(f.name ILIKE $${paramCount} OR f.description ILIKE $${paramCount})`
      );
      values.push(`%${params.query}%`);
      paramCount++;
    }

    if (params.ownerId) {
      whereConditions.push(`f.owner_id = $${paramCount++}`);
      values.push(params.ownerId);
    }

    if (params.isPublic !== undefined) {
      whereConditions.push(`f.is_public = $${paramCount++}`);
      values.push(params.isPublic);
    }

    if (params.parentFolderId !== undefined) {
      whereConditions.push(`f.parent_folder_id = $${paramCount++}`);
      values.push(params.parentFolderId);
    }

    const whereClause =
      whereConditions.length > 0
        ? `WHERE ${whereConditions.join(" AND ")}`
        : "";

    // Count total
    const countQuery = `
      SELECT COUNT(*) as total
      FROM folders f
      ${whereClause}
    `;
    const countResult = await postgresPool.query(countQuery, values);
    const total = parseInt(countResult.rows[0].total);

    // Get paginated results
    const page = params.page || 1;
    const limit = params.limit || 10;
    const offset = (page - 1) * limit;

    const query = `
      SELECT f.*, 
             u.id as owner_id, u.email as owner_email, u.username as owner_username,
             u.first_name as owner_first_name, u.last_name as owner_last_name
      FROM folders f
      LEFT JOIN users u ON f.owner_id = u.id
      ${whereClause}
      ORDER BY f.created_at DESC
      LIMIT $${paramCount++} OFFSET $${paramCount++}
    `;

    values.push(limit, offset);
    const result = await postgresPool.query(query, values);

    const folders = result.rows.map((row: any) => this.mapToFolder(row));

    return { folders, total };
  }

  static async getFolderPath(folderId: string): Promise<Folder[]> {
    const path: Folder[] = [];
    let currentId = folderId;

    while (currentId) {
      const folder = await this.findById(currentId);
      if (!folder) break;

      path.unshift(folder);
      currentId = folder.parentFolderId || "";
    }

    return path;
  }

  static async getFolderTree(
    userId: string,
    parentFolderId?: string
  ): Promise<any[]> {
    const query = `
      SELECT * FROM get_folder_tree($1, $2)
    `;

    const result = await postgresPool.query(query, [
      userId,
      parentFolderId || null,
    ]);
    return result.rows;
  }

  static async getFolderWithStats(folderId: string): Promise<Folder | null> {
    const query = `
      SELECT f.*, 
             u.id as owner_id, u.email as owner_email, u.username as owner_username,
             u.first_name as owner_first_name, u.last_name as owner_last_name,
             fs.total_files, fs.total_size, fs.last_updated
      FROM folders f
      LEFT JOIN users u ON f.owner_id = u.id
      LEFT JOIN folder_stats fs ON f.id = fs.folder_id
      WHERE f.id = $1
    `;

    const result = await postgresPool.query(query, [folderId]);

    if (result.rows.length === 0) {
      return null;
    }

    const folder = this.mapToFolderWithStats(result.rows[0]);

    // Load folder path
    const path = await this.getFolderPath(folderId);
    folder.path = path.map((f) => f.name).join("/");
    folder.depth = path.length - 1;

    return folder;
  }

  static async getFolderHierarchy(userId: string): Promise<Folder[]> {
    const query = `
      WITH RECURSIVE folder_hierarchy AS (
        -- Base case: root folders
        SELECT 
          f.id, f.name, f.description, f.parent_folder_id, f.owner_id, f.is_public,
          f.created_at, f.updated_at,
          0 as depth,
          f.name as path
        FROM folders f
        WHERE f.owner_id = $1 AND f.parent_folder_id IS NULL
        
        UNION ALL
        
        -- Recursive case: child folders
        SELECT 
          f.id, f.name, f.description, f.parent_folder_id, f.owner_id, f.is_public,
          f.created_at, f.updated_at,
          fh.depth + 1,
          fh.path || '/' || f.name
        FROM folders f
        INNER JOIN folder_hierarchy fh ON f.parent_folder_id = fh.id
        WHERE f.owner_id = $1
      )
      SELECT 
        fh.*,
        u.id as owner_id, u.email as owner_email, u.username as owner_username,
        u.first_name as owner_first_name, u.last_name as owner_last_name,
        fs.total_files, fs.total_size, fs.last_updated
      FROM folder_hierarchy fh
      LEFT JOIN users u ON fh.owner_id = u.id
      LEFT JOIN folder_stats fs ON fh.id = fs.folder_id
      ORDER BY fh.path
    `;

    const result = await postgresPool.query(query, [userId]);
    return result.rows.map((row: any) => this.mapToFolderWithStats(row));
  }

  static async getFolderBreadcrumb(folderId: string): Promise<Folder[]> {
    const query = `
      SELECT * FROM get_folder_path($1)
    `;

    const result = await postgresPool.query(query, [folderId]);
    const folderIds = result.rows.map((row: any) => row.id);

    if (folderIds.length === 0) {
      return [];
    }

    // Get full folder details for each folder in the path
    const folders: Folder[] = [];
    for (const id of folderIds) {
      const folder = await this.findById(id);
      if (folder) {
        folders.push(folder);
      }
    }

    return folders;
  }

  static async getFolderSize(folderId: string): Promise<number> {
    const query = `
      SELECT COALESCE(SUM(f.size), 0) as total_size
      FROM files f
      WHERE f.folder_id = $1 AND f.is_deleted = false
    `;

    const result = await postgresPool.query(query, [folderId]);
    return parseInt(result.rows[0].total_size) || 0;
  }

  static async getFolderFileCount(folderId: string): Promise<number> {
    const query = `
      SELECT COUNT(*) as file_count
      FROM files f
      WHERE f.folder_id = $1 AND f.is_deleted = false
    `;

    const result = await postgresPool.query(query, [folderId]);
    return parseInt(result.rows[0].file_count) || 0;
  }

  static async moveFolder(
    folderId: string,
    newParentFolderId: string | null
  ): Promise<Folder | null> {
    // Check for circular reference
    if (newParentFolderId) {
      const isCircular = await this.checkCircularReference(
        folderId,
        newParentFolderId
      );
      if (isCircular) {
        throw new Error("Cannot move folder: would create circular reference");
      }
    }

    const updateData: any = {};
    if (newParentFolderId !== null) {
      updateData.parentFolderId = newParentFolderId;
    }

    const updatedFolder = await this.updateWithParent(folderId, updateData);

    return updatedFolder;
  }

  private static async checkCircularReference(
    folderId: string,
    newParentId: string
  ): Promise<boolean> {
    const path = await this.getFolderPath(newParentId);
    return path.some((folder) => folder.id === folderId);
  }

  private static mapToFolder(row: any): Folder {
    const owner: User | undefined = row.owner_id
      ? {
          id: row.owner_id,
          email: row.owner_email,
          username: row.owner_username,
          firstName: row.owner_first_name,
          lastName: row.owner_last_name,
          password: "",
          role: "user" as any,
          isEmailVerified: false,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      : undefined;

    const folder: any = {
      id: row.id,
      name: row.name,
      description: row.description,
      parentFolderId: row.parent_folder_id,
      ownerId: row.owner_id,
      isPublic: row.is_public,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };

    if (owner) {
      folder.owner = owner;
    }

    return folder;
  }

  private static mapToFolderWithStats(row: any): Folder {
    const folder: any = {
      id: row.id,
      name: row.name,
      description: row.description,
      parentFolderId: row.parent_folder_id,
      ownerId: row.owner_id,
      isPublic: row.is_public,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      depth: row.depth,
      path: row.path,
    };

    if (row.owner_id) {
      folder.owner = {
        id: row.owner_id,
        email: row.owner_email,
        username: row.owner_username,
        firstName: row.owner_first_name,
        lastName: row.owner_last_name,
        password: "",
        role: "user" as any,
        isEmailVerified: false,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }

    if (row.total_files !== null) {
      folder.stats = {
        id: row.id,
        folderId: row.id,
        totalFiles: parseInt(row.total_files),
        totalSize: parseInt(row.total_size),
        lastUpdated: row.last_updated,
      };
    }

    return folder;
  }

  static async checkAccess(
    folderId: string,
    userId: string
  ): Promise<{
    canRead: boolean;
    canWrite: boolean;
    canAdmin: boolean;
  }> {
    const folder = await this.findById(folderId);
    if (!folder) {
      return { canRead: false, canWrite: false, canAdmin: false };
    }

    // Owner has full access
    if (folder.ownerId === userId) {
      return { canRead: true, canWrite: true, canAdmin: true };
    }

    // Public folders are readable
    if (folder.isPublic) {
      return { canRead: true, canWrite: false, canAdmin: false };
    }

    return { canRead: false, canWrite: false, canAdmin: false };
  }
}
