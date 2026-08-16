function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        🩺 CAREAI
      </div>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/assessment">Assessment</a>
        <a href="/report">Report</a>
      </div>
    </nav>
  );
}

export default Navbar;