import Request from "./request";

export const NewsService = {
  getSort: async (data) => {
    return new Promise((resolve) => {
      Request.send({
        path: "/news/get-all",
        method: "GET",
        query: data,
      }).then((res) => {
        if (res.success) {
          return resolve(res?.data);
        } else {
          return resolve(false);
        }
      });
    });
  },

  getDetail: async (id) => {
    return new Promise((resolve) => {
      Request.send({
        path: `/news/find/${id}`,
        method: "GET",
      }).then((res) => {
        if (res.success) {
          return resolve(res?.data);
        } else {
          return resolve(false);
        }
      });
    });
  },
};
