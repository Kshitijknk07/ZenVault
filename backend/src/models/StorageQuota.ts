import { postgresPool } from "../config/database";
import { StorageQuota } from "../types";

export class StorageQuotaModel {
  static async create(
    userId: string,
    totalQuota: number
  ): Promise<StorageQuota> {
    const query = `
      INSERT INTO storage_quotas (user_id, total_quota, used_quota)
      VALUES ($1, $2, 0)
      RETURNING *
    `;

    const values = [userId, totalQuota];
    const result = await postgresPool.query(query, values);
    return this.mapToStorageQuota(result.rows[0]);
  }

  static async findByUserId(userId: string): Promise<StorageQuota | null> {
    const query = `
      SELECT * FROM storage_quotas
      WHERE user_id = $1
    `;

    const result = await postgresPool.query(query, [userId]);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapToStorageQuota(result.rows[0]);
  }

  static async updateQuota(
    userId: string,
    totalQuota: number
  ): Promise<StorageQuota | null> {
    const query = `
      UPDATE storage_quotas
      SET total_quota = $2, updated_at = NOW()
      WHERE user_id = $1
      RETURNING *
    `;

    const values = [userId, totalQuota];
    const result = await postgresPool.query(query, values);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapToStorageQuota(result.rows[0]);
  }

  static async getUsageStats(userId: string): Promise<{
    usedQuota: number;
    totalQuota: number;
    usagePercentage: number;
    remainingQuota: number;
  }> {
    const query = `
      SELECT used_quota, total_quota
      FROM storage_quotas
      WHERE user_id = $1
    `;

    const result = await postgresPool.query(query, [userId]);

    if (result.rows.length === 0) {
      return {
        usedQuota: 0,
        totalQuota: 10737418240, // 10GB default
        usagePercentage: 0,
        remainingQuota: 10737418240,
      };
    }

    const { used_quota, total_quota } = result.rows[0];
    const usagePercentage = (used_quota / total_quota) * 100;
    const remainingQuota = total_quota - used_quota;

    return {
      usedQuota: Number(used_quota),
      totalQuota: Number(total_quota),
      usagePercentage: Math.round(usagePercentage * 100) / 100,
      remainingQuota: Number(remainingQuota),
    };
  }

  static async checkQuotaExceeded(
    userId: string,
    fileSize: number
  ): Promise<boolean> {
    const stats = await this.getUsageStats(userId);
    return stats.usedQuota + fileSize > stats.totalQuota;
  }

  static async getQuotaRemaining(userId: string): Promise<number> {
    const stats = await this.getUsageStats(userId);
    return stats.remainingQuota;
  }

  private static mapToStorageQuota(row: any): StorageQuota {
    return {
      id: row.id,
      userId: row.user_id,
      totalQuota: Number(row.total_quota),
      usedQuota: Number(row.used_quota),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
