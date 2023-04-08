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
};
