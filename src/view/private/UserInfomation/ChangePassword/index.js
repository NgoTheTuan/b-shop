import styles from "./changepassword.module.scss";
import { useFormik } from "formik";
import { AuthService } from "../../../../network/authService";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

function ChangePassword() {
  const { id } = useParams();

  const initialValues = {
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Mật khẩu phải lớn hơn 6 kí tự")
      .required("Không được bỏ trống mật khẩu!"),
    newPassword: Yup.string()
      .min(6, "Mật khẩu mới phải lớn hơn 6 kí tự")
      .required("Không được bỏ trống mật khẩu mới!"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Nhập lại mật khẩu không khớp")
      .required("Không được bỏ trống mật khẩu nhập lại!"),
  });

  const {
    errors,
    values,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await AuthService.changePassword({
          userId: id,
          password: values?.password.trim(),
          newPassword: values?.newPassword.trim(),
        }).then((res) => {
          if (res.success) {
            resetForm();
            toast.success("Đổi mật khẩu thành công thành công !");
          } else {
            toast.error("Mật khẩu không chính xác không đúng.");
          }
        });
      } catch {
        toast.error("Lỗi hệ thống vui lòng thử lại");
      }
    },
  });

  return (
    <div className={styles.information}>
      <div className={styles.title}>Đổi mật khẩu</div>

      <form noValidate onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formText}>
          <div className={styles.text}>Mật khẩu hiện tại *</div>
          <div className={styles.input}>
            <input
              name="password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password || ""}
              error={Boolean(touched.password && errors.password)}
              placeholder="Mật khẩu hiện tại..."
            />
            {touched.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>
        </div>

        <div className={styles.formText}>
          <div className={styles.text}>Mật khẩu mới *</div>
          <div className={styles.input}>
            <input
              name="newPassword"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.newPassword || ""}
              error={Boolean(touched.newPassword && errors.newPassword)}
              placeholder="Mật khẩu mới..."
            />
            {touched.newPassword && (
              <p className={styles.error}>{errors.newPassword}</p>
            )}
          </div>
        </div>

        <div className={styles.formText}>
          <div className={styles.text}>Nhập lại mật khẩu mới *</div>
          <div className={styles.input}>
            <input
              name="confirmNewPassword"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.confirmNewPassword || ""}
              error={Boolean(
                touched.confirmNewPassword && errors.confirmNewPassword
              )}
              placeholder="Nhập lại mật khẩu..."
            />
            {touched.confirmNewPassword && (
              <p className={styles.error}>{errors.confirmNewPassword}</p>
            )}
          </div>
        </div>

        <div className={styles.btn}>
          <button type="submit">Đổi mật khảu</button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
