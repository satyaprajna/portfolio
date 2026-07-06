function About() {
  return (
    <section className="about-section">
      <div className="section-header">
        <span className="about-tag">About Me</span>

        <h2>Software Developer & Problem Solver</h2>

        <p>
          Computer Science and Engineering student passionate about software
          development, problem-solving, and modern web technologies.
        </p>
      </div>

      <div className="card-grid">

        {/* Education */}
        <div className="card">
          <h3>Education</h3>

          <ul>
            <li>B.Tech. CSE, GIET University (2023-2027)</li>
            <li>Current CGPA: 8.00</li>
          </ul>
        </div>

        {/* Technical Skills */}
        <div className="card">
          <h3>Technical Skills</h3>

          <ul>
            <li>Python</li>
            <li>Java</li>
            <li>C / C++</li>
            <li>HTML, CSS, JavaScript</li>
            <li>React.js</li>
            <li>Node.js & Express.js</li>
            <li>MongoDB & MySQL</li>
            <li>Data Structures & Algorithms</li>
          </ul>
        </div>

        {/* Certifications */}
        <div className="card">
          <h3>Certifications</h3>

          <ul>
            <li>NPTEL Cloud Computing</li>
            <li>AI Internship - EduVersity</li>
            <li>ML Internship - PrepRight</li>
            <li>Simplilearn - Introduction to AI</li>
            <li>Simplilearn - Project Management 101</li>
          </ul>
        </div>

        {/* Projects */}
        <div className="card">
          <h3>Projects</h3>

          <ul>
            <li>Face Recognition Attendance System</li>
            <li>SwiftBuy E-Commerce Web Application</li>
            <li>Full Stack Web Development Projects</li>
          </ul>
        </div>

        {/* Areas of Interest */}
        <div className="card">
          <h3>Areas of Interest</h3>

          <ul>
            <li>Full Stack Web Development</li>
            <li>Software Engineering</li>
            <li>Machine Learning</li>
            <li>Data Science</li>
            <li>Problem Solving</li>
          </ul>
        </div>

        {/* Career Objective */}
        <div className="card">
          <h3>Career Objective</h3>

          <ul>
            <li>Aspiring Software Engineer</li>
            <li>Continuous learner</li>
            <li>Passionate about scalable applications</li>
            <li>Interested in innovative technologies</li>
          </ul>
        </div>

      </div>
    </section>
  );
}

export default About;