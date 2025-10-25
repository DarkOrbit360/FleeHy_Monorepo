
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const globalForPrisma = globalThis;
if (!globalForPrisma._prisma) {
  globalForPrisma._prisma = new PrismaClient();
}
export const prisma = globalForPrisma._prisma;
export default prisma;
