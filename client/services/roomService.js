import api from './api.js';
import { sanctuaryRooms } from './mockData.js';

const toUiRoom = (r) => ({
  id: r._id || r.id,
  name: r.name,
  location: r.location || '',
  image: (r.images && r.images[0]) || r.image,
  price: r.pricePerNight ?? r.price,
  capacity: r.capacity || 2,
  sizeSqFt: r.sizeSqFt || 0,
  type: r.type || '',
  description: r.description || '',
  amenities: r.amenities || [],
  badge: r.badge ? { label: r.badge, tone: r.badge === 'Popular' ? 'dark' : 'light' } : null,
  features: buildFeatures(r),
});

const buildFeatures = (r) => {
  const f = [];
  if (r.capacity) f.push({ icon: 'guests', label: `${r.capacity} Guests` });
  if (r.sizeSqFt) f.push({ icon: 'area', label: `${r.sizeSqFt} SQ FT` });
  if (r.amenities?.includes('Private Pool')) f.push({ icon: 'pool', label: 'Private Pool' });
  else if (r.amenities?.includes('Spa Access')) f.push({ icon: 'spa', label: 'Spa Access' });
  else if (r.amenities?.includes('Butler Service')) f.push({ icon: 'concierge', label: 'Butler Service' });
  return f.slice(0, 2);
};

export const getRooms = async () => {
  try {
    const { data } = await api.get('/rooms');
    return data.map(toUiRoom);
  } catch (err) {
    console.warn('API unavailable, using mock rooms.', err.message);
    return sanctuaryRooms;
  }
};

export const getRoomById = async (id) => {
  try {
    const { data } = await api.get(`/rooms/${id}`);
    return toUiRoom(data);
  } catch (err) {
    console.warn('API unavailable, using mock room.', err.message);
    return sanctuaryRooms.find((r) => r.id === id) || sanctuaryRooms[0];
  }
};
