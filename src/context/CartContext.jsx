import { createContext, useReducer, useEffect } from "react";
import { books } from "../data/database";

export const CartContext = createContext();

const initialState = [];

const init = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const cartReducer = (state, action) => {

  switch (action.type) {

    case "ADD_ITEM": {

      const existing = state.find(item => item.id === action.payload.id);

      if (existing) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

       return [...state, { id: action.payload.id, name: action.payload.name, quantity: 1}]
    }

    case "INCREASE":
      return state.map(item =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case "DECREASE":
      return state
        .map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0);

    case "REMOVE":
      return state.filter(item => item.id !== action.payload);

    case "CLEAR":
      return [];

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState, init);

  // Persistencia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

 // Total de items
  const getTotalItems = () =>
    cart.reduce((acc, item) => acc + item.quantity, 0);


  // Total de la compra
  const getTotalPrice = () => cart.reduce((acc, item) => {
      const book = books.find(b => b.id === item.id);

      if (!book) return acc;

      return acc + book.price * item.quantity;
    }, 0);


    // Obtener informacion de un libro por su ID
  const getBookById = (getBookById) => {
    return books.find(book => book.id === getBookById);
  }

  return (
     <CartContext.Provider
      value={{
        cart,
        dispatch,
        getTotalItems,
        getTotalPrice,
        getBookById
      }}
    >
      {children}
    </CartContext.Provider>
  );
};