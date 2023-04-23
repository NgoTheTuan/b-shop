import authAction from "../actions/auth";

const initState = JSON.parse(
  window.localStorage.getItem("user-b-shop") || "{}"
);

function userReducer(state = initState, action) {
  switch (action.type) {
    case authAction.LOGIN: {
      window.localStorage.setItem(
        "token-b-shop",
        JSON.stringify(action.payload.token || "")
      );
      window.localStorage.setItem(
        "user-b-shop",
        JSON.stringify(action.payload.user || "{}")
      );

      return {
        ...state,
        ...action?.payload?.user,
      };
    }

    case authAction.LOGOUT: {
      window.localStorage.removeItem("token-b-shop");
      window.localStorage.removeItem("user-b-shop");

      return {};
    }

    case authAction.UPDATE: {
      return {
        ...state,
        ...action?.payload,
      };
    }
    default:
      return state;
  }
}

export default userReducer;
