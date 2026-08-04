import { Routes, Route } from "react-router-dom";

import PublicLayout from "@/layouts/PublicLayout";

import Home from "@/pages/public/Home";
import Verify from "@/pages/public/Verify";
import Scanner from "@/pages/public/Scanner";

import Login from "@/pages/hawker/Login";
import Register from "@/pages/hawker/Register";
import QR from "@/pages/hawker/QR";
import Profile from "@/pages/hawker/Profile";

import HawkerRoute from "./HawkerRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/scan" element={<Scanner />} />
      </Route>

      {/* Hawker Auth */}
      <Route path="/hawker/login" element={<Login />} />

      {/* Protected Hawker Routes */}
      <Route
        path="/hawker/register"
        element={
          <HawkerRoute>
            <Register />
          </HawkerRoute>
        }
      />

      <Route
        path="/hawker/profile"
        element={
          <HawkerRoute>
            <Profile />
          </HawkerRoute>
        }
      />

      <Route
        path="/hawker/qr"
        element={
          <HawkerRoute>
            <QR />
          </HawkerRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;