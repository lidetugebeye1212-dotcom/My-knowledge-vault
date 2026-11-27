import {
  BookOpen,
  Folder,
  Star,
  Clock,
} from "lucide-react";

function Dashboard() {
  return (
    <div className="dashboard">

      <section className="welcome-section">
        <p className="welcome-label">
          YOUR PERSONAL KNOWLEDGE SPACE
        </p>

        <h1>Welcome back.</h1>

        <p>
          Keep learning, keep building, and never lose
          what you discover.
        </p>
      </section>

      <section className="stats-grid">

        <div className="stat-card">
          <Folder />
          <h2>0</h2>
          <p>Categories</p>
        </div>

        <div className="stat-card">
          <BookOpen />
          <h2>0</h2>
          <p>Knowledge topics</p>
        </div>

        <div className="stat-card">
          <Star />
          <h2>0</h2>
          <p>Favorites</p>
        </div>

        <div className="stat-card">
          <Clock />
          <h2>0</h2>
          <p>Recently opened</p>
        </div>

      </section>

      <section className="dashboard-section">
        <h2>Continue learning</h2>

        <p className="empty-state">
          Your recently opened knowledge will appear here.
        </p>
      </section>

    </div>
  );
}

export default Dashboard;