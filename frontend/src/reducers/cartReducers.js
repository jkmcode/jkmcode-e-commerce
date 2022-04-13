import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
} from "../constants/cartConstans";

export const cartReducer = (
  state = { cartItems: [] },
  action,
  shippingAddress = {}
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state, //returns current state
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ), //x.product and existItem.product returns id products.
          //find product(old) that matches the new item and replace the old one.
          //when we doesnt have new item which maches, we return the old one ( ": x" )
        };
      } else {
        return {
          ...state, //returns current state
          cartItems: [...state.cartItems, item], //add item to original state
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};
