const categoryReducer = (state = "General", action) => {
  switch (action.type) {
    case "SET_CATEGORY":
      return action.data;
    default:
      return state;
  }
};

export const setCategory = (category) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_CATEGORY",
      data: category,
    });
  };
};

export default categoryReducer;
