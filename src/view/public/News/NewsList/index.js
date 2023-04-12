import styles from "./newslist.module.scss";
import Breadcrumb from "../../../../components/breadcrumb";
import SidebarProduct from "../../../../components/sidebarProduct";
import { FaUserEdit } from "react-icons/fa";
import { AiFillClockCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { NewsService } from "../../../../network/newsService";
import { useState, useEffect } from "react";
import Pagination from "../../../../components/pagination";
import Loading from "../../../../components/loading";
import NoData from "../../../../components/noData";
import { formatDate } from "../../../../ultis";

function NewsList() {
  const [news, setNews] = useState([]);
  const [newPage, setNewsPage] = useState([]);

  const [page, setPage] = useState(0);

  const rowsPerPage = 6;
  const [loading, setLoading] = useState(true);

  const breadcrumb = [
    {
      id: 1,
      name: "Trang chủ",
      link: "/",
      text: false,
    },
    {
      id: 2,
      name: "Tin tức",
      link: "",
      text: true,
    },
  ];

  useEffect(() => {
    const getNews = async () => {
      await NewsService.getSort().then((res) => {
        if (res?.length > 0) {
          setPage(0);
          setNews(res);
          setNewsPage(
            res.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          );
        }
        setLoading(false);
      });
    };
    getNews();
  }, []);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber - 1);
    setNewsPage(
      news.slice(
        (pageNumber - 1) * rowsPerPage,
        (pageNumber - 1) * rowsPerPage + rowsPerPage
      )
    );
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 hiddenMobile">
          <SidebarProduct />
        </div>

        <div className="col-lg-9 col-md-9 col-sm-6 col-xs-12">
          <div>
            <Breadcrumb data={breadcrumb} />
          </div>
          <div className="row">
            {loading && <Loading />}

            {newPage.length > 0
              ? newPage.map((item) => {
                  return (
                    <div
                      className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
                      key={item?._id}
                    >
                      <div className={styles.list}>
                        <div className={styles.item}>
                          <div className={styles.img}>
                            <Link to={`/news/${item?._id}`}>
                              <img src={item?.image || ""} alt="" />
                            </Link>
                          </div>

                          <div className={styles.title}>
                            <Link to={`/news/${item?._id}`}>
                              {item?.title || ""}
                            </Link>
                          </div>
                          <div className={styles.info}>
                            <div className={styles.author}>
                              <FaUserEdit className={styles.icon} />
                              <span>{item?.author || ""}</span>
                            </div>
                            <div className={styles.day}>
                              <AiFillClockCircle className={styles.icon} />
                              <span>{formatDate(item?.createdAt || "")}</span>
                            </div>
                          </div>

                          <div className={styles.description}>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: item?.description || "",
                              }}
                            ></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : !loading && <NoData />}
          </div>

          <Pagination
            currentPage={page + 1}
            productsPerPage={rowsPerPage}
            totalProducts={news?.length || 0}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default NewsList;
