import React from "react";

export default function Footer() {
  return (
    <footer className="footer bg-light py-4 border-top mt-5">
      <div className="container d-flex flex-wrap justify-content-between align-items-center">

        {/* Logo or brand name */}
        <a 
          href="/" 
          className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none fs-5 fw-bold"
        >
          LockBox
        </a>

        <span className="mb-3 mb-md-0 text-body-secondary">
          © 2025 LockBox
        </span>

        {/* Social Media Icons */}
        <ul className="nav">
          <li className="ms-3">
            <a 
              className="text-body-secondary social-icon"
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-instagram fs-4"></i>
            </a>
          </li>

          <li className="ms-3">
            <a 
              className="text-body-secondary social-icon"
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-facebook fs-4"></i>
            </a>
          </li>

          <li className="ms-3">
            <a 
              className="text-body-secondary social-icon"
              href="https://github.com/EddieMJr/apprentice-capston3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-github fs-4"></i>
            </a>
          </li>
        </ul>

      </div>
    </footer>
  );
}
