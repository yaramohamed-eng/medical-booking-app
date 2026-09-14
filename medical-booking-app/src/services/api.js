import axios from 'axios'

// json-server runs on port 3001 (see package.json "server" script)
const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 8000,
})

// ---------- Doctors ----------
export const getDoctors = () => api.get('/doctors').then((res) => res.data)

export const getDoctorById = (id) =>
  api.get(`/doctors/${id}`).then((res) => res.data)

// ---------- Appointments ----------
export const getAppointments = () =>
  api.get('/appointments').then((res) => res.data)

export const getAppointmentById = (id) =>
  api.get(`/appointments/${id}`).then((res) => res.data)

export const createAppointment = (payload) =>
  api.post('/appointments', payload).then((res) => res.data)

export const updateAppointment = (id, payload) =>
  api.put(`/appointments/${id}`, payload).then((res) => res.data)

export const deleteAppointment = (id) =>
  api.delete(`/appointments/${id}`).then((res) => res.data)

export default api
