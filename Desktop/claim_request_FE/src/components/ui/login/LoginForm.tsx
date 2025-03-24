import { Link, useNavigate } from "react-router-dom";
import styles from "@components/ui/login/LoginForm.module.css";
import fot from "@assets/fot.png";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Typewriter } from "react-simple-typewriter";
import httpClient from "@/constant/apiInstance";
import { PATH } from "@/constant/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

async function loginUser(values: {
  username: string;
  password: string;
}): Promise<void> {
  const response = await httpClient.post("auth/login", values);
  if (response.status === 200) {
    const data = response.data as {
      tokens: { access: { token: string } };
      user: {
        user_id: string;
        role_id: number;
        username: string;
        user_status: number;
      };
    };
    localStorage.setItem("access_token", data.tokens.access.token);
    localStorage.setItem("username", data.user.username);
    localStorage.setItem("user_id", data.user.user_id);
    localStorage.setItem("count", "0");
    localStorage.setItem("role_id", data.user.role_id.toString());
    localStorage.setItem("user_status", data.user.user_status.toString());
  }
}

const approverFirstPage = PATH.pending;
const financeFirstPage = PATH.approvedFinance;
const claimerFirstPage = PATH.myClaims;
const adminFirstPage = PATH.projectInformation;

function LoginForm() {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const loginSchema = Yup.object().shape({
    username: Yup.string().required("Username is Required"),
    password: Yup.string().required("Password is Required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setFieldError, setSubmitting }) => {
      try {
        await loginUser(values);
        const user_status = localStorage.getItem("user_status");
        if (user_status === "2") {
          navigate("/change-password");
          return;
        }
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
          toast.error("Login failed");
        }
      } catch (error: any) {
        const errMsg =
          error.response?.data?.message ||
          error.message ||
          "Msg Login thất bại ngay chỗ onSubmit, không nhận thông báo từ backend đưa lên";
        if (errMsg.toLowerCase().includes("username")) {
          setFieldError("username", errMsg);
        } else if (errMsg.toLowerCase().includes("password")) {
          setFieldError("password", errMsg);
        } else {
          toast.error(errMsg);
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
              <Link to="">
                <img src={fot} alt="fot" />
              </Link>
            </div>
            <div className={styles.leftSideText}>
              <h1>Welcome</h1>
              <h3 className={styles.typewriterText}>
                <Typewriter
                  loop
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                  words={[
                    "We are glad to see you again! Get access to your Request",
                    "You're in. Let\u2019s go!",
                    "Ready? Let\u2019s get started!",
                    "All set. Continue now!",
                  ]}
                />
              </h3>
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
                  placeholder="Enter username"
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
