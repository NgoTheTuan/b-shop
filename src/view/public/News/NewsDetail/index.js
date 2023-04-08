import styles from "./newsdetail.module.scss";
import Breadcrumb from "../../../../components/breadcrumb";
import SidebarProduct from "../../../../components/sidebarProduct";
import SidebarNews from "../../../../components/sidebarNews";
import { FaUserEdit } from "react-icons/fa";
import { AiFillClockCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { NewsService } from "../../../../network/newsService";
import { useState, useEffect } from "react";

import { formatDate } from "../../../../ultis";

import { useParams, useLocation, useNavigate } from "react-router-dom";

function NewsDetail() {
  const { id } = useParams();
  const [nameNews, setNameNews] = useState("");
  const [news, setNews] = useState({});

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
      link: "/news",
      text: false,
    },
    ,
    {
      id: 3,
      name: nameNews,
      link: "",
      text: true,
    },
  ];

  useEffect(() => {
    (async function () {
      await NewsService.getDetail(id).then(async (res) => {
        if (res) {
          setNameNews(res?.title);
          setNews(res);
        }
      });
    })();
  }, [id]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
          <SidebarNews />
          <br />
          <SidebarProduct />
        </div>

        <div className="col-lg-9 col-md-9 col-sm-6 col-xs-12">
          <div>
            <Breadcrumb data={breadcrumb} />
          </div>

          <div className={styles.img}>
            <img src={news?.image} alt="" />
          </div>

          <div className={styles.title}>{news?.title || ""}</div>
          <div className={styles.info}>
            <div className={styles.author}>
              <FaUserEdit className={styles.icon} />
              <span>{news?.author || ""}</span>
            </div>
            <div className={styles.day}>
              <AiFillClockCircle className={styles.icon} />
              <span>{formatDate(news?.createdAt || "")}</span>
            </div>
          </div>

          <div className={styles.description}>
            <span
              dangerouslySetInnerHTML={{
                __html: news?.description || "",
              }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsDetail;
