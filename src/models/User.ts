import { Pool } from "pg";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { postgresPool } from "@/config/database";
import { User, UserRole } from "@/types";
import logger from "@/config/logger";

export class UserModel {
  private pool: Pool;

  constructor() {
    this.pool = postgresPool;
  }

  async create(
    userData: Omit<User, "id" | "createdAt" | "updatedAt" | "lastLoginAt">
  ): Promise<User> {
    const client = await this.pool.connect();

    try {
      await client.query("BEGIN");

      // Hash password
      const saltRounds = parseInt(process.env["BCRYPT_ROUNDS"] || "12");
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

      const query = `
        INSERT INTO users (id, email, username, first_name, last_name, password, role, is_email_verified, is_active, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
        RETURNING *
      `;

      const values = [
        uuidv4(),
        userData.email.toLowerCase(),
        userData.username.toLowerCase(),
        userData.firstName,
        userData.lastName,
        hashedPassword,
        userData.role,
        userData.isEmailVerified,
        userData.isActive,
      ];

      const result = await client.query(query, values);
      await client.query("COMMIT");

      return this.mapDatabaseUserToUser(result.rows[0]);
    } catch (error) {
      await client.query("ROLLBACK");
      logger.error("Error creating user:", error);
      throw error;
    } finally {
      client.release();
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const query = "SELECT * FROM users WHERE email = $1";
      const result = await this.pool.query(query, [email.toLowerCase()]);

      return result.rows.length > 0
        ? this.mapDatabaseUserToUser(result.rows[0])
        : null;
    } catch (error) {
      logger.error("Error finding user by email:", error);
      throw error;
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      const query = "SELECT * FROM users WHERE id = $1";
      const result = await this.pool.query(query, [id]);

      return result.rows.length > 0
        ? this.mapDatabaseUserToUser(result.rows[0])
        : null;
    } catch (error) {
      logger.error("Error finding user by ID:", error);
      throw error;
    }
  }

  async findByUsername(username: string): Promise<User | null> {
    try {
      const query = "SELECT * FROM users WHERE username = $1";
      const result = await this.pool.query(query, [username.toLowerCase()]);

      return result.rows.length > 0
        ? this.mapDatabaseUserToUser(result.rows[0])
        : null;
    } catch (error) {
      logger.error("Error finding user by username:", error);
      throw error;
    }
  }

  async updateLastLogin(userId: string): Promise<void> {
    try {
      const query = "UPDATE users SET last_login_at = NOW() WHERE id = $1";
      await this.pool.query(query, [userId]);
    } catch (error) {
      logger.error("Error updating last login:", error);
      throw error;
    }
  }

  async updateEmailVerification(
    userId: string,
    isVerified: boolean
  ): Promise<void> {
    try {
      const query =
        "UPDATE users SET is_email_verified = $1, updated_at = NOW() WHERE id = $2";
      await this.pool.query(query, [isVerified, userId]);
    } catch (error) {
      logger.error("Error updating email verification:", error);
      throw error;
    }
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    try {
      const saltRounds = parseInt(process.env["BCRYPT_ROUNDS"] || "12");
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      const query =
        "UPDATE users SET password = $1, updated_at = NOW() WHERE id = $2";
      await this.pool.query(query, [hashedPassword, userId]);
    } catch (error) {
      logger.error("Error updating password:", error);
      throw error;
    }
  }

  async updateProfile(
    userId: string,
    updates: Partial<Pick<User, "firstName" | "lastName" | "username">>
  ): Promise<User> {
    const client = await this.pool.connect();

    try {
      await client.query("BEGIN");

      const updateFields: string[] = [];
      const values: any[] = [];
      let paramCount = 1;

      if (updates.firstName) {
        updateFields.push(`first_name = $${paramCount++}`);
        values.push(updates.firstName);
      }

      if (updates.lastName) {
        updateFields.push(`last_name = $${paramCount++}`);
        values.push(updates.lastName);
      }

      if (updates.username) {
        updateFields.push(`username = $${paramCount++}`);
        values.push(updates.username.toLowerCase());
      }

      if (updateFields.length === 0) {
        throw new Error("No fields to update");
      }

      updateFields.push(`updated_at = NOW()`);
      values.push(userId);

      const query = `
        UPDATE users 
        SET ${updateFields.join(", ")}
        WHERE id = $${paramCount}
        RETURNING *
      `;

      const result = await client.query(query, values);
      await client.query("COMMIT");

      return this.mapDatabaseUserToUser(result.rows[0]);
    } catch (error) {
      await client.query("ROLLBACK");
      logger.error("Error updating user profile:", error);
      throw error;
    } finally {
      client.release();
    }
  }

  async deactivateUser(userId: string): Promise<void> {
    try {
      const query =
        "UPDATE users SET is_active = false, updated_at = NOW() WHERE id = $1";
      await this.pool.query(query, [userId]);
    } catch (error) {
      logger.error("Error deactivating user:", error);
      throw error;
    }
  }

  async activateUser(userId: string): Promise<void> {
    try {
      const query =
        "UPDATE users SET is_active = true, updated_at = NOW() WHERE id = $1";
      await this.pool.query(query, [userId]);
    } catch (error) {
      logger.error("Error activating user:", error);
      throw error;
    }
  }

  async verifyPassword(userId: string, password: string): Promise<boolean> {
    try {
      const query = "SELECT password FROM users WHERE id = $1";
      const result = await this.pool.query(query, [userId]);

      if (result.rows.length === 0) {
        return false;
      }

      return await bcrypt.compare(password, result.rows[0].password);
    } catch (error) {
      logger.error("Error verifying password:", error);
      throw error;
    }
  }

  private mapDatabaseUserToUser(dbUser: any): User {
    return {
      id: dbUser.id,
      email: dbUser.email,
      username: dbUser.username,
      firstName: dbUser.first_name,
      lastName: dbUser.last_name,
      password: dbUser.password,
      role: dbUser.role as UserRole,
      isEmailVerified: dbUser.is_email_verified,
      isActive: dbUser.is_active,
      lastLoginAt: dbUser.last_login_at
        ? new Date(dbUser.last_login_at)
        : undefined,
      createdAt: new Date(dbUser.created_at),
      updatedAt: new Date(dbUser.updated_at),
    };
  }
}

export default new UserModel();
