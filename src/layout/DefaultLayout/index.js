import Header from "./Header";
import Footer from "./Footer";
import { SettingService } from "../../network/settingService";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import settingAction from "../../store/actions/setting";

function DefaultLayout({ children }) {
  const [setting, setSetting] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const getDataSetting = async () => {
      try {
        await SettingService.getData().then((res) => {
          if (res.success) {
            const data = {
              id: res.data[0]._id,
              cover_image: res.data[0].cover_image,
              section: JSON.parse(res.data[0].section || {}),
            };

            setSetting(data);
            dispatch({
              type: settingAction.GET_DATA,
              payload: data,
            });
          }
        });
      } catch (error) {}
    };
    getDataSetting();
  }, []);

  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
