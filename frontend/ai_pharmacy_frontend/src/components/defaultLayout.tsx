import { Navigate, Outlet, NavLink, useLocation } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import "../assets/styles/dashboard.css";
import { useLogout } from "../services/AuthServices/logout";

export default function DefaultLayout() {
  const { token } = useStateContext();
  const logout = useLogout();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" />;
  }

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
      case "/dashboard":
        return "Analytics";
      case "/inventory":
        return "Inventory";
      case "/suppliers":
        return "Suppliers";
      case "/settings":
        return "Settings";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo" style={{ color: "whitesmoke" }}>
          PharmaAI
        </h2>

        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Analytics
          </NavLink>
          <NavLink to="/inventory" className={({ isActive }) => (isActive ? "active" : "")}>
            Inventory
          </NavLink>
          <NavLink to="/prescriptions" className={({ isActive }) => (isActive ? "active" : "")}>
            Prescriptions
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => (isActive ? "active" : "")}>
            Settings
          </NavLink>
        </nav>

        <p className="sidebar-footer">© 2025 PharmaAI</p>
      </aside>

      {/* Main Area */}
      <main className="main-content">
        <header className="top-bar">
          <h2>{getPageTitle()}</h2>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </header>

        <Outlet />
      </main>
    </div>
  );
}
