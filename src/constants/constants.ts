export const BACKEND_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

export const firebaseConfig = {
  apiKey: API_KEY,
};
