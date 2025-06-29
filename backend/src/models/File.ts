import { postgresPool } from "../config/database";
import { File, FileVersion, User } from "../types";
import * as crypto from "crypto";
import * as fs from "fs";

export class FileModel {
  static async create(fileData: {
    name: string;
    originalName: string;
    description?: string;
    mimeType: string;
    size: number;
    filePath: string;
    folderId?: string;
    ownerId: string;
    isPublic?: boolean;
  }): Promise<File> {
    const query = `
      INSERT INTO files (name, original_name, description, mime_type, size, file_path, folder_id, owner_id, is_public)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;

    const values = [
      fileData.name,
      fileData.originalName,
      fileData.description,
      fileData.mimeType,
      fileData.size,
      fileData.filePath,
      fileData.folderId,
      fileData.ownerId,
      fileData.isPublic || false,
    ];

    const result = await postgresPool.query(query, values);
    return this.mapToFile(result.rows[0]);
  }

  static async findById(
    id: string,
    includeRelations = false
  ): Promise<File | null> {
    let query = `
      SELECT f.*, 
             u.id as owner_id, u.email as owner_email, u.username as owner_username,
             u.first_name as owner_first_name, u.last_name as owner_last_name
      FROM files f
      LEFT JOIN users u ON f.owner_id = u.id
      WHERE f.id = $1 AND f.is_deleted = false
    `;

    const result = await postgresPool.query(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    const file = this.mapToFile(result.rows[0]);

    if (includeRelations) {
      // Load current version
      const currentVersion = await this.getCurrentVersion(id);
      if (currentVersion) {
        file.currentVersion = currentVersion;
      }

      // Load all versions
      file.versions = await this.getVersions(id);
    }

    return file;
  }

  static async findByFolderId(folderId: string): Promise<File[]> {
    const query = `
      SELECT f.*, 
             u.id as owner_id, u.email as owner_email, u.username as owner_username,
             u.first_name as owner_first_name, u.last_name as owner_last_name
      FROM files f
      LEFT JOIN users u ON f.owner_id = u.id
      WHERE f.folder_id = $1 AND f.is_deleted = false
      ORDER BY f.name ASC
    `;

    const result = await postgresPool.query(query, [folderId]);
    return result.rows.map((row: any) => this.mapToFile(row));
  }

  static async findByOwnerId(
    ownerId: string,
    folderId?: string
  ): Promise<File[]> {
    let query = `
      SELECT f.*, 
             u.id as owner_id, u.email as owner_email, u.username as owner_username,
             u.first_name as owner_first_name, u.last_name as owner_last_name
      FROM files f
      LEFT JOIN users u ON f.owner_id = u.id
      WHERE f.owner_id = $1 AND f.is_deleted = false
    `;

    const values: any[] = [ownerId];

    if (folderId !== undefined) {
      query += ` AND f.folder_id = $2`;
      values.push(folderId);
    }

    query += ` ORDER BY f.created_at DESC`;

    const result = await postgresPool.query(query, values);
    return result.rows.map((row: any) => this.mapToFile(row));
  }

  static async update(
    id: string,
    updates: {
      name?: string;
      description?: string;
      isPublic?: boolean;
    }
  ): Promise<File | null> {
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
      UPDATE files 
      SET ${setClause.join(", ")}, updated_at = NOW()
      WHERE id = $${paramCount} AND is_deleted = false
      RETURNING *
    `;

    const result = await postgresPool.query(query, values);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapToFile(result.rows[0]);
  }

  static async softDelete(id: string): Promise<boolean> {
    const query = `
      UPDATE files 
      SET is_deleted = true, deleted_at = NOW(), updated_at = NOW()
      WHERE id = $1 AND is_deleted = false
    `;
    const result = await postgresPool.query(query, [id]);
    return (result.rowCount || 0) > 0;
  }

