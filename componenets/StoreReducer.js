import {
  ListadoRestaurantes,
  RestaurantesFlat,
  ShowsFlat
} from "./Data.js";

const initialStore = () => {
  const store = {
    restaurantes: ListadoRestaurantes,
    restaurantesFlat: RestaurantesFlat,
    showsFlat: ShowsFlat
  };
  return store;
};

const types = {
  setRestaurantes: "setRestaurantes",
  setShows: "setShows",
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case types.setRestaurantes:
      return {
        ...state,
        restaurantes: [...state.restaurantes, ...action.payload],
      };
    
    case types.setShows:
      return {
        ...state,
        showsFlat: [...state.showsFlat, ...action.payload],
      };

    default:
      return state;
  }
};

export { types };
export { initialStore };
export default storeReducer;
