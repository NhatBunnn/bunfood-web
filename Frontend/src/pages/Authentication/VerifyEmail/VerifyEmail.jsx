import { Link } from "react-router-dom";
import styles from "./VerifyEmail.module.css";

const VerifyEmail = () => {
  const email = "your@email.com"; // ví dụ email tĩnh

  return (
    <div
      className={`d-flex align-items-center justify-content-center min-vh-100 ${styles.bgGradient}`}
    >
      <div className={`card shadow-lg mx-auto ${styles.cardContainer}`}>
        <div className="card-header text-center bg-white border-0">
          <div className="d-flex justify-content-center mb-3">
            <div
              className={`d-flex align-items-center justify-content-center ${styles.iconCircle}`}
            >
              <span className={styles.iconMail}>📧</span>
            </div>
          </div>
          <h3 className="fw-bold mb-1">Verify Your Email</h3>
          <p className="text-muted">
            We've sent a 6-digit verification code to
            <br />
            <span className="fw-semibold text-dark">{email}</span>
          </p>
        </div>

        <div className="card-body">
          <div className="mb-3 text-center">
            <input
              type="text"
              placeholder="Enter 6-digit code"
              className={`form-control text-center fs-4 ${styles.codeInput}`}
            />
          </div>

          <button className="btn btn-primary w-100 py-2 fw-semibold mb-3">
            Verify Email
          </button>

          <div className="text-center">
            <button className="btn btn-link text-decoration-none fw-semibold mb-3">
              Resend verification code
            </button>
            <div>
              <Link
                to="/login"
                className="text-muted text-decoration-none d-inline-flex align-items-center"
              >
                <span className="me-1">←</span>
                Back to login
              </Link>
            </div>
          </div>

          <div className={`mt-4 p-3 rounded ${styles.demoBox}`}>
            <p className="mb-0 text-muted small">
              Demo: Enter any 6-digit code to verify
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
