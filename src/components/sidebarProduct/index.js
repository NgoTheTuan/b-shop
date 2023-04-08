import styles from "./sidebarProduct.module.scss";
import { ProductService } from "../../network/productService";
import { useState, useEffect } from "react";
import { number_to_price } from "../../ultis";
import { Link } from "react-router-dom";
function SidebarProduct() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getProductSelling = async () => {
      await ProductService.sort({
        selling: true,
        sort: "desc",
        limit: 4,
      }).then((res) => {
        setData(res);
      });
    };
    getProductSelling();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.asideTitle}>
        <h2 className={styles.titleHead}>
          <a href="san-pham-noi-bat" title="Bán chạy">
            Sản phẩm bán chạy
          </a>
        </h2>
      </div>

      <div className={styles.productList}>
        {data?.length > 0 &&
          data.map((item) => {
            return (
              <div className={styles.itemProductMain} key={item?._id}>
                <div className={styles.productBox}>
                  <div className={styles.productImage}>
                    <Link
                      className={styles.imgThumb}
                      to={`/product-detail/${item?._id}`}
                    >
                      <img
                        className={styles.smallImage}
                        width="10"
                        height="10"
                        src={item?.image}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className={styles.productShop}>
                    <h3 className={styles.productName}>
                      <Link to={`/product-detail/${item?._id}`}>
                        {item?.name || ""}
                      </Link>
                    </h3>
                    <div className={styles.productItemPrice}>
                      <span className={styles.specialPrice}>
                        <span className={styles.price}>
                          {number_to_price(item?.price || 0)}₫
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default SidebarProduct;
