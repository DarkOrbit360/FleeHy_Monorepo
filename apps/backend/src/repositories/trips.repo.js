
import prisma from '../../lib/db.js';

export function findMany({ destination }) {
  return prisma.trip.findMany({
    where: destination ? { destination: { contains: destination, mode: 'insensitive' } } : undefined,
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: { planner: true }
  });
}

export function insert(data) {
  return prisma.trip.create({ data });
}
