import styles from "./map.module.scss";
import Breadcrumb from "../../../components/breadcrumb";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Map() {
  const setting = useSelector((state) => state.setting);
  const [map, setMap] = useState();

  useEffect(() => {
    setMap(setting?.section?.shop_map || "");
  }, [setting?.section?.shop_map]);

  const breadcrumb = [
    {
      id: 1,
      name: "Trang chủ",
      link: "/",
      text: false,
    },
    {
      id: 2,
      name: "Bản đồ",
      link: "",
      text: true,
    },
  ];
  return (
    <div className="container">
      <div>
        <Breadcrumb data={breadcrumb} />
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div
            className={styles.map}
            dangerouslySetInnerHTML={{
              __html: map?.replace(/\\"/g, "") || "",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Map;
