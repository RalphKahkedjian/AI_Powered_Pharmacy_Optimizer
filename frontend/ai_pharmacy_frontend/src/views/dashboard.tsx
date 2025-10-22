import "../assets/styles/dashboard.css";
import { useLogout } from "../services/AuthServices/logout";

export default function Dashboard() {
  const logout = useLogout()
  const username = localStorage.getItem("USER_USERNAME");

  console.log("User logged in as:", username);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">
          Pharma<span>AI</span>
        </h2>
        <nav className="nav-links">
          <a href="#" className="active">Dashboard</a>
          <a href="#">Analytics</a>
          <a href="#">Inventory</a>
          <a href="#">Prescriptions</a>
          <a href="#">Settings</a>
          <a href="#" onClick={logout}>Logout</a>
        </nav>
        <p className="sidebar-footer">© 2025 PharmaAI</p>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-bar">
          <h1>Welcome Back, {username} !</h1>
        </header>

        {/* Info Cards */}
        <section className="cards">
          <div className="card green">
            <h3>Optimization Score</h3>
            <p className="value">92%</p>
            <small>↑ 5% from last month</small>
          </div>

          <div className="card red">
            <h3>Inventory Alerts</h3>
            <p className="value">4</p>
            <small>Need restocking soon</small>
          </div>

          <div className="card blue">
            <h3>Predicted Demand</h3>
            <p className="value">+18%</p>
            <small>Expected in 30 days</small>
          </div>
        </section>

        {/* Chart Section */}
        <section className="chart-section">
          <h2>Medicine Demand Prediction</h2>
          <div className="chart-placeholder">📊 Chart Coming Soon</div>
        </section>

        <section className="activity-section">
          <h2>Recent Activity</h2>
          <ul className="activity-list">
            <li>
              <span>New AI optimization model deployed</span>
              <small>2 hrs ago</small>
            </li>
            <li>
              <span>Inventory restock suggested for “Aspirin”</span>
              <small>5 hrs ago</small>
            </li>
            <li>
              <span>System health check completed</span>
              <small>Yesterday</small>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
