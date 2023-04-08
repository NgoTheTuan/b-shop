import Request from "./request";

export const CategoriyService = {
  filterCategories: async (data) => {
    return new Promise((resolve) => {
      Request.send({
        path: "/categories/filter",
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
  filterCategory: async (data) => {
    return new Promise((resolve) => {
      Request.send({
        path: "/categoryProduct/filter",
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

  getDetailCategories: async (id) => {
    return new Promise((resolve) => {
      Request.send({
        path: `/categories/find/${id}`,
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

  getDetailCategory: async (id) => {
    return new Promise((resolve) => {
      Request.send({
        path: `/categoryProduct/find/${id}`,
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
