import styles from "./LoginForm.module.css"
import { PATH } from "../../../constant/config";

function ResetPassword() {
  return (
    <div>
      <div>
        <div className={styles.loginForm__overlay}></div>

        <div className={styles.loginForm__background}></div>

        <div className={styles.loginForm__form}>
          <div className={styles.resetPassword__form__con1}>
            <div className={styles.resetPassword__form}>
              <div className={styles.resetPassword__form__con2__title}>
                <h1>Forgot Password</h1>
              </div>
              <div className={styles.resetPassword__form__con2__content}>
                <h3>
                  Please enter your email address or  <br />
                  username and we will email you a link <br />
                  to reset your password 
                </h3>
              </div>

              <div className={styles.inputForm}>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter email or username"
                />
              </div>

              {/* <div className={styles.inputForm}>
                <input
                  type="password"
                  name="old_password"
                  id="old_password"
                  placeholder="Enter old password"
                />
              </div>

              <div className={styles.inputForm}>
                <input
                  type="password"
                  id="new_password"
                  name="new_password"
                  placeholder="Enter new password"
                />
              </div>

              <div className={styles.inputForm}>
                <input
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  placeholder="Enter confirm password"
                />
              </div> */}

              <div className={styles.resetPassword__btnSubmit}>
                <button className={styles.buttonSubmit}>Send Email</button>
              </div>
              <div className={styles.resetPassword__backToLogin}>
                <a href={PATH.login}>Back to Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
