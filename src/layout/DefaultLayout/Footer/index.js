import styles from "./footer.module.scss";
import { IoMdMail } from "react-icons/io";
import { BsFillTelephoneFill, BsFillSendFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ContactService } from "../../../network/contactService";
import toast from "react-hot-toast";
import logo from "../../../assets/image/logo.png";

function Footer() {
  const setting = useSelector((state) => state?.setting);
  const [email, setEmail] = useState();

  const addInfomation = async (e) => {
    e.preventDefault();
    if (email.trim()) {
      await ContactService.contact({
        name: "email",
        email: email,
        note: "",
      }).then((res) => {
        if (res) {
          setEmail("");
          toast.success("Gửi thông tin thành công.");
        } else {
          toast.error("Gửi thông tin thất bại.");
        }
      });
    }
  };

  return (
    <footer>
      <div className={styles.midFooter}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
              <div className={styles.blocklogo}>
                <Link to="/" className={styles.logofooter}>
                  <img
                    className="img-responsive center-base lazyload loaded"
                    width="10"
                    height="10"
                    src={logo}
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
                    <a href="tel:19006750">
                      {setting?.section?.shop_phone || ""}
                    </a>
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
            <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className={styles.searchFooter}>
                    <h4 className={styles.titleMenuFirst}>
                      <span>Nhận thông tin </span>
                    </h4>
                    <div className={styles.searchBar}>
                      <form onSubmit={(e) => addInfomation(e)}>
                        <input
                          type="email"
                          placeholder="Nhập email của bạn ... "
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <button className={styles.buttonSubscribe}>
                          <BsFillSendFill className={styles.icon} />
                          <span className={styles.hiddenXs}>Gửi ngay</span>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                  <div className={styles.widgetFt}>
                    <h4 className={styles.titleMenu}>
                      <a href="/" className={styles.collapsed}>
                        Tài khoản
                      </a>
                    </h4>
                    <div className={styles.collapse}>
                      <ul className={styles.listMenu}>
                        <li className={styles.liMenu}>
                          <Link to="/">Trang chủ</Link>
                        </li>
                        <li className={styles.liMenu}>
                          <Link to="/about">Giới thiệu</Link>
                        </li>
                        <li className={styles.liMenu}>
                          <Link to="/product">Sản phẩm</Link>
                        </li>
                        <li className={styles.liMenu}>
                          <Link to="/news">Tin tức</Link>
                        </li>
                        <li className={styles.liMenu}>
                          <Link to="/map">Bản đồ</Link>
                        </li>
                        <li className={styles.liMenu}>
                          <Link to="/contact">Liên hệ</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                  <div className={styles.widgetFt}>
                    <h4 className={styles.titleMenu}>
                      <a href="/" className={styles.collapsed}>
                        CHÍNH SÁCH
                      </a>
                    </h4>
                    <div className={styles.collapse}>
                      <ul className={styles.listMenu}>
                        <li className={styles.liMenu}>
                          <Link to="/">Trang chủ</Link>
                        </li>
                        <li className={styles.liMenu}>
                          <Link to="/about">Giới thiệu</Link>
                        </li>
                        <li className={styles.liMenu}>
                          <Link to="/product">Sản phẩm</Link>
                        </li>
                        <li className={styles.liMenu}>
                          <Link to="/news">Tin tức</Link>
                        </li>
                        <li className={styles.liMenu}>
                          <Link to="/map">Bản đồ</Link>
                        </li>
                        <li className={styles.liMenu}>
                          <Link to="/contact">Liên hệ</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                  <div className={styles.widgetFt}>
                    <h4 className={styles.titleMenu}>
                      <a href="/" className={styles.collapsed}>
                        ĐIỀU KHOẢN
                      </a>
                    </h4>
                    <div className={styles.collapse}>
                      <ul className={styles.listMenu}>
                        <li className={styles.liMenu}>
                          <Link to="/">Trang chủ</Link>
                        </li>
                        <li className={styles.liMenu}>
                          <Link to="/about">Giới thiệu</Link>
                        </li>
                        <li className={styles.liMenu}>
                          <Link to="/product">Sản phẩm</Link>
                        </li>
                        <li className={styles.liMenu}>
                          <Link to="/news">Tin tức</Link>
                        </li>
                        <li className={styles.liMenu}>
                          <Link to="/map">Bản đồ</Link>
                        </li>
                        <li className={styles.liMenu}>
                          <Link to="/contact">Liên hệ</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                  <div className={styles.widgetFt}>
                    <h4 className={styles.titleMenu}>
                      <a href="/" className={styles.collapsed}>
                        HƯỚNG DẪN
                      </a>
                    </h4>
                    <div className={styles.collapse}>
                      <ul className={styles.listMenu}>
                        <li className={styles.liMenu}>
                          <Link to="/">Trang chủ</Link>
                        </li>
                        <li className={styles.liMenu}>
                          <Link to="/about">Giới thiệu</Link>
                        </li>
                        <li className={styles.liMenu}>
                          <Link to="/product">Sản phẩm</Link>
                        </li>
                        <li className={styles.liMenu}>
                          <Link to="/news">Tin tức</Link>
                        </li>
                        <li className={styles.liMenu}>
                          <Link to="/map">Bản đồ</Link>
                        </li>
                        <li className={styles.liMenu}>
                          <Link to="/contact">Liên hệ</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bgFooter}>
        <div className="container">
          <div className={styles.inner}>
            <div className={`row ${styles.tablet}`}>
              <div
                id="copyright"
                className="col-lg-6 col-md-6 col-sm-6 col-xs-12 fot_copyright"
              >
                <span className={styles.wsp}>
                  <span className={styles.mobile}>
                    © Bản quyền thuộc về <b>B Shop</b>
                    <span className={styles.hiddenXs}> | </span>
                  </span>

                  <span className={styles.opacity1}>Cung cấp bởi </span>

                  <a
                    href="https://www.sapo.vn/?utm_campaign=cpn:kho_theme-plm:footer&amp;utm_source=Tu_nhien&amp;utm_medium=referral&amp;utm_content=fm:text_link-km:-sz:&amp;utm_term=&amp;campaign=kho_theme-sapo"
                    rel="nofollow"
                    title="B Bhop"
                  >
                    B Shop
                  </a>
                </span>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <ul className={styles.copyrightLink}>
                  <li className={styles.menuBottom}>
                    <Link to="/">Trang chủ</Link>
                  </li>

                  <li className={styles.menuBottom}>
                    <Link to="/about">Giới thiệu</Link>
                  </li>

                  <li className={styles.menuBottom}>
                    <Link to="/product">Sản phẩm</Link>
                  </li>

                  <li className={styles.menuBottom}>
                    <Link to="/news">Tin tức</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
