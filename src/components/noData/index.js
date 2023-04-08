import styles from "./nodata.module.scss";
import { FcOpenedFolder } from "react-icons/fc";

function NoData() {
  return (
    <div className={styles.nodata}>
      <div className={styles.boxIcon}>
        <FcOpenedFolder className={styles.icon} />
      </div>
      <div className={styles.text}>Không có dữ liệu</div>
    </div>
  );
}

export default NoData;
