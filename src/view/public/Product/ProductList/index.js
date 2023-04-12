import styles from "./productList.module.scss";
import NavbarMenuProduct from "../../../../components/navbarMenuProduct";
import SidebarProduct from "../../../../components/sidebarProduct";
import Breadcrumb from "../../../../components/breadcrumb";
import { useState, useEffect } from "react";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { ProductService } from "../../../../network/productService";
import ProductItem from "../../../../components/productItem";
import Pagination from "../../../../components/pagination";
import Loading from "../../../../components/loading";
import NoData from "../../../../components/noData";
import { useLocation } from "react-router-dom";

function ProductList() {
  const location = useLocation();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  const type = urlParams.get("type");

  const [loading, setLoading] = useState(true);
  const sort = {
    default: "1",
    AZ: "A-Z",
    ZA: "Z-A",
    priceIncrease: "priceIncrease",
    priceReduced: "priceReduced",
    news: "news",
    old: "old",
  };
  const [selectSort, setSelectSort] = useState(sort.default);
  const [products, setProducts] = useState([]);
  const [productsPage, setProductsPage] = useState([]);

  const [page, setPage] = useState(0);

  const rowsPerPage = 12;

  const breadcrumb = [
    {
      id: 1,
      name: "Trang chủ",
      link: "/",
      text: false,
    },
    {
      id: 2,
      name: "Tất cả sản phẩm",
      link: "",
      text: true,
    },
  ];

  const [paramsProduct, setParamsProduct] = useState({});

  const handleSort = (e) => {
    const value = e.target.value;
    if (value === sort.AZ) {
      setParamsProduct({
        name: true,
        sort: "asc",
      });
    } else if (value === sort.ZA) {
      setParamsProduct({
        name: true,
        sort: "desc",
      });
    } else if (value === sort.priceIncrease) {
      setParamsProduct({
        price: true,
        sort: "asc",
      });
    } else if (value === sort.priceReduced) {
      setParamsProduct({
        price: true,
        sort: "desc",
      });
    } else if (value === sort.news) {
      setParamsProduct({
        createdAt: true,
        sort: "desc",
      });
    } else if (value === sort.old) {
      setParamsProduct({
        createdAt: true,
        sort: "asc",
      });
    } else if (value === sort.default) {
      setParamsProduct({});
    }

    setSelectSort(e.target.value);
  };

  useEffect(() => {
    if (id && type) {
      let params = {};
      if (type === "category") {
        params = {
          categoryId: id,
        };
      } else if (type === "categories") {
        params = {
          categoriesId: id,
        };
      }
      (async function () {
        await ProductService.sort({ ...paramsProduct, ...params }).then(
          (res) => {
            if (res?.length > 0) {
              setPage(0);
              setProducts(res);
              setProductsPage(
                res.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              );
            }
            setLoading(false);
          }
        );
      })();
    } else {
      (async function () {
        await ProductService.sort(paramsProduct).then((res) => {
          if (res?.length > 0) {
            setPage(0);
            setProducts(res);
            setProductsPage(
              res.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            );
          }
          setLoading(false);
        });
      })();
    }
  }, [paramsProduct, location?.search]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber - 1);
    setProductsPage(
      products.slice(
        (pageNumber - 1) * rowsPerPage,
        (pageNumber - 1) * rowsPerPage + rowsPerPage
      )
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-3 col-sm-0 col-xs-0 hiddenMobile">
          <NavbarMenuProduct />
          <div className="pt-4"></div>
          <SidebarProduct />
        </div>
        <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
          <div>
            <Breadcrumb data={breadcrumb} />
            <h1 className="title_page">Tất cả sản phẩm</h1>
          </div>

          <div className={styles.listProduct}>
            <div className={styles.sortPagiBar}>
              <div className={styles.sortpage}>
                <div>
                  <BsFillGrid3X3GapFill className={styles.icon} />
                </div>

                <select onChange={handleSort} value={selectSort}>
                  <option value={sort.default}>Mặc định</option>
                  <option value={sort.AZ}>A → Z</option>
                  <option value={sort.ZA}>Z → A</option>
                  <option value={sort.priceIncrease}>Giá tăng dần</option>
                  <option value={sort.priceReduced}>Giá giảm dần</option>
                  <option value={sort.news}>Hàng mới nhất</option>
                  <option value={sort.old}>Hàng cũ nhất</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            {loading && <Loading />}

            {productsPage.length > 0
              ? productsPage.map((item) => {
                  return (
                    <div
                      className="col-lg-3 col-md-3 col-sm-6 col-xs-12"
                      key={item?._id}
                    >
                      <ProductItem item={item} />
                    </div>
                  );
                })
              : !loading && <NoData />}
          </div>

          <Pagination
            currentPage={page + 1}
            productsPerPage={rowsPerPage}
            totalProducts={products?.length || 0}
            onPageChange={handlePageChange}
          />
        </div>

        <div className="col-lg-3 col-md-3 col-sm-0 col-xs-0 blockMobile hiddenPC">
          <SidebarProduct />
        </div>
      </div>
    </div>
  );
}

export default ProductList;
