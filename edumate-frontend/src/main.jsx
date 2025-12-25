import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes/AppRoutes.jsx"; // point to your routes file
import { BrowserRouter, HashRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { initializeServices } from './services/init.js';
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';

const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true';
const Router = isDemoMode ? HashRouter : BrowserRouter;

// Initialize services on app startup
initializeServices();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <Router>
        <AppRoutes />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
