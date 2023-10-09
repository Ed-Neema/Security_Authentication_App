
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/auth/ForgotPassword";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import StudentDashboard from "./pages/dashboards/StudentDashboard";
import FacilitatorDashboard from "./pages/dashboards/FacilitatorDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="auth/login" />
        <Route element={<SignUp />} path="auth/signup" />
        <Route element={<ForgotPassword />} path="auth/forgotpassword" />
        <Route element={<StudentDashboard />} path="student/dashboard" />
        <Route element={<FacilitatorDashboard />} path="facilitator/dashboard" />
        <Route element={<AdminDashboard />} path="admin/dashboard" />
      </Routes>
    </BrowserRouter>
  );
}

export default App
