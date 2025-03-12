import { Link, useNavigate } from "react-router-dom";
import styles from "@components/ui/login/LoginForm.module.css";
import fot from "@assets/fot.png";
import * as Yup from "yup";
import { useFormik } from "formik";

const passwordCriteria = [
  {
    label: "At least one lowercase letter",
    test: (password: string) => /[a-z]/.test(password),
  },
  {
    label: "At least one uppercase letter",
    test: (password: string) => /[A-Z]/.test(password),
  },
  {
    label: "At least one number",
    test: (password: string) => /[0-9]/.test(password),
  },
  {
    label: "At least one special character",
    test: (password: string) => /[@$!%*?&]/.test(password),
  },
  {
    label: "6 - 10 characters",
    test: (password: string) => /^.{6,10}$/.test(password),
  },
];

const countValidCriteria = (password: string): number => {
  return passwordCriteria.reduce(
    (count, crit) => (crit.test(password) ? count + 1 : count),
    0
  );
};

function CreateNewPassword() {
  const navigate = useNavigate();

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const createNewPassWordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is Required")
      .test("length-rule", "Password must be 6–10 characters", (value) =>
        value ? /^.{6,10}$/.test(value) : false
      )
      .test(
        "optional-rules",
        "Password must meet at least 3 of: lowercase, uppercase, number, special",
        (value) => {
          if (!value) return false;
          const optionalRules = [/[a-z]/, /[A-Z]/, /[0-9]/, /[@$!%*?&]/];
          const count = optionalRules.reduce(
            (acc, rule) => (rule.test(value) ? acc + 1 : acc),
            0
          );
          return count >= 3;
        }
      ),
    confirmPassword: Yup.string().when("password", (password, schema) => {
      return password
        ? schema
            .required("Confirm Password is Required")
            .oneOf([Yup.ref("password")], "Confirm Password does not match")
        : schema;
    }),
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
              Your new password must be different from previously used
              passwords.
            </p>

            <form onSubmit={formik.handleSubmit}>
              <div className={styles.inputForm}>
                <div className={styles.passwordCriteria}>
                  {passwordCriteria.map((criterion, index) => {
                    const valid = criterion.test(formik.values.password);
                    return (
                      <div
                        key={index}
                        className={valid ? styles.valid : styles.invalid}
                      >
                        {valid ? "✓" : "✗"} {criterion.label}
                      </div>
                    );
                  })}
                </div>
                <div className={styles.inputForm__message}>
                  <label htmlFor="password">Password</label>
                  {formik.touched.password && formik.errors.password && (
                    <div className={styles.label__error}>
                      {formik.errors.password}
                    </div>
                  )}
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter new password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              <div className={styles.inputForm}>
                <div className={styles.inputForm__message}>
                  <label htmlFor="confirmPassword">
                    Confirm-Password
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword && (
                        <span className={styles.label__error}>
                          {formik.errors.confirmPassword}
                        </span>
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
                  onBlur={formik.handleBlur}
                />
              </div>

              <button
                type="submit"
                className={styles.btnSubmitForm}
                disabled={
                  countValidCriteria(formik.values.password) < 4 ||
                  (countValidCriteria(formik.values.password) >= 4 &&
                    formik.values.password !== formik.values.confirmPassword)
                }
              >
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
