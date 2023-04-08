import styles from "./userinformation.module.scss";
import Order from "./Order";
import ChangePassword from "./ChangePassword";
import Infomation from "./Infomation";
import { useState } from "react";

function UserInformation() {
  const [page, setPage] = useState(<Infomation />);

  const menu = {
    infomation: "infomation",
    order: "order",
    changePassword: "changePassword",
  };
  const [checkPage, setCheckPage] = useState(menu.infomation);

  const changeMenu = (type) => {
    if (type === menu.infomation) {
      setPage(<Infomation />);
      setCheckPage(menu.infomation);
    } else if (type === menu.order) {
      setPage(<Order />);
      setCheckPage(menu.order);
    } else if (type === menu.changePassword) {
      setPage(<ChangePassword />);
      setCheckPage(menu.changePassword);
    }
  };

  return (
    <div className="container">
      <div className={styles.userInformation}>
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <div className={styles.listMenu}>
              <div
                className={`${styles.item} ${
                  checkPage === menu.infomation ? styles.active : ""
                }`}
                onClick={() => changeMenu(menu.infomation)}
              >
                Thông tin tài khoản
              </div>
              <div
                className={`${styles.item} ${
                  checkPage === menu.order ? styles.active : ""
                }`}
                onClick={() => changeMenu(menu.order)}
              >
                Đơn hàng
              </div>
              <div
                className={`${styles.item} ${
                  checkPage === menu.changePassword ? styles.active : ""
                }`}
                onClick={() => changeMenu(menu.changePassword)}
              >
                Đổi mật khẩu
              </div>
            </div>
          </div>
          <div className="col-lg-9 col-md-9 col-sm-6 col-xs-12">{page}</div>
        </div>
      </div>
    </div>
  );
}

export default UserInformation;
