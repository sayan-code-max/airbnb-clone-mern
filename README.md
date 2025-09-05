# Airbnb Clone (MERN) - Starter

This is a working MVP aligned with your capstone spec: authentication (JWT), property listings with CRUD + search, booking with availability check, user dashboard, responsive UI.

## Run locally
### API
```bash
cd server
cp .env.example .env
npm install
npm run seed   # optional demo data
npm run dev
```
### Client
```bash
cd ../client
npm install
echo "VITE_API_URL=http://localhost:5000/api" > .env
npm run dev
```
