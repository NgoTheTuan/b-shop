import styles from "./productDetail.module.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";

import { ProductService } from "../../../../network/productService";
import NoData from "../../../../components/noData";
import Loading from "../../../../components/loading";
import Pagination from "../../../../components/pagination";
import { useSelector } from "react-redux";
import { formatDateAndTime } from "../../../../ultis";

function ProductDetailPreview() {
  const { id } = useParams();
  const user = useSelector((state) => state?.auth);
  const [loading, setLoading] = useState(true);
  const [dataPreview, setDataPreview] = useState([]);
  const [dataPreviewPage, setDataPreviewPage] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 2;

  const [total, setTotal] = useState(0);
  const [previewCount, setPreviewCount] = useState({});
  const [activeStar, setActiveStar] = useState(0);
  const [activeStarComment, setActiveStarComment] = useState(5);
  const [starCommentText, setStarCommentText] = useState("");

  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    (async function () {
      await ProductService.getProductPreview({
        productId: id,
      }).then((res) => {
        setTotal(res?.totalPoin || 0);
        setPreviewCount(res?.star || 0);
      });
    })();
  }, [loadData]);

  useEffect(() => {
    setActiveStar(0);
    const param = {
      productId: id,
    };
    if (activeStar > 0) {
      param.star = activeStar;
    }
    (async function () {
      await ProductService.getProductPreviewData(param).then((res) => {
        setDataPreview(res?.data || []);
        setDataPreviewPage(
          res?.data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        );
        setLoading(false);
      });
    })();
  }, [activeStar, loadData]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber - 1);
    setDataPreviewPage(
      dataPreview.slice(
        (pageNumber - 1) * rowsPerPage,
        (pageNumber - 1) * rowsPerPage + rowsPerPage
      )
    );
  };

  const handleSelectStar = (number) => {
    setActiveStarComment(number);
  };

  const submitComment = async () => {
    let star = 1;
    if (activeStarComment === 1) {
      star = 5;
    } else if (activeStarComment === 2) {
      star = 4;
    } else if (activeStarComment === 3) {
      star = 3;
    } else if (activeStarComment === 4) {
      star = 2;
    } else if (activeStarComment === 5) {
      star = 1;
    }

    await ProductService.createProductPreview({
      userId: user?._id || "",
      user: {
        user_avatar: user?.avatar || "",
        user_name: user?.username || "",
      },
      productId: id || "",
      star: star || 1,
      content: starCommentText || "",
    }).then((res) => {
      if (res?.success) {
        setActiveStarComment(5);
        setStarCommentText("");
        setLoadData(!loadData);
      }
    });
  };

  return (
    <>
      {loading && <Loading />}

      <div className={styles.productDetailPreview}>
        <div className={styles.title}>
          <span className={styles.text}>ĐÁNH GIÁ SẢN PHẨM</span>
        </div>

        <div className={`container ${styles.wapperStar}`}>
          <div className="row w-100">
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
              <div className={styles.boxPoint}>
                <div className={styles.point}>{total}</div>
                <div className={styles.maxPoint}>trên 5</div>
              </div>
              <div className={styles.boxStar}>
                {[1, 2, 3, 4, 5].map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`${styles.star} ${
                        index + 1 <= total && styles.iconPoint
                      }`}
                    >
                      <AiOutlineStar className={styles.icon} />
                      <AiFillStar className={styles.iconColor} />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
              <div className={styles.boxNumberStar}>
                <div
                  className={`${styles.numberItem} ${
                    activeStar === 0 && styles.numberActive
                  }`}
                  onClick={() => setActiveStar(0)}
                >
                  Tất cả (
                  {Object.keys(previewCount).length > 0 &&
                    Object.values(previewCount).reduce(
                      (acc, curr) => acc + curr,
                      0
                    )}
                  )
                </div>
                <div
                  className={`${styles.numberItem} ${
                    activeStar === 5 && styles.numberActive
                  }`}
                  onClick={() => setActiveStar(5)}
                >
                  5 Sao ({previewCount?.value5 && previewCount?.value5})
                </div>
                <div
                  className={`${styles.numberItem} ${
                    activeStar === 4 && styles.numberActive
                  }`}
                  onClick={() => setActiveStar(4)}
                >
                  4 Sao ({previewCount?.value4 && previewCount?.value4})
                </div>
                <div
                  className={`${styles.numberItem} ${
                    activeStar === 3 && styles.numberActive
                  }`}
                  onClick={() => setActiveStar(3)}
                >
                  3 Sao ({previewCount?.value3 && previewCount?.value3})
                </div>
                <div
                  className={`${styles.numberItem} ${
                    activeStar === 2 && styles.numberActive
                  }`}
                  onClick={() => setActiveStar(2)}
                >
                  2 Sao ({previewCount?.value2 && previewCount?.value2})
                </div>
                <div
                  className={`${styles.numberItem} ${
                    activeStar === 1 && styles.numberActive
                  }`}
                  onClick={() => setActiveStar(1)}
                >
                  1 Sao ({previewCount?.value1 && previewCount?.value1})
                </div>
              </div>
            </div>
          </div>
        </div>

        {Object.keys(user).length > 0 && (
          <div className={styles.wapperCreateComment}>
            <div className={styles.item}>
              <div className={styles.avatar}>
                {user?.avatar ? (
                  <img src={user?.avatar || ""} alt="" />
                ) : (
                  <BsPersonCircle className={styles.icon} />
                )}
              </div>
              <div className={styles.content}>
                <div className={styles.star}>
                  <div className={styles.boxStar}>
                    {[1, 2, 3, 4, 5].map((itembox, index) => {
                      return (
                        <div
                          key={index}
                          className={`${styles.star} ${
                            activeStarComment > 0 &&
                            index + 1 >= Number(activeStarComment || 0) &&
                            styles.iconPoint
                          }`}
                          onClick={() => handleSelectStar(index + 1)}
                        >
                          <AiOutlineStar className={styles.icon} />
                          <AiFillStar className={styles.iconColor} />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className={styles.textComment}>
                  <textarea
                    rows="3"
                    placeholder="Viết đánh giá"
                    value={starCommentText}
                    onChange={(e) => setStarCommentText(e.target.value)}
                  ></textarea>
                </div>

                <div className={styles.wapperBtn}>
                  <button className={styles.btnSend} onClick={submitComment}>
                    Đánh giá
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={styles.wapperComment}>
          <div className={styles.list}>
            {dataPreviewPage?.length > 0
              ? dataPreviewPage.map((item, index) => (
                  <div className={styles.item} key={item?._id}>
                    <div className={styles.avatar}>
                      {item?.user?.user_avatar && (
                        <img src={item?.user?.user_avatar || ""} alt="" />
                      )}
                    </div>
                    <div className={styles.content}>
                      <div className={styles.username}>
                        {item?.user?.user_name || ""}
                      </div>

                      <div className={styles.star}>
                        <div className={styles.boxStar}>
                          {[1, 2, 3, 4, 5].map((itembox, index) => {
                            return (
                              <div
                                key={index}
                                className={`${styles.star} ${
                                  index + 1 <= Number(item?.star || 0) &&
                                  styles.iconPoint
                                }`}
                              >
                                <AiOutlineStar className={styles.icon} />
                                <AiFillStar className={styles.iconColor} />
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className={styles.time}>
                        {formatDateAndTime(item?.updatedAt || "")}
                      </div>

                      <div className={styles.textComment}>
                        {item?.content || ""}
                      </div>
                    </div>
                  </div>
                ))
              : !loading && <NoData />}

            <Pagination
              currentPage={page + 1}
              productsPerPage={rowsPerPage}
              totalProducts={dataPreview?.length || 0}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      {/* !loading && <NoData /> */}
    </>
  );
}

export default ProductDetailPreview;
