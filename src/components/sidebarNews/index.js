import styles from "./sidebarNews.module.scss";
import { NewsService } from "../../network/newsService";
import { useState, useEffect } from "react";
import { formatDate } from "../../ultis";

function SidebarNews() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      await NewsService.getSort({
        limit: 4,
      }).then((res) => {
        setData(res);
      });
    };
    getNews();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.asideTitle}>
        <h2 className={styles.titleHead}>
          <a href="san-pham-noi-bat" title="Tin tức">
            Tin tức
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
                    <a
                      className={styles.imgThumb}
                      href="/sua-tam-lam-sang-da-victoria-s-secret"
                    >
                      <img
                        className={styles.smallImage}
                        width="10"
                        height="10"
                        src={item?.image || ""}
                        alt=""
                      />
                    </a>
                  </div>
                  <div className={styles.productShop}>
                    <h3 className={styles.productName}>
                      <a href="/sua-tam-lam-sang-da-victoria-s-secret">
                        {item?.title || ""}
                      </a>
                    </h3>
                    <div className={styles.productItemPrice}>
                      <span className={styles.specialPrice}>
                        <span className={styles.price}>
                          {formatDate(item?.createdAt || "")}
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

export default SidebarNews;
