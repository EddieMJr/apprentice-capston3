import React from "react";
import "../pages/styles/Home.css";

function Home() {
  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="hero-container text-center">
        {/* Background Video */}
        <video className="hero-video" src="/hero-vid-pass.mp4" autoPlay loop muted playsInline/>

        {/* Dark Overlay */}
        <div className="hero-overlay"></div>

        {/* Hero Content */}
        <div className="hero-content px-4 py-5 my-5">
          <h1 className="display-5 fw-bold text-light">LockBox</h1>

          <div className="mx-auto" style={{ maxWidth: "42rem" }}>
            <p className="lead mb-4 text-light">
              Your first step towards stronger security.
            </p>

            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              {/* Use Bootstrap btn-primary and btn-light */}
              <button className="btn btn-primary btn-lg px-4">Take Quiz</button>
              <button className="btn btn-light btn-lg px-4">Mini Game</button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURETTES ================= */}

      <div className="container my-5">
        {/* Featurette 1 */}
        <div className="row featurette py-5 align-items-center">
          <div className="col-md-7">
            <h2 className="fw-bold">Detect Threats Like a Pro</h2>
            <h3 className="text-secondary mb-3">Stay ahead of attackers</h3>
            <p className="lead">
              Learn how to identify phishing attempts, social engineering tactics,
              and real-world cyber threats through hands-on challenges designed
              to sharpen your awareness.
            </p>
          </div>

          <div className="col-md-5">
            <img className="img-fluid rounded shadow" src="/security-feat.jpg" alt="Cyber threat detection"/>
          </div>
        </div>

        <hr className="featurette-divider" />

        {/* Featurette 2 */}
        <div className="row featurette py-5 align-items-center flex-md-row-reverse">
          <div className="col-md-7">
            <h2 className="fw-bold">Train Your Cyber Instincts</h2>
            <h3 className="text-secondary mb-3">Gamified security practice</h3>
            <p className="lead">
              Strengthen your ability to spot suspicious behavior with quick,
              interactive mini-games that simulate fast-paced cyber scenarios.
            </p>
          </div>

          <div className="col-md-5">
            <img className="img-fluid rounded shadow" src="/game-feat.jpg" alt="Cyber instincts training"/>
          </div>
        </div>

        <hr className="featurette-divider" />

        {/* Featurette 3 */}
        <div className="row featurette py-5 align-items-center">
          <div className="col-md-7">
            <h2 className="fw-bold">Strengthen Your Passwords</h2>
            <h3 className="text-secondary mb-3">Build unbreakable habits</h3>
            <p className="lead">
              Understand how attackers crack passwords, learn what makes a login
              truly secure, and test your knowledge through quizzes.
            </p>
          </div>

          <div className="col-md-5">
            <img className="img-fluid rounded shadow" src="/password-feat.jpg" alt="Password security training"/>
          </div>
        </div>

        <hr className="featurette-divider" />
      </div>
    </>
  );
}

export default Home;