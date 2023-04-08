import Request from "./request";

export const ProductService = {
  sort: async (data) => {
    return new Promise((resolve) => {
      Request.send({
        path: "/products/get-selling",
        method: "POST",
        data: data,
      }).then((res) => {
        if (res.success) {
          return resolve(res?.data);
        } else {
          return resolve(false);
        }
      });
    });
  },
  filter: async (data) => {
    return new Promise((resolve) => {
      Request.send({
        path: "/products/filter",
        method: "POST",
        data: data,
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
        path: `/products/find/${id}`,
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
