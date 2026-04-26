# Pocket Reviews Hub (Split Deployment)

This repo is now split into two deployable apps:

- `frontend/` -> deploy to Vercel
- `backend/` -> deploy to Railway

## Local development

Run backend:

```bash
npm run dev:backend
```

Run frontend:

```bash
npm run dev:frontend
```

Frontend expects backend at `VITE_API_BASE_URL`.

## Environment variables

### Frontend (`frontend/.env`)

- `VITE_CLERK_PUBLISHABLE_KEY`
- `VITE_API_BASE_URL` (example: `https://your-railway-url.up.railway.app`)

### Backend (`backend/.env`)

- `MONGODB_URI`
- `MONGODB_DB_NAME`
- `ADMIN_EMAIL`
- `PORT`
- `FRONTEND_ORIGIN` (example: `https://your-vercel-app.vercel.app`)

## Deploy flow

1. Deploy `backend/` on Railway.
2. Copy Railway URL.
3. Set `VITE_API_BASE_URL` in Vercel frontend env.
4. Set `FRONTEND_ORIGIN` in Railway backend env to your Vercel domain.
5. Redeploy both.

This CORS + base URL setup keeps frontend and backend connected seamlessly across hosts.
