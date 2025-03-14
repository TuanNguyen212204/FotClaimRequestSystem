import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styles from "@components/ui/login/LoginForm.module.css";
import fot from "@assets/fot.png";
import * as Yup from "yup";
import { useFormik } from "formik";
import httpClient from "@/constant/apiInstance";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PasswordProgress from "./PasswordProgress";

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

async function resetPasswordAPI(payload: {
  token: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<void> {
  try {
    await httpClient.post("auth/reset-password", payload);
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw error.response.data;
    }
    throw error;
  }
}

function CreateNewPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [globalError, setGlobalError] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/reset-password");
    }
  }, [token, navigate]);

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
            .oneOf([Yup.ref("password")], "Confirm Password does not matchhhh")
        : schema;
    }),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: createNewPassWordSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const payload = {
          token: token!,
          newPassword: values.password,
          confirmPassword: values.confirmPassword,
        };
        await resetPasswordAPI(payload);
        toast.success("Password reset successfully", {
          position: "top-right",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error: any) {
        if (error.errorCode === 3 || error.errorCode === 2) {
          toast.error(error.message, {
            position: "top-right",
            autoClose: 2000,
          });
        } else if (error.errorCode === 6) {
          setFieldError("password", error.message);
        } else if (error.errorCode === 5) {
          setFieldError("confirmPassword", error.message);
        } else {
          setGlobalError(error.message || "An error occurred");
        }
      } finally {
        setSubmitting(false);
      }
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
            {globalError && (
              <div className={styles.globalError}>{globalError}</div>
            )}
            <h1>Create new password</h1>

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
                        {valid ? "✓" : "*"} {criterion.label}
                      </div>
                    );
                  })}
                </div>
                <PasswordProgress validCount={countValidCriteria(formik.values.password)} />
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
              <Link to="/">Back to Login</Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateNewPassword;
