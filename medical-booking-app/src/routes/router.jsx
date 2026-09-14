import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '../App'

// Bonus requirement: route-level lazy loading
const DoctorsPage = lazy(() => import('../pages/DoctorsPage'))
const DoctorDetailsPage = lazy(() => import('../pages/DoctorDetailsPage'))
const BookAppointmentPage = lazy(() => import('../pages/BookAppointmentPage'))
const AppointmentsPage = lazy(() => import('../pages/AppointmentsPage'))
const FavoritesPage = lazy(() => import('../pages/FavoritesPage'))
const ProfilePage = lazy(() => import('../pages/ProfilePage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // layout route: Navbar + <Outlet />
    children: [
      { index: true, element: <Navigate to="/doctors" replace /> },
      { path: 'doctors', element: <DoctorsPage /> },
      { path: 'doctors/:id', element: <DoctorDetailsPage /> },
      { path: 'book', element: <BookAppointmentPage /> },
      { path: 'appointments', element: <AppointmentsPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default router
