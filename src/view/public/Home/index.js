import styles from "./home.module.scss";
import SidebarProduct from "../../../components/sidebarProduct";
import SidebarNews from "../../../components/sidebarNews";
import ListProduct from "../../../components/listProduct";
import NavbarMenuProduct from "../../../components/navbarMenuProduct";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaTruck, FaSyncAlt } from "react-icons/fa";

function Home() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-3 col-sm-0 col-xs-0">
          <NavbarMenuProduct />
        </div>

        <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
          <div className={styles.banner}>
            <img
              src="https://bizweb.dktcdn.net/100/091/135/themes/877465/assets/slider_1.jpg?1676015083445"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="row py-4">
        <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <SidebarProduct />

          <div className={styles.asideItemCommit}>
            <div className={styles.asideContent}>
              <div className={styles.contentService}>
                <div className={styles.serviceLeft}>
                  <div className={styles.serviceBg}>
                    <BsFillTelephoneFill className={styles.icon} />
                  </div>
                </div>
                <div className={styles.serviceRight}>
                  <div className={styles.titleService}>Hỗ trợ trực tuyến</div>

                  <a href="tel:19006750">1900 6750</a>
                </div>
              </div>

              <div className={styles.contentService}>
                <div className={styles.serviceLeft}>
                  <div className={styles.serviceBg}>
                    <FaTruck className={styles.icon} />
                  </div>
                </div>
                <div className={styles.serviceRight}>
                  <div className={styles.titleService}>Vận chuyển miễn phí</div>

                  <div className="service-sumary">
                    Miễn phí vận chuyển trong bán kính 20km
                  </div>
                </div>
              </div>

              <div className={styles.contentService}>
                <div className={styles.serviceLeft}>
                  <div className={styles.serviceBg}>
                    <FaSyncAlt className={styles.icon} />
                  </div>
                </div>
                <div className={styles.serviceRight}>
                  <div className={styles.titleService}>Đổi trả trong ngày</div>

                  <div className="service-sumary">
                    Dễ dàng đổi trả hàng trong 24h
                  </div>
                </div>
              </div>
            </div>
          </div>

          <SidebarNews />
        </div>

        <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
          <div className={styles.productTitle}>
            <h2 className="h2">
              <a href="san-pham-noi-bat" title="Sản phẩm mới nhất">
                Sản phẩm mới nhất
              </a>
            </h2>
          </div>
          <ListProduct createdAt={true} />

          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className={styles.bestSaleBanner}>
                <figure className={styles.imgEffect}>
                  <a href="#" title="Banner 1">
                    <img
                      width="10"
                      height="10"
                      src="https://bizweb.dktcdn.net/100/091/135/themes/877465/assets/banner2.jpg?1676015083445"
                    />
                  </a>
                </figure>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className={styles.bestSaleBanner}>
                <figure className={styles.imgEffect}>
                  <a href="#" title="Banner 1">
                    <img
                      width="10"
                      height="10"
                      src="https://bizweb.dktcdn.net/100/091/135/themes/877465/assets/banner1.jpg?1676015083445"
                    />
                  </a>
                </figure>
              </div>
            </div>
          </div>

          <div className={styles.productTitle}>
            <h2 className="h2">
              <a href="san-pham-noi-bat" title="Sản phẩm mới nhất">
                Sản phẩm bán chạy
              </a>
            </h2>
          </div>
          <ListProduct selling={true} />

          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className={styles.bestSaleBanner}>
                <figure className={styles.imgEffect}>
                  <a href="#" title="Banner 3">
                    <img
                      width="10"
                      height="10"
                      src="https://bizweb.dktcdn.net/100/091/135/themes/877465/assets/banner3.jpg?1676015083445"
                      alt="Banner 3"
                    />
                  </a>
                </figure>
              </div>
            </div>
          </div>

          <div className={styles.productTitle}>
            <h2 className="h2">
              <a href="san-pham-noi-bat" title="Sản phẩm mới nhất">
                Sản phẩm giảm giá
              </a>
            </h2>
          </div>
          <ListProduct discount={true} />
        </div>
      </div>
    </div>
  );
}

export default Home;
