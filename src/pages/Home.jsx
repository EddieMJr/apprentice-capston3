import React from "react";
import { Link } from "react-router-dom";
import "../pages/styles/Home.css";

function Home() {
  // Smooth scroll handler
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="hero-container text-center">
        <video className="hero-video" src="/hero-vid-pass.mp4" autoPlay loop muted playsInline />

        <div className="hero-overlay"></div>

        <div className="hero-content px-4 py-5 my-5">
          <h1 className="display-5 fw-bold text-light">LockBox</h1>

          <div className="mx-auto" style={{ maxWidth: "42rem" }}>
            <p className="lead mb-3 text-light">
              Your first step towards stronger security.
            </p>

            {/* smaller subheading */}
            <p className="subheading text-light mb-4">
              Select one to learn more.
            </p>

            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <button
                className="btn btn-primary btn-lg px-4"
                onClick={() => scrollToSection("featured-quiz")}
              >
                Knowledge Quiz
              </button>

              <button
                className="btn btn-light btn-lg px-4"
                onClick={() => scrollToSection("featured-password")}
              >
                Password Evaluator
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES WITH TITLE — QUIZ ================= */}
      <div className="container px-4 py-5 features-section" id="featured-quiz">
        <div className="row g-5 py-5 row-cols-1 row-cols-lg-2">
          <div className="col d-flex flex-column justify-content-start">
            <h2 className="fw-bold section-title">
              Strengthen Your Knowledge Through Interactive Quizzing
            </h2>

            <p className="lead mt-3 mb-4">
              Evaluate your understanding of password security through a
              self-paced quiz experience that reinforces best practices and
              strengthens your cybersecurity foundation. Login or register to get started.
            </p>

            {/* Two Buttons — internal links */}
            <div className="d-flex flex-column flex-sm-row gap-3">
              <Link to="/login/" className="btn btn-primary btn-lg w-100 w-sm-auto">
                Login
              </Link>
              <Link to="/register/" className="btn btn-primary btn-lg w-100 w-sm-auto">
                Register
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="col">
            <div className="row row-cols-1 row-cols-sm-2 g-4">
              <div className="col d-flex align-items-start feature-item">
                <i className="bi bi-check-circle-fill feature-icon"></i>
                <div>
                  <h5 className="fw-bold mb-1">Earn XP With Every Question</h5>
                  <p className="mb-0">
                    Gain points for correct answers and accelerate your progress.
                  </p>
                </div>
              </div>

              <div className="col d-flex align-items-start feature-item">
                <i className="bi bi-lightning-charge-fill feature-icon"></i>
                <div>
                  <h5 className="fw-bold mb-1">Advance Your Cyber Skills</h5>
                  <p className="mb-0">
                    Work through Novice, Intermediate, and Expert challenges.
                  </p>
                </div>
              </div>

              <div className="col d-flex align-items-start feature-item">
                <i className="bi bi-person-lines-fill feature-icon"></i>
                <div>
                  <h5 className="fw-bold mb-1">Monitor Your Growth Over Time</h5>
                  <p className="mb-0">
                    Track your improvement with account-based XP storage.
                  </p>
                </div>
              </div>

              <div className="col d-flex align-items-start feature-item">
                <i className="bi bi-trophy-fill feature-icon"></i>
                <div>
                  <h5 className="fw-bold mb-1">Compete on the Leaderboard</h5>
                  <p className="mb-0">
                    Rise through the rankings and showcase your mastery.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <hr className="my-5" />

      {/* ================= FEATURES WITH TITLE — PASSWORD CHECKER ================= */}
      <div className="container px-4 py-5 features-section" id="featured-password">
        <div className="row g-5 py-5 row-cols-1 row-cols-lg-2">
          <div className="col d-flex flex-column justify-content-start">
            <h2 className="fw-bold section-title">
              Evaluate the Strength of Your Password
            </h2>

            <p className="lead mt-3 mb-4">
              Assess your password’s resistance against modern attack techniques
              and receive private, secure recommendations to strengthen it. Login or register to get started.
            </p>

            {/* Two Buttons — internal links */}
            <div className="d-flex flex-column flex-sm-row gap-3">
              <Link to="/login/" className="btn btn-primary btn-lg w-100 w-sm-auto">
                Login
              </Link>
              <Link to="/register/" className="btn btn-primary btn-lg w-100 w-sm-auto">
                Register
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="col">
            <div className="row row-cols-1 row-cols-sm-2 g-4">

              <div className="col d-flex align-items-start feature-item">
                <i className="bi bi-shield-lock-fill feature-icon"></i>
                <div>
                  <h5 className="fw-bold mb-1">Comprehensive Security Analysis</h5>
                  <p className="mb-0">Identify potential weaknesses in your password.</p>
                </div>
              </div>

              <div className="col d-flex align-items-start feature-item">
                <i className="bi bi-tools feature-icon"></i>
                <div>
                  <h5 className="fw-bold mb-1">Actionable Improvement Tips</h5>
                  <p className="mb-0">
                    Receive practical guidance to improve your password’s strength.
                  </p>
                </div>
              </div>

              <div className="col d-flex align-items-start feature-item">
                <i className="bi bi-incognito feature-icon"></i>
                <div>
                  <h5 className="fw-bold mb-1">Privacy-First Approach</h5>
                  <p className="mb-0">Your password never leaves your device.</p>
                </div>
              </div>

              <div className="col d-flex align-items-start feature-item">
                <i className="bi bi-shield-check feature-icon"></i>
                <div>
                  <h5 className="fw-bold mb-1">Strengthen Your Security Habits</h5>
                  <p className="mb-0">Learn modern best practices for secure authentication.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;