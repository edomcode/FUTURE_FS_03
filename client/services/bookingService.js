import api from './api.js';

export const createBooking = async (payload) => {
  const { data } = await api.post('/bookings', payload);
  return data;
};

export const getMyBookings = async () => {
  const { data } = await api.get('/bookings/my');
  return data;
};

export const cancelBooking = async (id) => {
  const { data } = await api.put(`/bookings/${id}/cancel`);
  return data;
};
