import { Link } from "react-router-dom";
import styles from "@components/ui/login/LoginForm.module.css";
import fot from "@assets/fot.png";

function CheckMail() {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        {/* Welcome Section */}
        <div className={styles.leftSide}>
          <div className={styles.mask}></div>
          <div className={styles.content}>
            <div className={styles.logo}>
              <Link to="/">
                <img src={fot} alt="fot" />
              </Link>
            </div>
            <div className={styles.leftSideText}>
              <h1>Don't worry,</h1>

              <p>We are here help you to recover your password.</p>
            </div>
          </div>
        </div>

        {/* Login Section */}
        <div className={styles.rightSide}>
          <div className={styles.rightSideContainer}>
            <h1>Check your mail</h1>

            <p>
              We have sent a link to your email address. Please click on the
              link to reset your password.
            </p>

            <Link to="/create-new-password">
              <button type="submit" className={styles.btnSubmitForm}>
                Open email app
              </button>
            </Link>
            <div className={styles.backToLogin}>
              <Link to="/login">Back to Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckMail;