  static async hardDelete(id: string): Promise<boolean> {
    // First get the file to delete physical files
    const file = await this.findById(id);
    if (file) {
      // Delete physical files
      await this.deletePhysicalFile(file.filePath);

      // Delete all versions
      const versions = await this.getVersions(id);
      for (const version of versions) {
        await this.deletePhysicalFile(version.filePath);
      }
    }

    const query = "DELETE FROM files WHERE id = $1";
    const result = await postgresPool.query(query, [id]);
    return (result.rowCount || 0) > 0;
  }

  static async search(params: {
    query?: string;
    ownerId?: string;
    mimeType?: string;
    minSize?: number;
    maxSize?: number;
    isPublic?: boolean;
    folderId?: string;
    page?: number;
    limit?: number;
  }): Promise<{ files: File[]; total: number }> {
    let whereConditions: string[] = ["f.is_deleted = false"];
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

    if (params.mimeType) {
      whereConditions.push(`f.mime_type = $${paramCount++}`);
      values.push(params.mimeType);
    }

    if (params.minSize !== undefined) {
      whereConditions.push(`f.size >= $${paramCount++}`);
      values.push(params.minSize);
    }

    if (params.maxSize !== undefined) {
      whereConditions.push(`f.size <= $${paramCount++}`);
      values.push(params.maxSize);
    }

    if (params.isPublic !== undefined) {
      whereConditions.push(`f.is_public = $${paramCount++}`);
      values.push(params.isPublic);
    }

    if (params.folderId !== undefined) {
      whereConditions.push(`f.folder_id = $${paramCount++}`);
      values.push(params.folderId);
    }

    const whereClause = `WHERE ${whereConditions.join(" AND ")}`;

    // Count total
    const countQuery = `
      SELECT COUNT(*) as total
      FROM files f
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
      FROM files f
      LEFT JOIN users u ON f.owner_id = u.id
      ${whereClause}
      ORDER BY f.created_at DESC
      LIMIT $${paramCount++} OFFSET $${paramCount++}
    `;

    values.push(limit, offset);
    const result = await postgresPool.query(query, values);

    const files = result.rows.map((row: any) => this.mapToFile(row));

    return { files, total };
  }

