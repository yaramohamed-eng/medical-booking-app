<img width="1366" height="768" alt="Screenshot (48)" src="https://github.com/user-attachments/assets/4951eefe-532c-45f7-9c9e-b376451c2a97" />
<img width="1366" height="768" alt="Screenshot (47)" src="https://github.com/user-attachments/assets/4736e04a-87c9-4f21-adff-5f0490f47480" />
<img width="1366" height="768" alt="Screenshot (46)" src="https://github.com/user-attachments/assets/03f7b19e-4071-4f37-af35-caddb481010b" />
<img width="1366" height="768" alt="Screenshot (45)" src="https://github.com/user-attachments/assets/d5a70e25-f6a5-492b-8b79-e0766d283718" />
<img width="1366" height="768" alt="Screenshot (44)" src="https://github.com/user-attachments/assets/3e4948cd-5d2e-417c-9711-1bba8d1d3b76" />
<img width="1366" height="768" alt="Screenshot (43)" src="https://github.com/user-attachments/assets/9e87f4d3-4cde-4e45-bbd4-f8f9bceb4eac" />
<img width="1366" height="768" alt="Screenshot (42)" src="https://github.com/user-attachments/assets/78f12ff2-b8c4-4a68-a02b-48ab684ba7da" />
<img width="1366" height="768" alt="Screenshot (41)" src="https://github.com/user-attachments/assets/0b90d249-5e42-4194-a80f-ebf7de4696df" />
<img width="1366" height="768" alt="Screenshot (40)" src="https://github.com/user-attachments/assets/e6e3a326-d4bb-447e-a46b-44a216fad321" />
<img width="1366" height="768" alt="Screenshot (39)" src="https://github.com/user-attachments/assets/c4d045b5-3557-4e04-8ee4-d1c3a12bde86" />
<img width="1366" height="768" alt="Screenshot (38)" src="https://github.com/user-attachments/assets/b15d60ad-32b8-4fc1-8ab0-5785d1341420" />
# MediCare Booking App

A small medical appointment booking application built with React, React Router,
Zustand, Axios, and React Hook Form — a training project simulating the experience
of one patient using a booking service.

## Live Demo

🔗 [medical-booking-app-five.vercel.app](https://medical-booking-app-five.vercel.app)

> Note: Doctors and appointments data is served live via [my-json-server](https://my-json-server.typicode.com), based on this repo's db.json. Booking/editing/deleting works but changes are not permanently saved (per my-json-server's free tier).

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
