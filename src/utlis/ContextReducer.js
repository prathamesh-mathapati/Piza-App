import React, { createContext, useMemo, useReducer } from "react";

export const Context = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.data];
      case "UPDATED":
        const arry=[...state]
        console.log(state);
        
        arry.find((item,index)=>{
          if(item.tempId===action.data.tempId){
            state[index]={...state[index],qty:action.data.qty+state[index].qty,price:action.data.price+state[index].price}
          }
          
        })
        return [...arry]
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
