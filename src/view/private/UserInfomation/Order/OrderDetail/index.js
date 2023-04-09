import styles from "../order.module.scss";
import NoData from "../../../../../components/noData";
import { number_to_price } from "../../../../../ultis";

function OrderDetail({ toggleOrderDetail, data }) {
  return (
    <>
      <div className={styles.title}>Chi tiết đơn hàng</div>
      <div className="mb-3">
        <button
          type="button"
          class="btn btn-outline-primary"
          onClick={() => toggleOrderDetail([])}
        >
          Quay lại
        </button>
      </div>
      <div className={styles.tableOrder}>
        <table>
          <thead>
            <tr>
              <th width={"5%"}>STT</th>
              <th width={"15%"}>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th width={"18%"}>Đơn giá</th>
              <th width={"7%"}>Số lượng</th>
              <th width={"18%"}>Tổng tiền</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => {
                return (
                  <tr key={item?._id}>
                    <td>{index + 1}</td>

                    <td>
                      <img src={item?.product_img || ""} alt="" />
                    </td>
                    <td>
                      <span className={styles.name}>
                        {item?.product_title || ""}
                      </span>
                    </td>

                    <td>
                      <span className={styles.price}>
                        {number_to_price(item?.product_price || 0)}đ
                      </span>
                    </td>

                    <td>
                      <span>{item?.product_total || 0}</span>
                    </td>

                    <td>
                      <span className={styles.price}>
                        {number_to_price(
                          Number(item?.product_price) *
                            Number(item?.product_total) || 0
                        )}
                        đ
                      </span>
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
        </table>
      </div>
    </>
  );
}

export default OrderDetail;
