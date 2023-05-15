import styles from "./cart.module.scss";
import Breadcrumb from "../../../components/breadcrumb";
import NoData from "../../../components/noData";

import { Link } from "react-router-dom";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { number_to_price } from "../../../ultis";
import { useEffect, useState } from "react";
import CartAction from "../../../store/actions/cart";
import { useDispatch } from "react-redux";

function Cart() {
  const dispatch = useDispatch();
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
      name: "Giỏ hàng",
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

  useEffect(() => {
    if (data?.length > 0) {
      handleTotalMoney(data);
    }
  }, [data?.length]);

  const setDataLocalStorage = (data) => {
    window.localStorage.setItem("user-cart-b-shop", JSON.stringify([...data]));
  };

  const minusQuantity = (id) => {
    const dataCart = data.map((item) => {
      if (item?._id === id) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        }
      }
      return item;
    });

    setData(dataCart || []);
    setDataLocalStorage(dataCart || []);
    handleTotalMoney(dataCart || []);
  };

  const plusQuantity = (id) => {
    const dataCart = data.map((item) => {
      if (item?._id === id) {
        item.quantity += 1;
      }
      return item;
    });

    setData(dataCart || []);
    setDataLocalStorage(dataCart || []);
    handleTotalMoney(dataCart || []);
  };

  const handleQuantity = (e, id) => {
    const quantityChange = Number(e.target.value);
    const dataCart = data.map((item) => {
      if (item?._id === id) {
        item.quantity = quantityChange;
      }
      return item;
    });

    setData(dataCart || []);
    setDataLocalStorage(dataCart || []);
    handleTotalMoney(dataCart || []);
  };

  const handleRemoveCart = (id) => {
    const dataRemoveCart = data.filter((item) => item?._id !== id && item);
    setData(dataRemoveCart);
    setDataLocalStorage(dataRemoveCart);
    handleTotalMoney(dataRemoveCart);
    dispatch({
      type: CartAction.CART_UPDATE,
    });
  };

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
      <div className={styles.tableCart}>
        <table>
          <thead>
            <tr>
              <th width={"17%"}>Ảnh sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th width={"15%"}>Đơn giá</th>
              <th width={"15%"}>Số lượng</th>
              <th width={"15%"}>Thành tiền</th>
              <th width={"5%"}>Xóa</th>
            </tr>
          </thead>

          <tbody>
            {data?.length > 0 ? (
              data?.map((item) => {
                return (
                  <tr key={item?._id}>
                    <td>
                      <Link to={`/product-detail/${item?._id}`}>
                        <img src={item?.image || ""} />
                      </Link>
                    </td>
                    <td>
                      <Link to={`/product-detail/${item?._id}`}>
                        <span className={styles.name}>{item?.name || ""}</span>
                      </Link>
                    </td>
                    <td>
                      {item?.discount > 0 && (
                        <span className={styles.priceOld}>
                          {number_to_price(item?.price)}₫
                        </span>
                      )}

                      <span className={styles.price}>
                        {item?.discount > 0
                          ? number_to_price(
                              Number(item?.price) -
                                Number(item?.price) *
                                  (Number(item?.discount) / 100)
                            )
                          : number_to_price(item?.price)}
                        đ
                      </span>
                    </td>
                    <td>
                      <div className={styles.quantity}>
                        <button
                          className={styles.minus}
                          onClick={() => minusQuantity(item?._id)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item?.quantity}
                          onChange={(e) => handleQuantity(e, item?._id)}
                        />
                        <button
                          className={styles.plus}
                          onClick={() => plusQuantity(item?._id)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      <span className={styles.price}>
                        {item?.discount > 0
                          ? number_to_price(
                              (Number(item?.price) -
                                Number(item?.price) *
                                  (Number(item?.discount) / 100)) *
                                item?.quantity
                            )
                          : number_to_price(item?.price * item?.quantity)}
                        đ
                      </span>
                    </td>
                    <td>
                      <button onClick={() => handleRemoveCart(item?._id)}>
                        <RiDeleteBin6Fill className={styles.icon} />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6">
                  <NoData />
                </td>
              </tr>
            )}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="4">Tổng cộng</td>
              <td colSpan="2">{number_to_price(Number(totalMoney))}đ</td>
            </tr>

            <tr className="hiddenMobile">
              <td colSpan="6">
                <div className={styles.btn}>
                  <Link to="/product">
                    <button className={styles.btnProduct}>
                      Tiếp tục mua hàng
                    </button>
                  </Link>
                  {data?.length > 0 && (
                    <Link to="/checkout">
                      <button className={styles.btnCheckout}>Thanh toán</button>
                    </Link>
                  )}
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className={styles.btnMobile}>
        <div className={styles.btn}>
          <Link to="/product">
            <button className={styles.btnProduct}>Tiếp tục mua hàng</button>
          </Link>
          {data?.length > 0 && (
            <Link to="/checkout">
              <button className={styles.btnCheckout}>Thanh toán</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
