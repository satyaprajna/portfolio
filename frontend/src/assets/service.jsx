function service() {
  return (
    <section className="projects-section">
      <div className="section-header">
        <h2>Projects</h2>
        <p>
          Some of the projects I have developed using modern technologies.
        </p>
      </div>

      <div className="card-grid">

        <div className="card">
          <h3>Face Recognition Attendance System</h3>

          <ul>
            <li>Python</li>
            <li>OpenCV</li>
            <li>NumPy</li>
            <li>SQLite</li>
            <li>Real-time face detection and attendance tracking</li>
          </ul>
        </div>

        <div className="card">
          <h3>SwiftBuy E-Commerce Application</h3>

          <ul>
            <li>Java</li>
            <li>MySQL</li>
            <li>HTML, CSS, JavaScript</li>
            <li>User authentication and order management</li>
          </ul>
        </div>

      </div>
    </section>
  );
}

export default service;