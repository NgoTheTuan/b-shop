import styles from "./infomation.module.scss";
import { useEffect, useState } from "react";
import { convertFileToBase64 } from "../../../../ultis";
import { useFormik } from "formik";
import { SettingService } from "../../../../network/settingService";
import { AuthService } from "../../../../network/authService";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import AuthAction from "../../../../store/actions/auth";

function Information() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [fileUpload, setFileUpload] = useState();
  const [urlImgUpdate, setUrlImgUpdate] = useState("");

  let initialValues = {
    username: "",
    email: "",
    address: "",
    phone: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, " Họ và tên phải lớn hơn 3 kí tự")
      .required("Không được để trống tên"),
  });

  const {
    errors,
    values,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (fileUpload) {
          await SettingService.uploadCoverImg(fileUpload).then(async (res) => {
            if (res?.url) {
              await AuthService.updateUser({
                userId: id,
                username: values?.username || "",
                avatar: res?.url || "",
                address: values?.address || "",
                phone: values?.phone || "",
              }).then((resUpdate) => {
                if (resUpdate) {
                  dispatch({
                    type: AuthAction.UPDATE,
                    payload: resUpdate,
                  });
                  toast.success("Cập nhật thành công");
                } else {
                  toast.error("Cập nhật thất bại");
                }
              });
            }
          });
        } else {
          await AuthService.updateUser({
            userId: id,
            username: values?.username || "",
            address: values?.address || "",
            phone: values?.phone || "",
          }).then((resUpdate) => {
            if (resUpdate) {
              dispatch({
                type: AuthAction.UPDATE,
                payload: resUpdate,
              });
              toast.success("Cập nhật thành công");
            } else {
              toast.error("Cập nhật thất bại");
            }
          });
        }
      } catch {
        toast.error("Cập nhật thất bại");
      }
    },
  });

  useEffect(() => {
    (async function () {
      await AuthService.getUserDetail(id).then((res) => {
        if (res) {
          setUrlImgUpdate(res?.avatar || "");
          setValues({
            username: res?.username || "",
            email: res?.email || "",
            address: res?.address || "",
            phone: res?.phone || "",
          });
        }
      });
    })();
  }, [id]);

  const handleFileUpload = (file) => {
    const files = file.target.files[0];
    setFileUpload(files);
    const base64 = convertFileToBase64(files);
    base64.then((res) => {
      setUrlImgUpdate(res);
      values.image = res;
    });
  };

  return (
    <div className={styles.information}>
      <div className={styles.title}>Thông tin tài khoản</div>

      <form noValidate onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formText}>
          <div className={styles.text}>Ảnh đại diện</div>
          <div className={styles.avatar}>
            <div className={styles.img}>
              <img src={urlImgUpdate || ""} alt="" />
            </div>
            <label
              htmlFor="avatar"
              className={styles.changeAvatar}
              onChange={handleFileUpload}
            >
              Thay đổi
              <input hidden accept="image/*" multiple type="file" id="avatar" />
            </label>
          </div>
        </div>

        <div className={styles.formText}>
          <div className={styles.text}>Họ và tên *</div>
          <div className={styles.input}>
            <input
              name="username"
              type="text"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.username || ""}
              error={Boolean(touched.username && errors.username)}
              placeholder="Họ và tên..."
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
              value={values.email || ""}
              placeholder="Email..."
              readOnly
            />
          </div>
        </div>
        <div className={styles.formText}>
          <div className={styles.text}>Địa chỉ</div>
          <div className={styles.input}>
            <input
              name="address"
              type="text"
              onChange={handleChange}
              value={values.address || ""}
              placeholder="Địa chỉ..."
            />
          </div>
        </div>

        <div className={styles.formText}>
          <div className={styles.text}>Số điện thoại</div>
          <div className={styles.input}>
            <input
              name="phone"
              type="text"
              onChange={handleChange}
              value={values.phone || ""}
              placeholder="Số điện thoại..."
            />
          </div>
        </div>

        <div className={styles.btn}>
          <button type="submit">Cập nhật</button>
        </div>
      </form>
    </div>
  );
}

export default Information;
