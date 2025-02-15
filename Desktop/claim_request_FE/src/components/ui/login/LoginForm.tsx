import styles from "./LoginForm.module.css"
import { PATH } from "../../../constant/config";

function LoginForm() {
  return (
    <div>
      <div>
        <div className={styles.loginForm__overlay}></div>

        <div className={styles.loginForm__background}></div>

        <div className={styles.loginForm__form}>
          <div className={styles.loginForm__form__con1}>
            <div className={styles.loginForm__form__con2}>
              <div className={styles.loginForm__form__con2__title}>
                <h1>Member Login</h1>
              </div>

              <div className={styles.inputForm}>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter email or username"
                />
              </div>

              <div className={styles.inputForm}>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter password"
                />
              </div>

              <div className={styles.loginForm__forgotPassword}>
                <a href={PATH.resetPassword}>Forgot password ?</a>
              </div>

              <div className={styles.loginForm__btnLogin}>
                <button className={styles.buttonSignIn}>Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
