// Next.js API route: search trips by destination (partial, case-insensitive)
// Uses Prisma client at lib/prisma.js

import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const q = (req.query.destination || "").toString();

  try {
    const trips = await prisma.trip.findMany({
      where: q
        ? {
            OR: [
              { destination: { contains: q, mode: "insensitive" } },
              { title: { contains: q, mode: "insensitive" } },
              { description: { contains: q, mode: "insensitive" } },
            ],
          }
        : {},
      include: {
        planner: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 30,
    });

    res.status(200).json(
      trips.map((t) => ({
        id: t.id,
        title: t.title,
        destination: t.destination,
        price: t.price,
        duration: t.duration,
        description: t.description,
        images: t.images,
        planner: t.planner,
        slug: t.slug,
        createdAt: t.createdAt,
      }))
    );
  } catch (e) {
    console.error("API /api/trips error:", e);
    res.status(500).json({ error: "Failed to fetch trips" });
  }
}
