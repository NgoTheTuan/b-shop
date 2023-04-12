import styles from "./about.module.scss";
import Breadcrumb from "../../../components/breadcrumb";
import { useSelector } from "react-redux";

function About() {
  const setting = useSelector((state) => state.setting);

  const breadcrumb = [
    {
      id: 1,
      name: "Trang chủ",
      link: "/",
      text: false,
    },
    {
      id: 2,
      name: "Giới thiệu",
      link: "",
      text: true,
    },
  ];

  return (
    <div className="container">
      <div>
        <Breadcrumb data={breadcrumb} />
      </div>
      <div className="row justify-content-center mb-5">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div
            className={styles.about}
            dangerouslySetInnerHTML={{
              __html: setting?.section?.shop_contact || "",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default About;
