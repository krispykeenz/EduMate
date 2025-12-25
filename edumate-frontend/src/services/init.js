import authService from './auth/auth';
import socketService from './websocket/socketService';
import { setupDemoApi } from '../demo/setupDemoApi';

const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true';

/**
 * Initialize services when the app starts
 */
export const initializeServices = () => {
  // Install HTTP mocks first so any initial data loads work without a backend.
  if (isDemoMode) {
    setupDemoApi();
  }

  // Only connect to WebSocket if user is authenticated
  if (authService.isAuthenticated()) {
    socketService.connect();
  }
};

/**
 * Cleanup services when user logs out
 */
export const cleanupServices = () => {
  console.log('Cleaning up services...');
  socketService.disconnect();
};

export default {
  initializeServices,
  cleanupServices
};