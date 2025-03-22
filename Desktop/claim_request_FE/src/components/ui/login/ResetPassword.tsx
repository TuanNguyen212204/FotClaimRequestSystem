import { Link, useNavigate } from "react-router-dom";
import styles from "@components/ui/login/LoginForm.module.css";
import fot from "@assets/fot.png";
import * as Yup from "yup";
import { useFormik } from "formik";
import httpClient from "@/constant/apiInstance";
import LoadingOverlay from "@/components/ui/Loading/LoadingOverlay";
import { useEffect, useState } from "react";
import { LoadingProvider } from "../Loading/LoadingContext";

async function sendResetEmail(values: { email: string }): Promise<void> {
  try {
    const response = await httpClient.post("auth/forgot-password", values);
    const data = response.data as { errorCode: number; message: string };
    if (data.errorCode === 1 || data.errorCode === 6) {
      throw new Error(data.message);
    }
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
  }
}
function ResetPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const initialValues = {
    email: "",
  };

  const resetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is Required")
      .test("includes-@fpt", "Email must be include @fpt", (value) =>
        value ? value.includes("@fpt") : false
      ),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: resetPasswordSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        setIsLoading(true);
        await sendResetEmail(values);
        navigate("/check-to-mail");
      } catch (error: any) {
        setFieldError(
          "email",
          error.message || "Error trong catch chỗ onSubmit của useFormil"
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <LoadingProvider>
          <LoadingOverlay></LoadingOverlay>
        </LoadingProvider>
      </div>
    );
  }

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
              <Link to="/">Back to Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
