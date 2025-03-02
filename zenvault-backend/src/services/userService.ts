import { PrismaClient, User, ClerkUser } from '@prisma/client';
import { logger } from '../utils/logger';
import { hashPassword, comparePasswords } from '../utils/passwordUtils';

const prisma = new PrismaClient();

export interface UserCreateInput {
    email: string;
    password: string;
    role?: string;
}

export interface UserUpdateInput {
    email?: string;
    password?: string;
    role?: string;
}

export interface ClerkUserCreateInput {
    id: any;
    clerkId: string;
    email: string;
    name?: string;
    role?: string;
}

export class UserService {
    async createUser(data: UserCreateInput): Promise<User> {
        try {
            const existingUser = await prisma.user.findUnique({
                where: { email: data.email }
            });

            if (existingUser) {
                throw new Error('User with this email already exists');
            }

            const hashedPassword = await hashPassword(data.password);

            const user = await prisma.user.create({
                data: {
                    email: data.email,
                    password: hashedPassword,
                    role: data.role || 'USER'
                }
            });

            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword as User;
        } catch (error) {
            logger.error(`Error creating user: ${(error as Error).message}`);
            throw error;
        }
    }

    async createClerkUser(data: ClerkUserCreateInput): Promise<ClerkUser> {
        try {
            const existingUser = await prisma.clerkUser.findFirst({
                where: {
                    OR: [
                        { clerkId: data.clerkId },
                        { email: data.email }
                    ]
                }
            });

            if (existingUser) {
                throw new Error('User already exists');
            }

            const user = await prisma.clerkUser.create({
                data: {
                    id: data.id,
                    clerkId: data.clerkId,
                    email: data.email,
                    name: data.name,
                    role: data.role || 'USER'
                }
            });

            return user;
        } catch (error) {
            logger.error(`Error creating Clerk user: ${(error as Error).message}`);
            throw error;
        }
    }

    async updateUser(userId: string, data: UserUpdateInput): Promise<User> {
        try {
            const user = await prisma.user.findUnique({
                where: { id: userId }
            });

            if (!user) {
                throw new Error('User not found');
            }

            let updateData: any = { ...data };
            if (data.password) {
                updateData.password = await hashPassword(data.password);
            }

            const updatedUser = await prisma.user.update({
                where: { id: userId },
                data: updateData
            });

            const { password, ...userWithoutPassword } = updatedUser;
            return userWithoutPassword as User;
        } catch (error) {
            logger.error(`Error updating user: ${(error as Error).message}`);
            throw error;
        }
    }

    async updateClerkUser(clerkId: string, data: Partial<ClerkUserCreateInput>): Promise<ClerkUser> {
        try {
            const user = await prisma.clerkUser.findUnique({
                where: { clerkId }
            });

            if (!user) {
                throw new Error('User not found');
            }

            const updatedUser = await prisma.clerkUser.update({
                where: { clerkId },
                data
            });

            return updatedUser;
        } catch (error) {
            logger.error(`Error updating Clerk user: ${(error as Error).message}`);
            throw error;
        }
    }

    async deleteUser(userId: string): Promise<void> {
        try {
            const user = await prisma.user.findUnique({
                where: { id: userId }
            });

            if (!user) {
                throw new Error('User not found');
            }

            await prisma.user.delete({
                where: { id: userId }
            });
        } catch (error) {
            logger.error(`Error deleting user: ${(error as Error).message}`);
            throw error;
        }
    }

    async deleteClerkUser(clerkId: string): Promise<void> {
        try {
            const user = await prisma.clerkUser.findUnique({
                where: { clerkId }
            });

            if (!user) {
                throw new Error('User not found');
            }

            await prisma.clerkUser.delete({
                where: { clerkId }
            });
        } catch (error) {
            logger.error(`Error deleting Clerk user: ${(error as Error).message}`);
            throw error;
        }
    }

    async getUserById(userId: string): Promise<User | null> {
        try {
            const user = await prisma.user.findUnique({
                where: { id: userId }
            });

            if (!user) {
                return null;
            }

            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword as User;
        } catch (error) {
            logger.error(`Error getting user: ${(error as Error).message}`);
            throw error;
        }
    }

    async getClerkUserById(clerkId: string): Promise<ClerkUser | null> {
        try {
            return await prisma.clerkUser.findUnique({
                where: { clerkId },
                select: {
                    id: true,
                    clerkId: true,
                    email: true,
                    name: true,
                    role: true,
                    createdAt: true
                }
            });
        } catch (error) {
            logger.error(`Error getting Clerk user: ${(error as Error).message}`);
            throw error;
        }
    }

    async getUserByEmail(email: string): Promise<User | null> {
        try {
            const user = await prisma.user.findUnique({
                where: { email }
            });

            if (!user) {
                return null;
            }

            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword as User;
        } catch (error) {
            logger.error(`Error getting user by email: ${(error as Error).message}`);
            throw error;
        }
    }

    async getAllUsers(page: number = 1, limit: number = 10): Promise<{
        users: User[];
        total: number;
        page: number;
        totalPages: number;
    }> {
        try {
            const skip = (page - 1) * limit;
            const [users, total] = await Promise.all([
                prisma.user.findMany({
                    skip,
                    take: limit,
                    orderBy: { createdAt: 'desc' }
                }),
                prisma.user.count()
            ]);

            const sanitizedUsers = users.map(user => {
                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword as User;
            });

            return {
                users: sanitizedUsers,
                total,
                page,
                totalPages: Math.ceil(total / limit)
            };
        } catch (error) {
            logger.error(`Error getting users: ${(error as Error).message}`);
            throw error;
        }
    }

    async validateUserCredentials(email: string, password: string): Promise<User | null> {
        try {
            const user = await prisma.user.findUnique({
                where: { email }
            });

            if (!user) {
                return null;
            }

            const isValid = await comparePasswords(password, user.password);
            if (!isValid) {
                return null;
            }

            const { password: _, ...userWithoutPassword } = user;
            return userWithoutPassword as User;
        } catch (error) {
            logger.error(`Error validating user credentials: ${(error as Error).message}`);
            throw error;
        }
    }
}