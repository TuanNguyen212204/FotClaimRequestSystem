import { Link, useNavigate } from "react-router-dom";
import styles from "@components/ui/login/LoginForm.module.css";
import fot from "@assets/fot.png";
import * as Yup from "yup";
import { useFormik } from "formik";

function LoginForm() {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is Required"),
    password: Yup.string()
      //6 đến 10
      .required("Password is Required")      
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: () => {
      navigate("/reset-password");
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        {/* Welcome Section */}
        <div className={styles.leftSide}>
          <div className={styles.mask}></div>
          <div className={styles.content}>
            <div className={styles.logo}>
              <Link to="">
                <img src={fot} alt="fot" />
              </Link>
            </div>
            <div className={styles.leftSideText}>
              <h1>Welcome</h1>
              <p>We are glad to see you again! Get access to your Request</p>
            </div>
          </div>
        </div>

        {/* Login Section */}
        <div className={styles.rightSide}>
          <div className={styles.rightSideContainer}>
            <h1>Member Login</h1>

            <form onSubmit={formik.handleSubmit}>
              <div className={styles.inputForm}>
                <div className={styles.inputForm__message}>
                  <label htmlFor="username">Username or Email</label>
                  <label htmlFor="username">
                    {formik.touched.username && formik.errors.username && (
                      <div className={styles.label__error}>
                        {formik.errors.username}
                      </div>
                    )}
                  </label>
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter email or username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
              </div>

              <div className={styles.inputForm}>
                <div className={styles.inputForm__message}>
                  <label htmlFor="password">Password</label>
                  <label htmlFor="password">
                    {formik.touched.password && formik.errors.password && (
                      <div className={styles.label__error}>
                        {formik.errors.password}
                      </div>
                    )}
                  </label>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </div>

              <div className={styles.options}>
                <div className={styles.rememberMe}>
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember Me</label>
                </div>
                <Link to="/reset-password">Forgot password ?</Link>
              </div>

              <button type="submit" className={styles.btnSubmitForm}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
