import styles from "./breadcrumb.module.scss";
import { Link } from "react-router-dom";

function Breadcrumb({ data }) {
  //   data = [
  //     {
  //       id: 1,
  //       name: "Trang chủ",
  //       link: "/",
  //       text: false,
  //     },
  //     {
  //       id: 2,
  //       name: "Tất cả sản phẩm",
  //       link: "",
  //       text: true,
  //     },
  //   ];

  return (
    <nav aria-label="breadcrumb">
      <ol className={`breadcrumb ${styles.wrapper}`}>
        {data?.length > 0 &&
          data.map((item) => {
            return (
              <li className={`breadcrumb-item ${styles.item}`} key={item?.id}>
                {item?.text ? (
                  <>
                    <span>{item?.name || ""}</span>
                  </>
                ) : (
                  <>
                    <Link to={item?.link || "/"}>{item?.name || ""}</Link>
                  </>
                )}
              </li>
            );
          })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
