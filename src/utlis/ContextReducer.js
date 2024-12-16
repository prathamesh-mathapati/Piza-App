import React, { createContext, useMemo, useReducer } from "react";

export const Context = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.data];
    case "UPDATED":
      const arry = [...state];
      arry.find((item, index) => {
        if (item.tempId === action.data.tempId) {
          state[index] = {
            ...state[index],
            qty: action.data.qty + state[index].qty,
            price: action.data.price + state[index].price,
          };
        }
      });
      return [...arry];
    case "REMOVE":
      const removeArry = [...state];
      removeArry.splice(action.index, 1);
      return removeArry;

    case "INCREMENT":
      const inarry = [...state];
      inarry.find((item, index) => {
        if (item.tempId === action.tempId) {
          state[index] = {
            ...state[index],
            qty: state[index].qty + 1,
            price: state[index].price + action.unitPrice,
          };
        }
      });
      return [...inarry];
      case "DECREMENT":
        const decarry = [...state];
        decarry.find((item, index) => {
          if (item.tempId === action.tempId) {
            state[index] = {
              ...state[index],
              qty: state[index].qty - 1,
              price: state[index].price - action.unitPrice,
            };
          }
        });
        return [...decarry];
    default:
      break;
  }
};
export const ContextReducer = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  const handlaeuseeMemo = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <Context.Provider value={handlaeuseeMemo}>{children}</Context.Provider>
  );
};
