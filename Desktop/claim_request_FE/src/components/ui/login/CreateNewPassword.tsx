import { Link, useNavigate } from "react-router-dom";
import styles from "@components/ui/login/LoginForm.module.css";
import fot from "@assets/fot.png";
import * as Yup from "yup";
import { useFormik } from "formik";

function CreateNewPassword() {
  const navigate = useNavigate();

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const createNewPassWordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is Required")
      .min(6, "Password must be at least 6 characters")
      .max(10, "Password must be at most 10 characters")
      .test("Password must be strong", "Password must be strong", (value) => {
        const regex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
        return regex.test(value);
      }),
    confirmPassword: Yup.string()
      .required("Confirm Password is Required")
      .oneOf(
        [Yup.ref("password")],
        "Confirm Passwords must match with Password"
      ),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: createNewPassWordSchema,
    onSubmit: () => {
      navigate("/login");
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
            <h1>Create new password</h1>

            <p>
              Your new password must be different from previous used passwords.
            </p>

            <form onSubmit={formik.handleSubmit}>
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
                  placeholder="Enter new password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </div>

              <div className={styles.inputForm}>
                <div className={styles.inputForm__message}>
                  <label htmlFor="confirmPassword">Confirm-Password</label>
                  <label htmlFor="confirmPassword">
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword && (
                        <div className={styles.label__error}>
                          {formik.errors.confirmPassword}
                        </div>
                      )}
                  </label>
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Enter confirm password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                />
              </div>

              <button type="submit" className={styles.btnSubmitForm}>
                Reset Password
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

export default CreateNewPassword;
