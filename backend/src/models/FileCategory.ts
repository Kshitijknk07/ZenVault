import { postgresPool } from "../config/database";
import { FileCategory, FileTypeInfo } from "../types";

export class FileCategoryModel {
  static async findAll(): Promise<FileTypeInfo[]> {
    const query = `
      SELECT * FROM file_categories
      ORDER BY name ASC
    `;

    const result = await postgresPool.query(query);
    return result.rows.map((row: any) => this.mapToFileTypeInfo(row));
  }

  static async findByName(name: string): Promise<FileTypeInfo | null> {
    const query = `
      SELECT * FROM file_categories
      WHERE name = $1
    `;

    const result = await postgresPool.query(query, [name]);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapToFileTypeInfo(result.rows[0]);
  }

  static async findByExtension(
    extension: string
  ): Promise<FileTypeInfo | null> {
    const query = `
      SELECT * FROM file_categories
      WHERE $1 = ANY(extensions)
    `;

    const result = await postgresPool.query(query, [extension.toLowerCase()]);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapToFileTypeInfo(result.rows[0]);
  }

  static async findByMimeType(mimeType: string): Promise<FileTypeInfo | null> {
    const query = `
      SELECT * FROM file_categories
      WHERE $1 = ANY(mime_types)
    `;

    const result = await postgresPool.query(query, [mimeType]);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapToFileTypeInfo(result.rows[0]);
  }

  static async getCategoryForFile(
    filename: string,
    mimeType: string
  ): Promise<FileCategory> {
    // Try to get category by extension first
    const extension = filename.split(".").pop()?.toLowerCase();
    if (extension) {
      const categoryByExt = await this.findByExtension(extension);
      if (categoryByExt) {
        return categoryByExt.category;
      }
    }

    // Try to get category by MIME type
    const categoryByMime = await this.findByMimeType(mimeType);
    if (categoryByMime) {
      return categoryByMime.category;
    }

    // Default to 'other'
    return FileCategory.OTHER;
  }

  static async validateFileType(
    filename: string,
    mimeType: string,
    fileSize: number
  ): Promise<{
    isValid: boolean;
    category: FileCategory;
    maxSize: number;
    error?: string;
  }> {
    const extension = filename.split(".").pop()?.toLowerCase();
    let categoryInfo: FileTypeInfo | null = null;

    // Try to find category by extension
    if (extension) {
      categoryInfo = await this.findByExtension(extension);
    }

    // If not found by extension, try MIME type
    if (!categoryInfo) {
      categoryInfo = await this.findByMimeType(mimeType);
    }

    // If still not found, use 'other' category
    if (!categoryInfo) {
      const otherCategory = await this.findByName("other");
      if (otherCategory) {
        categoryInfo = otherCategory;
      } else {
        return {
          isValid: false,
          category: FileCategory.OTHER,
          maxSize: 104857600, // 100MB default
          error: "File type not supported",
        };
      }
    }

    // Check file size
    if (fileSize > categoryInfo.maxSize) {
      return {
        isValid: false,
        category: categoryInfo.category,
        maxSize: categoryInfo.maxSize,
        error: `File size exceeds maximum allowed size of ${this.formatBytes(categoryInfo.maxSize)}`,
      };
    }

    return {
      isValid: true,
      category: categoryInfo.category,
      maxSize: categoryInfo.maxSize,
    };
  }

  static async getSupportedExtensions(): Promise<
    Record<FileCategory, string[]>
  > {
    const categories = await this.findAll();
    const result: Record<FileCategory, string[]> = {
      [FileCategory.DOCUMENT]: [],
      [FileCategory.IMAGE]: [],
      [FileCategory.VIDEO]: [],
      [FileCategory.AUDIO]: [],
      [FileCategory.ARCHIVE]: [],
      [FileCategory.OTHER]: [],
    };

    categories.forEach((category) => {
      result[category.category] = category.extensions;
    });

    return result;
  }

  static async getSupportedMimeTypes(): Promise<
    Record<FileCategory, string[]>
  > {
    const categories = await this.findAll();
    const result: Record<FileCategory, string[]> = {
      [FileCategory.DOCUMENT]: [],
      [FileCategory.IMAGE]: [],
      [FileCategory.VIDEO]: [],
      [FileCategory.AUDIO]: [],
      [FileCategory.ARCHIVE]: [],
      [FileCategory.OTHER]: [],
    };

    categories.forEach((category) => {
      result[category.category] = category.mimeTypes;
    });

    return result;
  }

  private static mapToFileTypeInfo(row: any): FileTypeInfo {
    return {
      category: row.name as FileCategory,
      extensions: row.extensions || [],
      mimeTypes: row.mime_types || [],
      maxSize: Number(row.max_size),
      isPreviewable: row.is_previewable,
    };
  }

  private static formatBytes(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
}
