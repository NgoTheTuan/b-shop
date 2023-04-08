import styles from "./listProduct.module.scss";
import ProductItem from "../productItem";
import { ProductService } from "../../network/productService";
import { useEffect, useState } from "react";

function ListProduct({
  selling = false,
  createdAt = false,
  price = false,
  discount = false,
}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getProductCreated = async () => {
      await ProductService.sort({
        selling: selling,
        createdAt: createdAt,
        price: price,
        discount: discount,
        sort: "desc",
        limit: 4,
      }).then((res) => {
        setData(res);
      });
    };
    getProductCreated();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className="row">
        {data.length > 0 &&
          data.map((item) => {
            return (
              <div
                className="col-lg-3 col-md-3 col-sm-6 col-xs-12"
                key={item?._id}
              >
                <ProductItem item={item} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ListProduct;
