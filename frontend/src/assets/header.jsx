import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header-section">
      <div className="intro-copy">

        <span className="eyebrow">
          Computer Science & Engineering Student
        </span>

        <h1>
          Hi, I'm <span className="highlight">Satyaprajna Panda</span>
        </h1>

        <h2>
          Aspiring Software Engineer & Web Developer
        </h2>

        <p>
          B.Tech. Computer Science and Engineering student at GIET University, Gunupur, with a strong
          foundation in Python, Java, Data Structures & Algorithms and
          modern web technologies. Passionate about developing efficient,
          scalable and user-friendly applications.
        </p>

        <div className="hero-actions">
          <Link className="primary-button" to="/contact">
            Contact Me
          </Link>

          <Link className="secondary-button" to="/about">
            Learn More
          </Link>
        </div>

      </div>
    </header>
  );
}

export default Header;