import styles from "./productsearch.module.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Breadcrumb from "../../../../components/breadcrumb";
import Loading from "../../../../components/loading";
import NoData from "../../../../components/noData";
import ProductItem from "../../../../components/productItem";
import { ProductService } from "../../../../network/productService";

function ProductSearch() {
  const { textSearch } = useParams();
  const breadcrumb = [
    {
      id: 1,
      name: "Trang chủ",
      link: "/",
      text: false,
    },
    {
      id: 2,
      name: "Tìm kiếm",
      link: "",
      text: true,
    },
  ];
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function () {
      await ProductService.filter({
        nameFilter: textSearch.trim(),
        status: 1,
      }).then((res) => {
        if (res?.length > 0) {
          setData(res);
        }
        setLoading(false);
      });
    })();
  }, [textSearch]);

  return (
    <div className="container">
      <div className={styles.productSearch}>
        <div>
          <Breadcrumb data={breadcrumb} />
          <h1 className={styles.title}>
            Có <b>"{data?.length}"</b> kết quả tìm kiếm với từ khoá{" "}
            <b>"{textSearch}"</b>
          </h1>
        </div>

        <div className={styles.listProduct}>
          <div className="row">
            {loading && <Loading />}

            {data.length > 0
              ? data.map((item) => {
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
        </div>
      </div>
    </div>
  );
}

export default ProductSearch;