  // Version Management
  static async createVersion(
    fileId: string,
    versionData: {
      filePath: string;
      size: number;
      mimeType: string;
      uploadedBy: string;
    }
  ): Promise<FileVersion> {
    // Get next version number
    const currentVersion = await this.getCurrentVersion(fileId);
    const versionNumber = currentVersion ? currentVersion.versionNumber + 1 : 1;

    // Calculate checksum
    const checksum = await this.calculateChecksum(versionData.filePath);

    const query = `
      INSERT INTO file_versions (file_id, version_number, file_path, size, mime_type, checksum, uploaded_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    const values = [
      fileId,
      versionNumber,
      versionData.filePath,
      versionData.size,
      versionData.mimeType,
      checksum,
      versionData.uploadedBy,
    ];

    const result = await postgresPool.query(query, values);
    return this.mapToFileVersion(result.rows[0]);
  }

  static async getCurrentVersion(fileId: string): Promise<FileVersion | null> {
    const query = `
      SELECT fv.*, 
             u.id as uploaded_by_id, u.email as uploaded_by_email, u.username as uploaded_by_username,
             u.first_name as uploaded_by_first_name, u.last_name as uploaded_by_last_name
      FROM file_versions fv
      LEFT JOIN users u ON fv.uploaded_by = u.id
      WHERE fv.file_id = $1
      ORDER BY fv.version_number DESC
      LIMIT 1
    `;

    const result = await postgresPool.query(query, [fileId]);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapToFileVersion(result.rows[0]);
  }

  static async getVersions(fileId: string): Promise<FileVersion[]> {
    const query = `
      SELECT fv.*, 
             u.id as uploaded_by_id, u.email as uploaded_by_email, u.username as uploaded_by_username,
             u.first_name as uploaded_by_first_name, u.last_name as uploaded_by_last_name
      FROM file_versions fv
      LEFT JOIN users u ON fv.uploaded_by = u.id
      WHERE fv.file_id = $1
      ORDER BY fv.version_number DESC
    `;

    const result = await postgresPool.query(query, [fileId]);
    return result.rows.map((row: any) => this.mapToFileVersion(row));
  }

  static async getVersion(
    fileId: string,
    versionNumber: number
  ): Promise<FileVersion | null> {
    const query = `
      SELECT fv.*, 
             u.id as uploaded_by_id, u.email as uploaded_by_email, u.username as uploaded_by_username,
             u.first_name as uploaded_by_first_name, u.last_name as uploaded_by_last_name
      FROM file_versions fv
      LEFT JOIN users u ON fv.uploaded_by = u.id
      WHERE fv.file_id = $1 AND fv.version_number = $2
    `;

    const result = await postgresPool.query(query, [fileId, versionNumber]);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapToFileVersion(result.rows[0]);
  }

  static async checkAccess(
    fileId: string,
    userId: string
  ): Promise<{
    canRead: boolean;
    canWrite: boolean;
    canAdmin: boolean;
  }> {
    const file = await this.findById(fileId);
    if (!file) {
      return { canRead: false, canWrite: false, canAdmin: false };
    }

    // Owner has full access
    if (file.ownerId === userId) {
      return { canRead: true, canWrite: true, canAdmin: true };
    }

    // Public files are readable
    if (file.isPublic) {
      return { canRead: true, canWrite: false, canAdmin: false };
    }

    // Check shared access (you'll need to implement FileShareModel)
    // const share = await FileShareModel.findByResource('file', fileId, userId);
    // if (share) {
    //   return {
    //     canRead: true,
    //     canWrite: share.permission === 'write' || share.permission === 'admin',
    //     canAdmin: share.permission === 'admin'
    //   };
    // }

    return { canRead: false, canWrite: false, canAdmin: false };
  }

  // Utility methods
  private static async calculateChecksum(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const hash = crypto.createHash("sha256");
      const stream = fs.createReadStream(filePath);

      stream.on("data", (data) => {
        hash.update(data);
      });

      stream.on("end", () => {
        resolve(hash.digest("hex"));
      });

      stream.on("error", (error) => {
        reject(error);
      });
    });
  }

  private static async deletePhysicalFile(filePath: string): Promise<void> {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      // Log error but don't throw
      console.error(`Error deleting file ${filePath}:`, error);
    }
  }

  private static mapToFile(row: any): File {
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

    const file: any = {
      id: row.id,
      name: row.name,
      originalName: row.original_name,
      description: row.description,
      mimeType: row.mime_type,
      size: row.size,
      filePath: row.file_path,
      folderId: row.folder_id,
      ownerId: row.owner_id,
      isPublic: row.is_public,
      isDeleted: row.is_deleted,
      deletedAt: row.deleted_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };

    if (owner) {
      file.owner = owner;
    }

    return file;
  }

  private static mapToFileVersion(row: any): FileVersion {
    const uploadedByUser: User | undefined = row.uploaded_by_id
      ? {
          id: row.uploaded_by_id,
          email: row.uploaded_by_email,
          username: row.uploaded_by_username,
          firstName: row.uploaded_by_first_name,
          lastName: row.uploaded_by_last_name,
          password: "",
          role: "user" as any,
          isEmailVerified: false,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      : undefined;

    const fileVersion: any = {
      id: row.id,
      fileId: row.file_id,
      versionNumber: row.version_number,
      filePath: row.file_path,
      size: row.size,
      mimeType: row.mime_type,
      checksum: row.checksum,
      uploadedBy: row.uploaded_by,
      createdAt: row.created_at,
    };

    if (uploadedByUser) {
      fileVersion.uploadedByUser = uploadedByUser;
    }

    return fileVersion;
  }
}
