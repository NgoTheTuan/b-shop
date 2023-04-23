import CartAction from "../actions/cart";

let initalState = {
  quantity: 0,
  data: [],
};

function CartReducer(state = initalState, action) {
  switch (action.type) {
    case CartAction.CART_UPDATE: {
      const dataCart = JSON.parse(
        window.localStorage.getItem("user-cart-b-shop") || "[]"
      );

      return {
        quantity: dataCart.length || 0,
        data: dataCart || [],
      };
    }

    default:
      return state;
  }
}

export default CartReducer;
