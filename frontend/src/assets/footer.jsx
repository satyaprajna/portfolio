function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-container">

        {/* Profile */}
        <div className="footer-brand">
          <h2>Satyaprajna Panda</h2>

          <p>
            Computer Science & Engineering student at GIET University,
            passionate about Full Stack Development and building modern
            web applications.
          </p>
        </div>

        {/* Contact */}
        <div className="footer-column">
          <h3>Get In Touch</h3>

          <ul className="footer-links">
            <li>
              <a href="mailto:satyaprajnapanda980@gmail.com">
                satyaprajnapanda980@gmail.com
              </a>
            </li>

            <li>
              <a href="tel:+917377367597">
                +91 7377367597
              </a>
            </li>

            <li>Odisha, India</li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="footer-column">
          <h3>Connect With Me</h3>

          <div className="social-links">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>

            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>

            <a
              href="https://instagram.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram ↗
            </a>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>
          © 2026 Satyaprajna Panda. All Rights Reserved.
        </p>

        <p>
          Designed & Developed with React.
        </p>
      </div>
    </footer>
  );
}

export default Footer;