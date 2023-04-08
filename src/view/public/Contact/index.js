import styles from "./contact.module.scss";
import Breadcrumb from "../../../components/breadcrumb";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { ContactService } from "../../../network/contactService";
import { Link } from "react-router-dom";
import { HiLocationMarker } from "react-icons/hi";
import { IoMdMail } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
function Contact() {
  const setting = useSelector((state) => state.setting);
  const [map, setMap] = useState();

  const breadcrumb = [
    {
      id: 1,
      name: "Trang chủ",
      link: "/",
      text: false,
    },
    {
      id: 2,
      name: "Liên hệ",
      link: "",
      text: true,
    },
  ];

  const initialValues = {
    name: "",
    email: "",
    note: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Tên phải có 3 kí tự ")
      .required("Không được bỏ trống mật khẩu"),
    email: Yup.string()
      .email("Phải là một email hợp lệ")
      .max(255)
      .required("Không được bỏ trống email."),
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
        await ContactService.contact(values).then((res) => {
          if (res) {
            toast.success("Gửi thông tin liên hệ thành công.");
            resetForm();
          } else {
            toast.error("Gửi thông tin liên hệ thất bại.");
          }
        });
      } catch {
        toast.error("Gửi thông tin liên hệ thất bại.");
      }
    },
  });

  useEffect(() => {
    setMap(setting?.section?.shop_map || "");
  }, [setting?.section?.shop_map]);

  return (
    <div className="container">
      <div>
        <Breadcrumb data={breadcrumb} />
      </div>
      <div className="row justify-content-center mb-5">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div
            className={styles.map}
            dangerouslySetInnerHTML={{
              __html: map?.replace(/\\"/g, "") || "",
            }}
          />
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <div className={styles.title}>LIÊN HỆ</div>

          <form noValidate onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formText}>
              <div className={styles.input}>
                <input
                  name="name"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name || ""}
                  error={Boolean(touched.name && errors.name)}
                  placeholder="Họ và tên..."
                />
                {touched.name && <p className={styles.error}>{errors.name}</p>}
              </div>
            </div>

            <div className={styles.formText}>
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
              <div className={styles.input}>
                <textarea
                  rows="5"
                  name="note"
                  type="text"
                  onChange={handleChange}
                  value={values.note || ""}
                  placeholder="Nội dung..."
                />
              </div>
            </div>

            <div className={styles.btn}>
              <button type="submit">Gửi liên hệ</button>
            </div>
          </form>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <div className={styles.blocklogo}>
            <Link to="/" className={styles.logofooter}>
              <img
                className="img-responsive center-base lazyload loaded"
                width="10"
                height="10"
                src="//bizweb.dktcdn.net/100/091/135/themes/877465/assets/logo.png?1676015083445"
                alt="logo Perfume Rise"
              />
            </Link>
          </div>

          <span className={styles.aboutFooter}>
            {setting?.section?.shop_title}
          </span>

          <div className={styles.contactfooter}>
            <div className={styles.section}>
              <span>
                <HiLocationMarker
                  className={styles.icon}
                  style={{ fontSize: "15px" }}
                />
              </span>
              <div className={styles.fright}>
                <div>{setting?.section?.shop_address || ""}</div>
              </div>
            </div>
            <div className={styles.section}>
              <span className={styles.icon}>
                <BsFillTelephoneFill />
              </span>
              <div className={styles.fright}>
                <a href="tel:19006750">{setting?.section?.shop_phone || ""}</a>
              </div>
            </div>
            <div className={styles.section}>
              <span className={styles.icon}>
                <IoMdMail />
              </span>
              <div className={styles.fright}>
                <a href={`mailto:${setting?.section?.shop_email || ""}`}>
                  {setting?.section?.shop_email || ""}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
