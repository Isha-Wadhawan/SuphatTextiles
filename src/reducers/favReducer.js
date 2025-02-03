
import {
    ADD_TO_FAV,
    REMOVE_FAV_ITEM,
  } from "../constants/favConstant";
  
  export const favReducer = (
    state = { favItems: [] },
    action
  ) => {
    switch (action.type) {
      case ADD_TO_FAV:
        const item = action.payload;
  
        const isItemExist = state.favItems.find(
          (i) => i.product === item.product
        );
  
        if (isItemExist) {
          return {
            ...state,
           favItems: state.favItems.map((i) =>
              i.product === isItemExist.product ? item : i
            ),
          };
        } else {
          return {
            ...state,
           favItems: [...state.favItems, item],
          };
        }
  
      case REMOVE_FAV_ITEM:
        return {
          ...state,
          favItems: state.favItems.filter((i) => i.product !== action.payload),
        };
      default:
        return state;
    }
  };