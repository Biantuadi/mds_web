import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./screens/Login";
import { Home } from "./screens/Home/Home";
import { Appointments } from "./screens/Appointments/Appointments";
import { ModuleDetail } from "./screens/ModuleDetail/ModuleDetail";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { store, persistor } from "./store";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/module/:id"
              element={
                <ProtectedRoute>
                  <ModuleDetail />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  </StrictMode>
);