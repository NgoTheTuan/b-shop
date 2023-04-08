import styles from "./login.module.scss";
import Breadcrumb from "../../../../components/breadcrumb";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import AuthAction from "../../../../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { AuthService } from "../../../../network/authService";
import toast from "react-hot-toast";

function Login() {
  const setting = useSelector((state) => state?.setting);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const breadcrumb = [
    {
      id: 1,
      name: "Trang chủ",
      link: "/",
      text: false,
    },
    {
      id: 2,
      name: "Đăng nhập tài khoản",
      link: "",
      text: true,
    },
  ];

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Phải là một email hợp lệ")
      .max(255)
      .required("Không được bỏ trống email."),
    password: Yup.string()
      .min(6, "Mật khẩu có độ dài hơn 6 kí tự.")
      .required("Không được bỏ trống mật khẩu"),
  });

  const { errors, values, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        try {
          await AuthService.login(values).then((res) => {
            if (res.success) {
              if (res?.user?.isAdmin === false) {
                if (res?.user?.status === 1) {
                  dispatch({
                    type: AuthAction.LOGIN,
                    payload: {
                      token: res.accessToken,
                      user: res.user,
                    },
                  });
                  toast.success("Đăng nhập thành công !");
                  setTimeout(() => {
                    if (setting?.pathname) {
                      navigate(setting?.pathname);
                    } else {
                      navigate("/");
                    }
                  }, 500);
                } else {
                  toast.error("Tài khoản hiện đang bị khoá.");
                }
              } else {
                toast.error("Tài khoản hoặc mật khẩu không đúng.");
              }
            } else {
              toast.error("Tài khoản hoặc mật khẩu không đúng.");
            }
          });
        } catch {
          toast.error("Đăng nhập không thành công!");
        }
      },
    });

  return (
    <div className="container">
      <div>
        <Breadcrumb data={breadcrumb} />
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <div className={styles.pageLogin}>
            <div className={styles.login}>
              <div className={styles.titleHead}>Đăng Nhập</div>
            </div>

            <form noValidate onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formText}>
                <div className={styles.text}>Email *</div>
                <div className={styles.input}>
                  <input
                    name="email"
                    type="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email || ""}
                    error={Boolean(touched.email && errors.email)}
                    placeholder="Email..."
                  />
                  {touched.email && (
                    <p className={styles.error}>{errors.email}</p>
                  )}
                </div>
              </div>

              <div className={styles.formText}>
                <div className={styles.text}>Password *</div>
                <div className={styles.input}>
                  <input
                    name="password"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password || ""}
                    error={Boolean(touched.password && errors.password)}
                    placeholder="Mật khẩu..."
                  />
                  {touched.password && (
                    <p className={styles.error}>{errors.password}</p>
                  )}
                </div>
              </div>

              <div className={styles.btn}>
                <button type="submit">Đăng nhập</button>
              </div>
            </form>

            <div className={styles.link}>
              <Link to="/register">Đăng kí tài khoản.</Link>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
