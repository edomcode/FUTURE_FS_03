require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Room = require('./models/Room');

const rooms = [
  {
    roomNumber: 'LR-101',
    name: 'The Heritage Suite',
    location: 'Florence, Italy',
    type: 'Royal Suites',
    description: 'A heritage-inspired suite with sweeping panoramic views.',
    pricePerNight: 850,
    capacity: 2,
    sizeSqFt: 850,
    amenities: ['Ocean View', 'Butler Service', 'Spa Access'],
    images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1000&q=80'],
    badge: 'Popular',
  },
  {
    roomNumber: 'LR-102',
    name: 'Azure Ocean Villa',
    location: 'Maldives',
    type: 'Garden Villas',
    description: 'An overwater sanctuary with a private infinity pool.',
    pricePerNight: 1450,
    capacity: 4,
    sizeSqFt: 1400,
    amenities: ['Private Pool', 'Ocean View'],
    images: ['https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1000&q=80'],
  },
  {
    roomNumber: 'LR-103',
    name: 'Grand Residence',
    location: 'London, UK',
    type: 'Penthouse',
    description: 'A grand residence in the heart of London with skyline views.',
    pricePerNight: 2100,
    capacity: 6,
    sizeSqFt: 2200,
    amenities: ['Butler Service', 'Spa Access'],
    images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80'],
    badge: 'Newly Added',
  },
  {
    roomNumber: 'LR-104',
    name: 'Zen Garden Sanctuary',
    location: 'Kyoto, Japan',
    type: 'Garden Villas',
    description: 'A serene retreat blending tradition with modern comfort.',
    pricePerNight: 650,
    capacity: 2,
    sizeSqFt: 700,
    amenities: ['Spa Access'],
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'],
  },
  {
    roomNumber: 'LR-105',
    name: 'Skyline Penthouse',
    location: 'New York, USA',
    type: 'Penthouse',
    description: 'Floor-to-ceiling skyline views and curated furnishings.',
    pricePerNight: 1750,
    capacity: 2,
    sizeSqFt: 1200,
    amenities: ['Butler Service', 'Spa Access'],
    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80'],
  },
  {
    roomNumber: 'LR-106',
    name: 'Royal Heritage Suite',
    location: 'Provence, France',
    type: 'Royal Suites',
    description: 'Classical elegance with private terrace overlooking vineyards.',
    pricePerNight: 3550,
    capacity: 2,
    sizeSqFt: 1600,
    amenities: ['Butler Service', 'Ocean View'],
    images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80'],
  },
  {
    roomNumber: 'LR-107',
    name: 'Cliffside Executive',
    location: 'Santorini, Greece',
    type: 'Executive Rooms',
    description: 'Whitewashed elegance perched above the Aegean.',
    pricePerNight: 980,
    capacity: 2,
    sizeSqFt: 720,
    amenities: ['Ocean View'],
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80'],
  },
  {
    roomNumber: 'LR-108',
    name: 'Alpine Hideaway',
    location: 'St. Moritz, Switzerland',
    type: 'Executive Rooms',
    description: 'Mountain views with a private fireside lounge.',
    pricePerNight: 1180,
    capacity: 3,
    sizeSqFt: 850,
    amenities: ['Spa Access'],
    images: ['https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=1000&q=80'],
  },
];

(async () => {
  try {
    await connectDB();
    await Room.deleteMany({});
    const created = await Room.insertMany(rooms);
    console.log(`Seeded ${created.length} rooms`);
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
})();
