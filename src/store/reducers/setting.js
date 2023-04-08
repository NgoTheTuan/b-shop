import settingAction from "../actions/setting";

const initState = {};

function settingReducer(state = initState, action) {
  switch (action.type) {
    case settingAction.GET_DATA: {
      return {
        ...action?.payload,
      };
    }

    case settingAction.CHANGE_URL_LOGIN: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
}

export default settingReducer;
