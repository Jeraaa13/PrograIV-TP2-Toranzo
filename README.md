# Social Network (Programacion IV, TP2)

Full-stack social network built for the Programacion IV course at UTN. Users register, post
content with images, comment, and follow activity through an admin stats dashboard. Approved
project.

## Features

- JWT authentication (register/login), route guards on both frontend and backend
- Create, view, and comment on posts, with image uploads via Cloudinary
- User profile page
- Admin dashboard: user management and stats/charts (Chart.js)
- Server-side rendering (Angular Universal) on the frontend

## Stack

**Backend:** NestJS 11, MongoDB via Mongoose, JWT, bcrypt, Cloudinary
**Frontend:** Angular 21 (SSR), Bootstrap, Chart.js, SweetAlert2

## Structure

```
backend/    NestJS API: auth, usuarios, publicaciones, comentarios, cloudinary modules
frontend/   Angular app: posts feed, profile, admin dashboards, auth
```

## Running locally

```bash
# backend
cd backend
npm install
npm run start:dev

# frontend
cd frontend
npm install
npm start
```

The backend needs a `.env` file with:

```
MONGO_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```
