import { Search, Bell, Moon } from "lucide-react";

function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-search">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search your knowledge..."
        />

        <span>Ctrl K</span>
      </div>

      <div className="topbar-actions">
        <button aria-label="Notifications">
          <Bell size={19} />
        </button>

        <button aria-label="Appearance">
          <Moon size={19} />
        </button>

        <div className="user-avatar">
          K
        </div>
      </div>
    </header>
  );
}

export default Topbar;