import { Link, useNavigate } from "react-router-dom";
import styles from "@components/ui/login/LoginForm.module.css";
import fot from "@assets/fot.png";
import * as Yup from "yup";
import { useFormik } from "formik";

function ResetPassword() {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  const resetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid Email")
      .required("Email is Required")
      .test(
        "includes-@fpt",
        "Email must be included '@fpt'",
        (value) => (value ? value.includes("@fpt") : false)
      ),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: resetPasswordSchema,
    onSubmit: () => {
      navigate("/check-to-mail");
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
            <h1>Reset Password</h1>

            <p>
              Please enter your email address or username and we will email you
              a link to reset your password
            </p>

            <form onSubmit={formik.handleSubmit}>
              <div className={styles.inputForm}>
                <div className={styles.inputForm__message}>
                  <label htmlFor="email">Email</label>
                  <label htmlFor="email">
                    {formik.touched.email && formik.errors.email && (
                      <div className={styles.label__error}>
                        {formik.errors.email}
                      </div>
                    )}
                  </label>
                </div>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </div>

              <button type="submit" className={styles.btnSubmitForm}>
                Continue
              </button>
            </form>
            <div className={styles.backToLogin}>
              <Link to="/login">Back to Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
