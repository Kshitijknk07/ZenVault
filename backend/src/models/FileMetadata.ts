import { postgresPool } from "../config/database";
import { FileMetadata } from "../types";

export class FileMetadataModel {
  static async create(
    fileId: string,
    key: string,
    value: string
  ): Promise<FileMetadata> {
    const query = `
      INSERT INTO file_metadata (file_id, key, value)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const values = [fileId, key, value];
    const result = await postgresPool.query(query, values);
    return this.mapToFileMetadata(result.rows[0]);
  }

  static async findByFileId(fileId: string): Promise<FileMetadata[]> {
    const query = `
      SELECT * FROM file_metadata
      WHERE file_id = $1
      ORDER BY key ASC
    `;

    const result = await postgresPool.query(query, [fileId]);
    return result.rows.map((row: any) => this.mapToFileMetadata(row));
  }

  static async findByFileIdAndKey(
    fileId: string,
    key: string
  ): Promise<FileMetadata | null> {
    const query = `
      SELECT * FROM file_metadata
      WHERE file_id = $1 AND key = $2
    `;

    const result = await postgresPool.query(query, [fileId, key]);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapToFileMetadata(result.rows[0]);
  }

  static async update(
    fileId: string,
    key: string,
    value: string
  ): Promise<FileMetadata | null> {
    const query = `
      UPDATE file_metadata
      SET value = $3, updated_at = NOW()
      WHERE file_id = $1 AND key = $2
      RETURNING *
    `;

    const values = [fileId, key, value];
    const result = await postgresPool.query(query, values);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapToFileMetadata(result.rows[0]);
  }

  static async upsert(
    fileId: string,
    key: string,
    value: string
  ): Promise<FileMetadata> {
    const query = `
      INSERT INTO file_metadata (file_id, key, value)
      VALUES ($1, $2, $3)
      ON CONFLICT (file_id, key) DO UPDATE SET
        value = EXCLUDED.value,
        updated_at = NOW()
      RETURNING *
    `;

    const values = [fileId, key, value];
    const result = await postgresPool.query(query, values);
    return this.mapToFileMetadata(result.rows[0]);
  }

  static async delete(fileId: string, key: string): Promise<boolean> {
    const query = `
      DELETE FROM file_metadata
      WHERE file_id = $1 AND key = $2
    `;

    const result = await postgresPool.query(query, [fileId, key]);
    return (result.rowCount || 0) > 0;
  }

  static async deleteByFileId(fileId: string): Promise<boolean> {
    const query = `
      DELETE FROM file_metadata
      WHERE file_id = $1
    `;

    const result = await postgresPool.query(query, [fileId]);
    return (result.rowCount || 0) > 0;
  }

  static async searchByKeyValue(
    key: string,
    value: string
  ): Promise<FileMetadata[]> {
    const query = `
      SELECT * FROM file_metadata
      WHERE key = $1 AND value ILIKE $2
      ORDER BY created_at DESC
    `;

    const result = await postgresPool.query(query, [key, `%${value}%`]);
    return result.rows.map((row: any) => this.mapToFileMetadata(row));
  }

  static async getDistinctKeys(): Promise<string[]> {
    const query = `
      SELECT DISTINCT key FROM file_metadata
      ORDER BY key ASC
    `;

    const result = await postgresPool.query(query);
    return result.rows.map((row: any) => row.key);
  }

  private static mapToFileMetadata(row: any): FileMetadata {
    return {
      id: row.id,
      fileId: row.file_id,
      key: row.key,
      value: row.value,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
