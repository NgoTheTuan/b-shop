import styles from "./order.module.scss";
import { GrView } from "react-icons/gr";
import { PaymentService } from "../../../../network/paymentService";
import { useParams } from "react-router-dom";
import Pagination from "../../../../components/pagination";
import Loading from "../../../../components/loading";
import NoData from "../../../../components/noData";
import { number_to_price, formatDate } from "../../../../ultis";
import { useState, useEffect } from "react";
import OrderDetail from "./OrderDetail";

function Order() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [order, setOrder] = useState([]);
  const [orderPage, setOrderPage] = useState([]);

  const [page, setPage] = useState(0);

  const rowsPerPage = 10;

  const [hideOrderDetail, setHideOrderDetail] = useState(false);
  const [dataOrderDetail, setDataOrderDetail] = useState([]);

  useEffect(() => {
    (async function () {
      await PaymentService.getByUserId(id).then((res) => {
        if (res) {
          setPage(0);
          setOrder(res);
          setOrderPage(
            res.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          );
        }
        setLoading(false);
      });
    })();
  }, [id]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber - 1);
    setOrderPage(
      order.slice(
        (pageNumber - 1) * rowsPerPage,
        (pageNumber - 1) * rowsPerPage + rowsPerPage
      )
    );
  };

  const toggleOrderDetail = (data) => {
    setDataOrderDetail(data);
    setHideOrderDetail(!hideOrderDetail);
  };

  return (
    <div className="container">
      {hideOrderDetail ? (
        <OrderDetail
          toggleOrderDetail={toggleOrderDetail}
          data={dataOrderDetail}
        />
      ) : (
        <>
          <div className={styles.title}>Đơn hàng</div>

          <div className={styles.tableOrder}>
            <table>
              <thead>
                <tr>
                  <th width={"5%"}>STT</th>
                  <th>Tên người mua</th>
                  <th width={"12%"}>Phí ship</th>
                  <th width={"19%"}>Tổng tiền</th>
                  <th width={"12%"}>Trạng thái</th>
                  <th width={"12%"}>Ngày tạo</th>
                  <th width={"6%"}></th>
                </tr>
              </thead>

              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="6">
                      <Loading />
                    </td>
                  </tr>
                )}

                {orderPage.length > 0
                  ? orderPage.map((item, index) => {
                      return (
                        <tr key={item?._id}>
                          <td>{index + 1}</td>
                          <td>
                            <span className={styles.name}>
                              {item?.name || ""}
                            </span>
                          </td>
                          <td>
                            <span className={styles.price}>
                              {number_to_price(item?.total_ship || 0)}đ
                            </span>
                          </td>
                          <td>
                            <span className={styles.price}>
                              {number_to_price(item?.total_money || 0)}đ
                            </span>
                          </td>

                          <td>
                            {Number.isInteger(item?.status || 0) &&
                            item?.status === 0 ? (
                              <span className="badge text-bg-warning">
                                Chờ giao hàng
                              </span>
                            ) : item?.status === 1 ? (
                              <span className="badge text-bg-primary">
                                Hoàn thành
                              </span>
                            ) : item?.status === 2 ? (
                              <span className="badge text-bg-danger">
                                Đã huỷ đơn
                              </span>
                            ) : (
                              ""
                            )}
                          </td>

                          <td>{formatDate(item?.createdAt || 0)}</td>

                          <td>
                            <button
                              onClick={() =>
                                toggleOrderDetail(item?.products || [])
                              }
                            >
                              <GrView className={styles.icon} />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  : !loading && (
                      <tr>
                        <td colSpan="6">
                          <NoData />
                        </td>
                      </tr>
                    )}
              </tbody>
            </table>

            {order?.length > 0 && (
              <Pagination
                currentPage={page + 1}
                productsPerPage={rowsPerPage}
                totalProducts={order?.length || 0}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Order;
