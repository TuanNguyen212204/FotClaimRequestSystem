import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "@components/ui/login/LoginForm.module.css";
import fot from "@assets/fot.png";
import * as Yup from "yup";
import { useFormik } from "formik";
import httpClient from "@/constant/apiInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PasswordProgress from "./PasswordProgress";
import { PATH } from "@/constant/config";

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

async function changePasswordAPI(
  payload: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  },
  token: string
): Promise<void> {
  try {
    await httpClient.post("auth/change-password", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw error.response.data;
    }
    throw error;
  }
}

const approverFirstPage = PATH.pending;
const financeFirstPage = PATH.approvedFinance;
const claimerFirstPage = PATH.myClaims;
const adminFirstPage = PATH.allUserInformation;

function ChangePassword() {
  const navigate = useNavigate();
  const [globalError, setGlobalError] = useState("");
  const token = localStorage.getItem("access_token");

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const changePasswordSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Old password is required"),
    newPassword: Yup.string()
      .required("New password is required")
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
    confirmPassword: Yup.string().when("newPassword", (password, schema) => {
      return password
        ? schema
            .required("Confirm Password is Required")
            .oneOf([Yup.ref("newPassword")], "Confirm Password does not match")
        : schema;
    }),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: changePasswordSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const payload = {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        };
        if (token) {
          await changePasswordAPI(payload, token);
          toast.success("Password changed successfully!", {
            position: "top-right",
            autoClose: 2000,
          });
        } else {
          toast.error("Không có token nhen", {
            position: "top-right",
            autoClose: 2000,
          });
        }

        setTimeout(() => {
          const role_id = localStorage.getItem("role_id");
          if (role_id === "1") {
            localStorage.setItem("selectedClaim", "usersetting");
            navigate(`${adminFirstPage}`);
          } else if (role_id === "2") {
            localStorage.setItem("selectedClaim", "pendingClaim");
            navigate(`${approverFirstPage}`);
          } else if (role_id === "3") {
            localStorage.setItem("selectedClaim", "approvedFinance");
            navigate(`${financeFirstPage}`);
          } else if (role_id === "4") {
            localStorage.setItem("selectedClaim", "all");
            navigate(`${claimerFirstPage}`);
          } else {
            toast.error("Không biết role là gì");
          }
        }, 3000);
      } catch (error: any) {
        if (
          error.errorCode === 1 ||
          error.errorCode === 4 ||
          error.errorCode === 6 ||
          error.errorCode === 7
        ) {
          toast.error(error.message, {
            position: "top-right",
            autoClose: 2000,
          });
        } else if (error.errorCode === 2) {
          setFieldError("newPassword", error.message);
        } else if (error.errorCode === 3) {
          setFieldError("confirmPassword", error.message);
        } else if (error.errorCode === 5) {
          setFieldError("currentPassword", error.message);
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
        <div className={styles.rightSide}>
          <div className={styles.rightSideContainer}>
            {globalError && (
              <div className={styles.globalError}>{globalError}</div>
            )}
            <h1>Change Password</h1>
            <div className={styles.passwordCriteria}>
              {passwordCriteria.map((criterion, index) => {
                const valid = criterion.test(formik.values.newPassword);
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
            <PasswordProgress
              validCount={countValidCriteria(formik.values.newPassword)}
            />
            <form onSubmit={formik.handleSubmit}>
              <div className={styles.inputForm}>
                <div className={styles.inputForm__message}>
                  <label htmlFor="currentPassword">Current Password</label>
                  {formik.touched.currentPassword &&
                    formik.errors.currentPassword && (
                      <div className={styles.label__error}>
                        {formik.errors.currentPassword}
                      </div>
                    )}
                </div>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  placeholder="Enter current password"
                  value={formik.values.currentPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className={styles.inputForm}>
                <div className={styles.inputForm__message}>
                  <label htmlFor="newPassword">New Password</label>
                  {formik.touched.newPassword && formik.errors.newPassword && (
                    <div className={styles.label__error}>
                      {formik.errors.newPassword}
                    </div>
                  )}
                </div>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="Enter new password"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className={styles.inputForm}>
                <div className={styles.inputForm__message}>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <div className={styles.label__error}>
                        {formik.errors.confirmPassword}
                      </div>
                    )}
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <button
                type="submit"
                className={styles.btnSubmitForm}
                disabled={
                  countValidCriteria(formik.values.newPassword) < 4 ||
                  (countValidCriteria(formik.values.newPassword) >= 4 &&
                    formik.values.newPassword !== formik.values.confirmPassword)
                }
              >
                Change Password
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

export default ChangePassword;
