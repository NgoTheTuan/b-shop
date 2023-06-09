import Request from "./request";

export const SettingService = {
  getData: async () => {
    return new Promise((resolve) => {
      Request.send({
        path: "/system/get-all",
        method: "GET",
      }).then((res) => {
        if (res.success) {
          return resolve(res);
        } else {
          return resolve(false);
        }
      });
    });
  },

  uploadCoverImg: async (data) => {
    const uploadData = new FormData();
    uploadData.append("file", data, "file");

    return new Promise((resolve) => {
      Request.send({
        path: "/upload",
        method: "POST",
        data: uploadData,
      }).then((res) => {
        if (res.success) {
          return resolve(res);
        } else {
          return resolve(false);
        }
      });
    });
  },
};
