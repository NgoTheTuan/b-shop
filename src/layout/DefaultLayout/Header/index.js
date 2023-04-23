import styles from "./header.module.scss";
import { FaSearch } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import { FiMenu, FiUser } from "react-icons/fi";
import { BsHandbag } from "react-icons/bs";
import { SlClose } from "react-icons/sl";

import { GoChevronDown, GoChevronRight } from "react-icons/go";
import { CategoriyService } from "../../../network/categoryService";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineUserCircle } from "react-icons/hi";
import CartAction from "../../../store/actions/cart";
import AuthAction from "../../../store/actions/auth";
import NoData from "../../../components/noData";
import { number_to_price } from "../../../ultis";
import logo from "../../../assets/image/logo.png";
import NavbarMenuProductMobile from "../../../components/navbarMenuProductMobile";

function Header() {
  const token = localStorage.getItem("token-b-shop");
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const [dataCartHover, setDataCartHover] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [dataMenu, setDataMenu] = useState([]);
  const [textSearch, setTextSearch] = useState("");
  const allPages = {
    home: "home",
    about: "about",
    product: "product",
    news: "news",
    map: "map",
    contact: "contact",
    page: "no",
  };
  const [pages, setPages] = useState(allPages.home);
  const menuMobile = useRef(null);
  const menuMobileBg = useRef(null);

  useEffect(() => {
    if (location.pathname === "/") {
      setPages(allPages.home);
    } else if (location.pathname.includes(allPages.about)) {
      setPages(allPages.about);
    } else if (location.pathname.includes(allPages.product)) {
      setPages(allPages.product);
    } else if (location.pathname.includes(allPages.news)) {
      setPages(allPages.news);
    } else if (location.pathname.includes(allPages.map)) {
      setPages(allPages.map);
    } else if (location.pathname.includes(allPages.contact)) {
      setPages(allPages.contact);
    } else {
      setPages(allPages.page);
    }

    closeMenuMobile();
  }, [location.pathname]);

  const onClickMenu = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    const allItem = document.querySelectorAll(".toggle");
    allItem.forEach((element) => {
      element.style.display = "none";
    });

    const item = document.querySelector(`.menuProductItem-${id}`);
    item.style.display = "block";
  };

  useEffect(() => {
    filterCategories();
  }, []);

  const filterCategories = async () => {
    try {
      await CategoriyService.filterCategories({
        titleFilter: "",
        status: 1,
      }).then(async (resCategories) => {
        if (resCategories?.length > 0) {
          await CategoriyService.filterCategory({
            titleFilter: "",
            status: 1,
          }).then((resCategory) => {
            let menuNav = [];
            if (resCategory?.length > 0) {
              resCategories?.forEach((itemCategories, index) => {
                let category = [];
                resCategory?.forEach((itemCategory) => {
                  if (itemCategories?._id === itemCategory?.categoriesId) {
                    category.push(itemCategory);
                  }
                });

                menuNav[index] = {
                  ...itemCategories,
                  category,
                };
              });

              setDataMenu(menuNav);
            }
          });
        }
      });
    } catch (error) {}
  };

  const onSubmitSearch = (e) => {
    e.preventDefault();
    navigate(`/product-search/${textSearch.trim()}`);
  };

  useEffect(() => {
    dispatch({
      type: CartAction.CART_UPDATE,
    });
  }, []);

  useEffect(() => {
    setDataCartHover(cart?.data.slice(0, 2));
  }, [cart?.data]);

  const onChangeLogout = () => {
    navigate("/");
    dispatch({
      type: AuthAction.LOGOUT,
    });
  };

  const openMenuMobile = () => {
    menuMobileBg.current.style.display = "block";
    menuMobile.current.style.transform = "translateX(0vw)";
  };

  const closeMenuMobile = () => {
    // menuMobile.current.style.display = "none";
    menuMobileBg.current.style.display = "none";
    menuMobile.current.style.transform = "translateX(-65vw)";
  };

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <div className="row justify-content-between">
            <div className="col col-sm-4 col-lg-3 col-sm-12 px-3 blockMobile hiddenPC">
              <div className="h-100 d-flex justify-content-start align-items-center">
                <FiMenu
                  style={{ fontSize: "24px", cursor: "pointer" }}
                  onClick={openMenuMobile}
                />
              </div>
            </div>

            <div className="col col-sm-4 col-xs-4 col-lg-3 col-sm-12 px-3 ">
              <div className={styles.logo}>
                <Link to="/" className={styles.logoWrapper}>
                  <img src={logo} alt="" />
                </Link>
              </div>
            </div>

            <div className="col col-lg-6 col-sm-12 px-3 hiddenMobile">
              <div className={styles.headerSearch}>
                <form onSubmit={(e) => onSubmitSearch(e)}>
                  <input
                    type="text"
                    value={textSearch}
                    onChange={(e) => setTextSearch(e.target.value)}
                    name="query"
                    placeholder="Tìm kiếm"
                  />
                  <span className={styles.btnSearch}>
                    <button type="submit">
                      <FaSearch className={styles.icon} />
                    </button>
                  </span>
                </form>
              </div>
            </div>

            <div className="col col-sm-4 col-lg-3 col-sm-0 px-3 ">
              <div
                className={`${styles.headerUser} h-100 d-flex justify-content-end align-items-center`}
              >
                {token ? (
                  <div className={styles.avatarUser}>
                    <Link to={`/user-information/${auth?._id}`}>
                      {auth?.avatar ? (
                        <img src={auth?.avatar || ""} alt="" />
                      ) : (
                        <HiOutlineUserCircle className={styles.icon} />
                      )}
                    </Link>

                    <div className={styles?.userHover}>
                      <div className={styles.userSetting}>
                        <Link to={`/user-information/${auth?._id}`}>
                          Tài khoản
                        </Link>
                      </div>
                      <div className={styles.logout} onClick={onChangeLogout}>
                        Đăng xuất
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.user}>
                    <span>
                      {/* Tài khoản <BiChevronDown className={styles.icon} /> */}
                      <FiUser style={{ fontSize: "30px", cursor: "pointer" }} />
                    </span>
                    <div className={styles.hoverUser}>
                      <Link to="/login">ĐĂNG NHẬP</Link>
                      <Link to="/register">ĐĂNG KÝ</Link>
                    </div>
                  </div>
                )}

                <div className={styles.cart}>
                  <Link className={styles.cartIcon} to="/cart">
                    <BsHandbag className={styles.icon} />
                    {cart?.quantity > 0 && <span>{cart?.quantity}</span>}

                    <div className={styles.hoverCart}>
                      <div className={styles.wrapper}>
                        <div className={styles.list}>
                          {dataCartHover?.length > 0 ? (
                            dataCartHover.map((item) => {
                              return (
                                <div className={styles.item} key={item?._id}>
                                  <Link to={`/product-detail/${item?._id}`}>
                                    <img
                                      src={item?.image || ""}
                                      alt=""
                                      className={styles.img}
                                    />
                                  </Link>

                                  <div className={styles.itemText}>
                                    <Link
                                      className={styles.title}
                                      to={`/product-detail/${item?._id}`}
                                    >
                                      {item?.name || ""}
                                    </Link>
                                    <div className={styles.price}>
                                      {item?.discount > 0
                                        ? number_to_price(
                                            Number(item?.price) -
                                              Number(item?.price) *
                                                (Number(item?.discount) / 100)
                                          )
                                        : number_to_price(Number(item?.price))}
                                      đ
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <>
                              <NoData />
                            </>
                          )}
                        </div>

                        <div className={styles.btn}>
                          <Link to="/cart" className={styles.btnCart}>
                            GIỎ HÀNG
                          </Link>

                          <Link to="/checkout" className={styles.btnPayment}>
                            THANH TOÁN
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container blockMobile hiddenPC">
          <div className="col-lg-12 col-sm-12 px-3 ">
            <div className={styles.headerSearch}>
              <form onSubmit={(e) => onSubmitSearch(e)}>
                <input
                  type="text"
                  value={textSearch}
                  onChange={(e) => setTextSearch(e.target.value)}
                  name="query"
                  placeholder="Tìm kiếm"
                />
                <span className={styles.btnSearch}>
                  <button type="submit">
                    <FaSearch className={styles.icon} />
                  </button>
                </span>
              </form>
            </div>
          </div>
        </div>
      </header>
      <div className={`${styles.headerMenu} hiddenMobile`}>
        <div className="container">
          <div className="row">
            <nav className={styles.headerNav}>
              <ul className={styles.itemBig}>
                <li
                  className={`${styles.navItem} ${
                    pages === allPages.home && styles.active
                  }`}
                >
                  <Link className={styles.aLink} to="/">
                    <span>Trang chủ</span>
                  </Link>
                </li>

                <li
                  className={`${styles.navItem} ${
                    pages === allPages.about && styles.active
                  }`}
                >
                  <Link className={styles.aLink} to="/about">
                    <span>Giới thiệu</span>
                  </Link>
                </li>

                <li
                  className={`${styles.navItem} ${
                    pages === allPages.product && styles.active
                  }`}
                >
                  <Link
                    className={`${styles.aLink} ${styles.navProduct}`}
                    to="/product"
                  >
                    <span>Sản phẩm</span>
                    <GoChevronDown className={styles.icon} />

                    {dataMenu?.length > 0 && (
                      <ul className={styles.menuProduct}>
                        {dataMenu.map((itemCategories) => {
                          return (
                            <li key={itemCategories?._id}>
                              <Link
                                to={`/product?id=${itemCategories?._id}&type=categories`}
                              >
                                {itemCategories?.title}
                              </Link>
                              <div
                                className={styles.wrapperIcon}
                                onClick={(e) =>
                                  onClickMenu(e, itemCategories?._id)
                                }
                              >
                                {itemCategories?.category?.length > 0 && (
                                  <GoChevronRight className={styles.icon} />
                                )}
                              </div>

                              {itemCategories?.category?.length > 0 && (
                                <ul
                                  className={`${styles.menuProductItem} toggle menuProductItem-${itemCategories?._id}`}
                                >
                                  {itemCategories?.category.map(
                                    (itemCategory) => {
                                      return (
                                        <li key={itemCategory?._id}>
                                          <Link
                                            to={`/product?id=${itemCategory?._id}&type=category`}
                                          >
                                            {itemCategory?.title}
                                          </Link>
                                        </li>
                                      );
                                    }
                                  )}
                                </ul>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </Link>
                </li>

                <li
                  className={`${styles.navItem} ${
                    pages === allPages.news && styles.active
                  }`}
                >
                  <Link className={styles.aLink} to="/news">
                    <span>TIN TỨC</span>
                  </Link>
                </li>

                <li
                  className={`${styles.navItem} ${
                    pages === allPages.map && styles.active
                  }`}
                >
                  <Link className={styles.aLink} to="/map">
                    <span>BẢN ĐỒ</span>
                  </Link>
                </li>

                <li
                  className={`${styles.navItem} ${
                    pages === allPages.contact && styles.active
                  }`}
                >
                  <Link className={styles.aLink} to="/contact">
                    <span>LIÊN HỆ</span>
                  </Link>
                </li>
              </ul>

              <div className={styles.hotline}>
                <span>Đặt hàng nhanh</span>
                <div className={styles.phone}>
                  <a href="tel:19006750">1900 6750</a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div
        className={`${styles.menuMobile} hiddenPC blockMobile `}
        ref={menuMobile}
      >
        <div className={styles.close}>
          <SlClose className={styles.icon} onClick={closeMenuMobile} />
        </div>

        <div className={styles.menu}>
          <NavbarMenuProductMobile />
        </div>
      </div>
      <div
        className={`${styles.menuBgMobile} hiddenPC blockMobile`}
        ref={menuMobileBg}
        onClick={closeMenuMobile}
      ></div>
    </>
  );
}

export default Header;
