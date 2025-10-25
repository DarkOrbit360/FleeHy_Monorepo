
# FleeHy Monorepo

This repository splits the app into **frontend** (Next.js) and **backend** (Express + Prisma) apps.

## Quick start (local)

```bash
# from repo root
npm i
cp apps/backend/.env.example apps/backend/.env
# edit DATABASE_URL inside .env to your Supabase URL
npm run dev
```
- Frontend: http://localhost:3000
- Backend:  http://localhost:4000

### Environment
- `apps/frontend/.env.example` -> `NEXT_PUBLIC_API_URL=http://localhost:4000`
- `apps/backend/.env` -> `DATABASE_URL=...`

## Deploy
- **Frontend** can be deployed to Vercel (project root: `apps/frontend`)
- **Backend** can be deployed to Render/Railway/AWS Lambda/ECS
- Or use `docker/` with `docker-compose`

## Structure
- `apps/frontend` – Next.js UI
- `apps/backend` – API service (REST), Prisma models
- `libs/` – place shared utilities if needed
