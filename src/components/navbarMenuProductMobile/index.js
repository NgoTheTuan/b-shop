import styles from "./navbarmenuproductmobile.module.scss";
import { useEffect, useState } from "react";
import { CategoriyService } from "../../network/categoryService";
import { HiChevronRight } from "react-icons/hi";
import { RxDot } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function NavbarMenuProductMobile() {
  const location = useLocation();
  const [dataMenu, setDataMenu] = useState([]);
  const [showCategory, setShowCategory] = useState(false);

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

  const handleShowCategory = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    const item = document.querySelector(`.menuCategory-${id}`);
    item.classList.toggle(styles.activeItemCategory);
  };

  const toggleCategory = (e) => {
    e.stopPropagation();
    setShowCategory(!showCategory);
  };

  useEffect(() => {
    if (showCategory) {
      setShowCategory(false);
    }
  }, [location.pathname]);

  return (
    <aside className={styles.sidebarCategory}>
      <div className={styles.asideContent}>
        <nav className={styles.navCategory}>
          <ul className={styles.navbarPills}>
            <li className={styles.navItem}>
              <div className={styles.itemText}>
                <Link className={styles.navLink} to="/">
                  Trang chủ
                </Link>
              </div>
            </li>

            <li className={styles.navItem}>
              <div className={styles.itemText}>
                <Link className={styles.navLink} to="/about">
                  Giới thiệu
                </Link>
              </div>
            </li>

            <li className={styles.navItem}>
              <div className={styles.itemText}>
                <Link to="/product" className={styles.navLink}>
                  Sản phẩm
                </Link>
                <span
                  className={styles.wrapperIcon}
                  onClick={(e) => toggleCategory(e)}
                >
                  <HiChevronRight className={styles.icon} />
                </span>
              </div>
            </li>

            {showCategory &&
              dataMenu?.length > 0 &&
              dataMenu.map((itemCategories) => {
                return (
                  <li className={styles.navItem} key={itemCategories?._id}>
                    <div className={styles.itemText}>
                      <Link
                        to={`/product?id=${itemCategories?._id}&type=categories`}
                        className={styles.navLink}
                      >
                        <RxDot /> {itemCategories?.title}
                      </Link>

                      {itemCategories?.category?.length > 0 && (
                        <span
                          className={styles.wrapperIcon}
                          onClick={(e) =>
                            handleShowCategory(e, itemCategories?._id)
                          }
                        >
                          <HiChevronRight className={styles.icon} />
                        </span>
                      )}
                    </div>

                    {itemCategories?.category?.length > 0 && (
                      <ul
                        className={`${styles.dropdownMenu} menuCategory-${itemCategories?._id}`}
                      >
                        {itemCategories?.category.map((itemCategory) => {
                          return (
                            <li
                              className={styles.navItemLv2}
                              key={itemCategory?._id}
                            >
                              <Link
                                to={`/product?id=${itemCategory?._id}&type=category`}
                              >
                                {itemCategory?.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            {/* {dataMenu?.length > 0 &&
              dataMenu.map((itemCategories) => {
                return (
                  <li className={styles.navItem} key={itemCategories?._id}>
                    <div className={styles.itemText}>
                      <Link
                        to={`/product?id=${itemCategories?._id}&type=categories`}
                        className={styles.navLink}
                      >
                        <RxDot /> {itemCategories?.title}
                      </Link>

                      {itemCategories?.category?.length > 0 && (
                        <span
                          className={styles.wrapperIcon}
                          onClick={(e) =>
                            handleShowCategory(e, itemCategories?._id)
                          }
                        >
                          <HiChevronRight className={styles.icon} />
                        </span>
                      )}
                    </div>

                    {itemCategories?.category?.length > 0 && (
                      <ul
                        className={`${styles.dropdownMenu} menuCategory-${itemCategories?._id}`}
                      >
                        {itemCategories?.category.map((itemCategory) => {
                          return (
                            <li
                              className={styles.navItemLv2}
                              key={itemCategory?._id}
                            >
                              <Link
                                to={`/product?id=${itemCategory?._id}&type=category`}
                              >
                                {itemCategory?.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })} */}

            <li className={styles.navItem}>
              <div className={styles.itemText}>
                <Link className={styles.navLink} to="/news">
                  Tin tức
                </Link>
              </div>
            </li>

            <li className={styles.navItem}>
              <div className={styles.itemText}>
                <Link className={styles.navLink} to="/map">
                  Bản đồ
                </Link>
              </div>
            </li>
            <li className={styles.navItem}>
              <div className={styles.itemText}>
                <Link className={styles.navLink} to="/contact">
                  Liên hệ
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default NavbarMenuProductMobile;
