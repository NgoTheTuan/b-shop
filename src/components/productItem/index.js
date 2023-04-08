import styles from "./productItem.module.scss";
import { number_to_price } from "../../ultis";
import { Link } from "react-router-dom";

function ProductItem({ item }) {
  return (
    <div className={styles.item}>
      <div className={styles.itemProductMain}>
        <div className={styles.productBox}>
          <div className={styles.productThumbnail}>
            <Link
              className={styles.imageThumb}
              to={`/product-detail/${item?._id}`}
              title={item?.name || ""}
            >
              <img width="10" height="10" src={item?.image || ""} />
            </Link>
            {item?.discount > 0 && (
              <div className={styles.saleright}>
                <span>{item?.discount}%</span>
              </div>
            )}
          </div>
          <div className={styles.productInfo}>
            <h3 className={styles.productName}>
              <Link
                to={`/product-detail/${item?._id}`}
                title={item?.name || ""}
              >
                {item?.name || ""}
              </Link>
            </h3>
            <div className={styles.blockprice}>
              <div className={styles.productItemPrice}>
                <span className={styles.price}>
                  {item?.discount > 0
                    ? number_to_price(
                        Number(item?.price) -
                          Number(item?.price) * (Number(item?.discount) / 100)
                      )
                    : number_to_price(item?.price)}
                  ₫
                </span>

                {item?.discount > 0 && (
                  <span className={styles.priceOld}>
                    {number_to_price(item?.price)}₫
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
