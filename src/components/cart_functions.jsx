import { createStore } from "redux";
import { combineReducers } from "redux";

export const initialState = { cart: [] };
export const ADD_TO_CART = "ADD_TO_CART";
export const UPDATE_CART = "UPDATE_CART";
export const DELETE_FROM_CART = "DELETE_FROM_CART";

export const productsReducer = (state = [], action) => {
  return state;
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        ...state,
        cart: [...state.cart, action.payload]
      };
    }

    case UPDATE_CART: {
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product === action.payload.product ? action.payload : item
        )
      };
    }

    case DELETE_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter(item => item.product !== action.payload.product)
      };
    }

    default:
      return state;
  }
};

export const addToCart = (product, quantity, price, images) => {
  return {
    type: ADD_TO_CART,
    payload: { product, quantity, price, images }
  };
}

export const updateCart = (product, quantity, price, images) => {
  return {
    type: UPDATE_CART,
    payload: { product, quantity, price, images }
  };
}

export const deleteFromCart = (product) => {
  return {
    type: DELETE_FROM_CART,
    payload: { product }
  };
}

export const allReducers = {
  products: productsReducer,
  shoppingCart: cartReducer
};

export const rootReducer = combineReducers(allReducers);

export let store = createStore(rootReducer);
