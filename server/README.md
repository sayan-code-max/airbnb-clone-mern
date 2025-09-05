# Airbnb Clone API (MERN)

## Quickstart
1) `cp .env.example .env` and fill values
2) `npm install`
3) Run MongoDB locally (or set MONGO_URI to your cluster)
4) (Optional) `npm run seed`
5) `npm run dev`

### Routes
- `POST /api/auth/register` {name,email,password}
- `POST /api/auth/login` {email,password}
- `GET /api/listings?q=&city=&country=&minPrice=&maxPrice=&guests=`
- `POST /api/listings` (auth)
- `PUT /api/listings/:id` (auth)
- `DELETE /api/listings/:id` (auth)
- `GET /api/listings/:id`
- `POST /api/bookings` (auth) {listingId,startDate,endDate,guests}
- `GET /api/bookings/me` (auth)
- `POST /api/bookings/:id/cancel` (auth)
