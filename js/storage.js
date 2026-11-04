// Storage Manager: handles localStorage CRUD operations for bookings and theme preferences
const STORAGE_KEYS = {
  REGISTRATIONS: 'pulse_sphere_registrations',
  THEME: 'pulse_sphere_theme'
};

const StorageManager = {
  // Retrieve all registrations from localStorage
  getRegistrations() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading registrations from localStorage:', e);
      return [];
    }
  },

  // Save a new registration
  saveRegistration(registration) {
    try {
      const registrations = this.getRegistrations();
      // Ensure unique ID, timestamp, and QR code token
      const newEntry = {
        id: registration.id || 'TICK-' + Math.floor(100000 + Math.random() * 900000),
        registeredAt: new Date().toISOString(),
        ...registration
      };
      registrations.unshift(newEntry);
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));
      return newEntry;
    } catch (e) {
      console.error('Error saving registration to localStorage:', e);
      return null;
    }
  },

  // Delete a registration by ID
  deleteRegistration(id) {
    try {
      let registrations = this.getRegistrations();
      registrations = registrations.filter(r => r.id !== id);
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));
      return true;
    } catch (e) {
      console.error('Error deleting registration:', e);
      return false;
    }
  },

  // Get a specific registration by ID
  getRegistrationById(id) {
    const list = this.getRegistrations();
    return list.find(r => r.id === id) || null;
  },

  // Theme preferences
  getTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
  },

  setTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }
};
