import { Navigate, Outlet, NavLink, useLocation } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import "../assets/styles/dashboard.css";
import { useLogout } from "../services/AuthServices/logout";

export default function DefaultLayout() {
  const { token } = useStateContext();
  const logout = useLogout();
  const location = useLocation();

  const rawUsername = localStorage.getItem("USER_USERNAME") || "User";
const firstName = rawUsername.split(" ")[0];
const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return `Good Morning, ${firstName}`;
  if (hour >= 12 && hour < 18) return `Good Afternoon, ${firstName}`;
  return `Good Evening, ${firstName}`;
};

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
      case "/profile":
        return "Profile";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo" style={{ color: "whitesmoke", textAlign: "center" }}>
          {getGreeting() + " !"}
        </h2>

        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Analytics
          </NavLink>
          <NavLink to="/inventory" className={({ isActive }) => (isActive ? "active" : "")}>
            Inventory
          </NavLink>
          <NavLink to="/suppliers" className={({ isActive }) => (isActive ? "active" : "")}>
            Suppliers
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
            Profile
          </NavLink>
        </nav>

        <p className="sidebar-footer">© 2025 PharmaAI</p>
      </aside>

      {/* Main Area */}
      <main className="main-content">
        <header className="top-bar">
          <h1>{getPageTitle()}</h1>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </header>

        <Outlet />
      </main>
    </div>
  );
}
