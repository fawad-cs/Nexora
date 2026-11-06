export const categories = [
  {
    slug: 'lights',
    name: 'Smart Lights',
    description: 'Bulbs, strips and lamps you control from anywhere.',
  },
  {
    slug: 'cameras',
    name: 'Security Cameras',
    description: 'Crisp indoor and outdoor video with instant alerts.',
  },
  {
    slug: 'locks',
    name: 'Smart Door Locks',
    description: 'Keyless entry with fingerprint, code and app access.',
  },
  {
    slug: 'speakers',
    name: 'Smart Speakers',
    description: 'Rich sound with a built-in voice assistant.',
  },
  {
    slug: 'thermostats',
    name: 'Smart Thermostats',
    description: 'Stay comfortable and cut your energy bills.',
  },
  {
    slug: 'sensors',
    name: 'Smart Sensors',
    description: 'Motion, door, leak and temperature sensing.',
  },
]

export const getCategoryName = (slug) =>
  categories.find((category) => category.slug === slug)?.name ?? ''