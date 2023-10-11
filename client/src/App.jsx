import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/auth/ForgotPassword";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import StudentDashboard from "./pages/dashboards/StudentDashboard";
import FacilitatorDashboard from "./pages/dashboards/FacilitatorDashboard";
// import AdminDashboard from "./pages/dashboards/AdminDashboard";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import CreateRequest from "./pages/dashboards/CreateRequest";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import RequestFullView from "./pages/dashboards/RequestFullView";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<Login />} path="auth/login" />
          <Route element={<SignUp />} path="auth/signup" />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<StudentDashboard />} path="student/dashboard" />
          <Route
            element={<FacilitatorDashboard />}
            path="facilitator/dashboard"
          />
          <Route element={<AdminDashboard />} path="admin/dashboard" />
          <Route element={<CreateRequest />} path="create/request" />
          <Route element={<RequestFullView />} path="request/:id" />
        </Route>
        {/* <Route element={<ForgotPassword />} path="auth/forgotpassword" /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
