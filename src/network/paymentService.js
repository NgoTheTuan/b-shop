import Request from "./request";

export const PaymentService = {
  payment: async (data) => {
    return new Promise((resolve) => {
      Request.send({
        path: "/payment",
        method: "POST",
        data: data,
      }).then((res) => {
        if (res.success) {
          return resolve(res);
        } else {
          return resolve(false);
        }
      });
    });
  },

  getByUserId: async (id) => {
    return new Promise((resolve) => {
      Request.send({
        path: `/payment/user-find/${id}`,
        method: "GET",
      }).then((res) => {
        if (res.success) {
          return resolve(res.data);
        } else {
          return resolve(false);
        }
      });
    });
  },
};
