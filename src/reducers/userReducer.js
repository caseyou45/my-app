const userReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_USER":
      return action.data;
    default:
      return state;
  }
};

export const setStateUser = (user) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_USER",
      data: user,
    });
  };
};

export default userReducer;
