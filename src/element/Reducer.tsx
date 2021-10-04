interface Action {
  type: string;
  payload: any;
}

const Reducer = (state: any, action: Action): any => {
  switch (action.type) {
    case "ADD_ELEMENT":
      return {
        ...state,
        elements: state.elements.concat(action.payload),
      };
    case "REMOVE_ELEMENT":
      return {
        ...state,
        elements: state.elements.filter((e: any) => e != action.payload),
      };
    case "SET_ELEMENTS":
      return {
        ...state,
        elements: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
