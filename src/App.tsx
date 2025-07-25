import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import HomePage from "./pages/HomePage";
import BusesPage from "./pages/BusesPage";
import DriversPage from "./pages/DriversPage";
import BusRoutesPage from "./pages/BusRoutesPage";
import ProfilePage from "./pages/ProfilePage";
import ParentsPage from "./pages/ParentsPage";
import StudentsByRoute from "./components/Routes/StudentsByRoute/StudentsByRoute";

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="buses" element={<BusesPage />} />
          <Route path="drivers" element={<DriversPage />} />
          <Route path="routes" element={<BusRoutesPage />} />
          <Route path="parents" element={<ParentsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route
            path="routes/:routeId/students"
            element={<StudentsByRoute />}
          />
        </Route>
        <Route path="/auth" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
