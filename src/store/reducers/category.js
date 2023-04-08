import categoryAction from "../actions/category";

const initState = {
  category: false,
  categories: false,
};

function settingReducer(state = initState, action) {
  switch (action.type) {
    case categoryAction.RESET: {
      return {
        category: false,
        categories: false,
      };
    }
    case categoryAction.SET_CATEGORY: {
      return {
        category: action.payload,
        categories: false,
      };
    }

    case categoryAction.SET_CATEGORIES: {
      return {
        category: false,
        categories: action.payload,
      };
    }

    default:
      return state;
  }
}

export default settingReducer;
