import "./App.css";
import SideNavBar from "./components/SideNavbar/SideNav";

function App() {
  return (
    <div className="app-layout">
      {/* Sidebar */}
      <SideNavBar />

      {/* Main Content Area */}
      <main className="main-content">
        <h1>Dashboard</h1>
        <p>Welcome to PowerFit Gym Management System</p>
      </main>
    </div>
  );
}

export default App;
