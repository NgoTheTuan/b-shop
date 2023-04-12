import styles from "./notfound.module.scss";
import { RiEmotionSadLine } from "react-icons/ri";
import { TbError404 } from "react-icons/tb";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className={styles.notFound}>
      <div className={styles.boxIcon}>
        <TbError404 className={styles.icon} />
      </div>
      <div className={styles.text}>
        Không tìm thấy nội dung. <RiEmotionSadLine className={styles.iconSad} />
      </div>
      <div className={styles.goBack}>
        <Link to="/">Quay về trang chủ</Link>
      </div>
    </div>
  );
}

export default NotFound;
