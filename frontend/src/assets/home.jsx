function Home() {
  return (
    <section className="home-section">

      <div className="hero">
        <div className="hero-content">

          <span className="hero-tag">
            Computer Science & Engineering Student
          </span>

          <h1>
            Hi, I'm <span className="highlight">Satyaprajna Panda</span>
          </h1>

          <h2>
            Aspiring Software Engineer & Full Stack Developer
          </h2>

          <p>
            Passionate about software development, problem-solving, and
            building modern web applications using contemporary technologies.
          </p>

          <div className="hero-buttons">
            <button className="hero-btn">
              View Projects
            </button>

            <button className="secondary-btn">
              Contact Me
            </button>
          </div>

        </div>
      </div>

      <div className="section-header">
        <h2>Core Expertise</h2>

        <p>
          Dedicated to continuous learning and developing efficient solutions.
        </p>
      </div>

      <div className="card-grid">

        <div className="card">
          <h3>Full Stack Development</h3>

          <ul>
            <li>React.js</li>
            <li>Node.js</li>
            <li>Express.js</li>
            <li>MongoDB</li>
            <li>MySQL</li>
          </ul>
        </div>

        <div className="card">
          <h3>Programming Skills</h3>

          <ul>
            <li>Python</li>
            <li>Java</li>
            <li>C / C++</li>
            <li>Object-Oriented Programming</li>
            <li>Data Structures & Algorithms</li>
          </ul>
        </div>

        <div className="card">
          <h3>Areas of Interest</h3>

          <ul>
            <li>Software Engineering</li>
            <li>Web Development</li>
            <li>Machine Learning</li>
            <li>Data Science</li>
            <li>Problem Solving</li>
          </ul>
        </div>

      </div>

    </section>
  );
}

export default Home;