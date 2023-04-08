import Request from "./request";

export const AuthService = {
  login: async (data) => {
    return new Promise((resolve) => {
      Request.send({
        path: "/auth/login",
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

  register: async (data) => {
    return new Promise((resolve) => {
      Request.send({
        path: "/auth/register",
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

  getUserDetail: async (id) => {
    return new Promise((resolve) => {
      Request.send({
        path: `/users/find/${id}`,
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

  updateUser: async (data) => {
    return new Promise((resolve) => {
      Request.send({
        path: "/users",
        method: "PUT",
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
  changePassword: async (data) => {
    return new Promise((resolve) => {
      Request.send({
        path: "/users/change-password",
        data: data,
        method: "POST",
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
