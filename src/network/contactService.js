import Request from "./request";

export const ContactService = {
  contact: async (data) => {
    return new Promise((resolve) => {
      Request.send({
        path: "/contact",
        method: "POST",
        data: data,
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
