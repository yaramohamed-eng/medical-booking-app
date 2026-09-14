# MediCare Booking App

A small medical appointment booking application built with React, React Router,
Zustand, Axios, and React Hook Form — a training project simulating the experience
of one patient using a booking service.

## Tech Stack

- **React** + **Vite**
- **React Router v6** (data-mode router, nested layout route, dynamic params, 404 page)
- **Zustand** (favorites, theme, profile, toast feedback)
- **Axios** (all REST calls, centralized in `src/services/api.js`)
- **React Hook Form** (booking form, validation, edit mode)
- **json-server** as the fake REST API/backend
- **Tailwind CSS** for styling

## Project Structure

```
src/
├── components/     Navbar, DoctorCard, AppointmentCard, Toast, ConfirmDialog
├── pages/          DoctorsPage, DoctorDetailsPage, BookAppointmentPage,
│                   AppointmentsPage, ProfilePage, NotFoundPage
├── services/       api.js (Axios instance + endpoint functions)
├── stores/         useAppStore.js (Zustand global store)
├── routes/         router.jsx (React Router configuration)
├── App.jsx         Layout route (Navbar + Outlet + Toast)
└── main.jsx        App entry point
```

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the fake REST API (json-server) — keep this running in its own terminal:

   ```bash
   npm run server
   ```

   This serves `db.json` at `http://localhost:3001` with two resources:
   - `GET /doctors`, `GET /doctors/:id`
   - `GET /appointments`, `POST /appointments`, `PUT /appointments/:id`, `DELETE /appointments/:id`

3. In a second terminal, start the React app:

   ```bash
   npm run dev
   ```

4. Open the URL Vite prints (usually `http://localhost:5173`).

## Features Implemented

### Core requirements
- Doctors list fetched via Axios, with a **controlled** search input and specialty filter pills
- Doctor details page using a React Router dynamic route parameter (`/doctors/:id`)
- Book Appointment form built with **React Hook Form** (validation + error messages),
  plus one **uncontrolled** field (Insurance Number) wired with `useRef`
- Full appointment CRUD: create, read, update/reschedule, delete (with a confirmation dialog)
- Loading / error / empty states across API-driven pages
- Zustand global store for favorite doctors, theme (light/dark), and profile info
- Toast feedback after booking, editing, and deleting
- Responsive layout (desktop + mobile) with a centered, sticky Navbar layout route
- Custom 404 page for unmatched routes
- Navy + gold visual identity applied consistently across the app

### Bonus features
- ✅ Favorite doctors stored with Zustand, persisted to `localStorage`
- ✅ Dark / light theme toggle, persisted to `localStorage`
- ✅ Pagination on the Doctors page (4 per page)
- ✅ Debounced search (`useDebounce` hook, 400ms)
- ✅ Route-level lazy loading with `React.lazy` + `Suspense`
- ✅ Skeleton loading cards + staggered fade-in animation for doctor cards

## Notes

- No custom backend or authentication was built, per the project requirements —
  `json-server` plays the role of the REST API.
- This project treats the app as the experience of a single patient (no
  patient/doctor/admin roles).
