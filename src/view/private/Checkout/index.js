import styles from "./checkout.module.scss";
import Breadcrumb from "../../../components/breadcrumb";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthService } from "../../../network/authService";
import { PaymentService } from "../../../network/paymentService";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { number_to_price } from "../../../ultis";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  const setting = useSelector((state) => state.setting);
  const [data, setData] = useState([]);
  const [totalMoney, setTotalMoney] = useState(0);

  const breadcrumb = [
    {
      id: 1,
      name: "Trang chủ",
      link: "/",
      text: false,
    },
    {
      id: 2,
      name: "Thanh toán",
      link: "",
      text: true,
    },
  ];

  useEffect(() => {
    if (window.localStorage.getItem("user-cart-b-shop") !== null) {
      const dataCart = window.localStorage.getItem("user-cart-b-shop");
      setData(JSON.parse(dataCart || "[]"));
      handleTotalMoney(JSON.parse(dataCart || "[]"));
    }
  }, []);

  const initialValues = {
    username: "",
    email: "",
    phone: "",
    address: "",
    note: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Tên người nhận phải lớn hơn 3 kí tự")
      .required("Không được bỏ trống tên người nhận."),
    email: Yup.string()
      .email("Phải là một email hợp lệ")
      .max(255)
      .required("Không được bỏ trống email."),
    phone: Yup.string().required("Không được bỏ trống số điện thoại."),
    address: Yup.string().required("Không được bỏ trống địa chỉ."),
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
      let dataProduct = [];

      if (data?.length > 0) {
        data.forEach((item, index) => {
          const priceProduct =
            item?.discount > 0
              ? Number(item?.price) -
                Number(item?.price) * (Number(item?.discount) / 100)
              : item?.price;

          dataProduct[index] = {
            product_id: item?._id,
            product_img: item?.image || "",
            product_title: item?.name || "",
            product_price: priceProduct.toFixed(0) || 0,
            product_total: item?.quantity || 1,
            product_wareHouseId: item?.wareHouseId,
          };
        });
      }
      try {
        await PaymentService.payment({
          user_id: user?._id,
          name: values.username || "",
          email: values.email || "",
          phone: values.phone || "",
          adress: values.address || "",
          note: values.note || "",
          payment_type: "offline",
          total_ship: Number(setting?.section?.shop_ship || 0),
          products: dataProduct,
          total_money:
            (Number(totalMoney) + Number(setting?.section?.shop_ship)).toFixed(
              0
            ) || 0,
          status: 0,
        }).then((res) => {
          if (res) {
            window.localStorage.removeItem("user-cart-b-shop");
            toast.success("Thanh toán thành công.");
            setTimeout(() => {
              navigate("/product");
            }, 1000);
          }
        });
      } catch {
        toast.error("Thanh toán thất bại!");
      }
    },
  });

  useEffect(() => {
    (async function () {
      await AuthService.getUserDetail(user?._id).then((res) => {
        if (res) {
          setValues({
            username: res?.username || "",
            email: res?.email || "",
            phone: res?.phone || "",
            address: res?.address || "",
          });
        }
      });
    })();
  }, [user?._id]);

  const handleTotalMoney = (data) => {
    const result = data.reduce(function (total = 0, currentValue) {
      let priceProduct = 0;

      if (currentValue?.discount && Number(currentValue?.discount) > 0) {
        priceProduct =
          (Number(currentValue?.price) -
            Number(currentValue?.price) *
              (Number(currentValue?.discount) / 100)) *
          currentValue?.quantity;
      } else {
        priceProduct = currentValue?.price * currentValue?.quantity;
      }

      return total + Number(priceProduct);
    }, 0);
    setTotalMoney(result);
  };

  return (
    <div className="container">
      <div>
        <Breadcrumb data={breadcrumb} />
      </div>
      <div className={styles.checkout}>
        <div className="row">
          <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
            <div className={styles.title}>Thông tin người nhận</div>

            <form noValidate className={styles.form}>
              <div className={styles.formText}>
                <div className={styles.text}>Tên người nhận *</div>
                <div className={styles.input}>
                  <input
                    name="username"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username || ""}
                    error={Boolean(touched.username && errors.username)}
                    placeholder="Nhập tên người nhận..."
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
                <div className={styles.text}>Số điện thoại *</div>
                <div className={styles.input}>
                  <input
                    name="phone"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone || ""}
                    error={Boolean(touched.phone && errors.phone)}
                    placeholder="Nhập tên người nhận..."
                  />
                  {touched.phone && (
                    <p className={styles.error}>{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className={styles.formText}>
                <div className={styles.text}>Địa chỉ *</div>
                <div className={styles.input}>
                  <input
                    name="address"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address || ""}
                    error={Boolean(touched.address && errors.address)}
                    placeholder="Nhập tên người nhận..."
                  />
                  {touched.address && (
                    <p className={styles.error}>{errors.address}</p>
                  )}
                </div>
              </div>

              <div className={styles.formText}>
                <div className={styles.text}>Ghi chú</div>

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
            </form>
          </div>
          <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
            <div className={styles.title}>Đơn hàng</div>
            <div className={styles.custom}>
              <div className={styles.listCart}>
                {data?.length > 0 &&
                  data.map((item) => {
                    return (
                      <div className={styles.item} key={item?._id}>
                        <div className={styles.img}>
                          <img src={item?.image || ""} alt="" />
                          <span className={styles.quantity}>
                            {item?.quantity > 1 && item?.quantity}
                          </span>
                        </div>
                        <div className={styles.name}>{item?.name || ""}</div>

                        <div className={styles.price}>
                          {item?.discount > 0
                            ? number_to_price(
                                Number(item?.price) -
                                  Number(item?.price) *
                                    (Number(item?.discount) / 100)
                              )
                            : number_to_price(item?.price)}
                          đ
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div className={styles.paymentMethods}>
                <div className={styles.name}>Phương thức</div>
                <div className={styles.method}>Thanh toán khi nhận hàng</div>
              </div>

              <div className={styles.total}>
                <div className={styles.name}>Phí ship</div>
                <div className={styles.totalPrice}>
                  {number_to_price(Number(setting?.section?.shop_ship || 0))}đ
                </div>
              </div>

              <div className={styles.total}>
                <div className={styles.name}>Tổng cộng</div>
                <div className={styles.totalPrice}>
                  {number_to_price(
                    Number(totalMoney) +
                      Number(setting?.section?.shop_ship || 0)
                  )}
                  đ
                </div>
              </div>
            </div>
            <div className={styles.btn}>
              <button onClick={handleSubmit}>Thanh toán</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
