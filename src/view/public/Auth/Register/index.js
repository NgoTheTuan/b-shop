import styles from "./register.module.scss";
import Breadcrumb from "../../../../components/breadcrumb";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../../../network/authService";
import toast from "react-hot-toast";

function Login() {
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
      name: "Đăng ký tài khoản",
      link: "",
      text: true,
    },
  ];

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Tên người dùng phải có 2 kí tự trở lên")
      .required("Không được để trống tên người dùng"),
    email: Yup.string()
      .email("Email không đúng định dạng")
      .max(255)
      .required("Không được để trống email"),
    password: Yup.string()
      .min(6, "Mật khẩu phải có 6 kí tự trở lên")
      .required("Không được để trống mật khẩu"),
  });

  const { errors, values, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        try {
          await AuthService.register(values).then((res) => {
            if (res.success) {
              toast.success("Đăng Ký thành công !");
              navigate("/login");
            } else {
              toast.error("Email đã được đăng ký!");
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
          <div className={styles.pageRegister}>
            <div className={styles.register}>
              <div className={styles.titleHead}>Đăng Ký</div>
            </div>

            <form noValidate onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formText}>
                <div className={styles.text}>Tên người dùng *</div>
                <div className={styles.input}>
                  <input
                    name="username"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username || ""}
                    error={Boolean(touched.username && errors.username)}
                    placeholder="Username..."
                  />
                  {touched.username && (
                    <p className={styles.error}>{errors.username}</p>
                  )}
                </div>
              </div>

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
                <div className={styles.text}>Mật khẩu *</div>
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
                <button type="submit">Đăng Ký</button>
              </div>
            </form>

            <div className={styles.link}>
              <Link to="/login">Đăng Nhập.</Link>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
