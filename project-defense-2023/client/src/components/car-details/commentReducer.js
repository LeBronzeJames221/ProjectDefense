const reducer = (state, action) => {
  switch (action?.type) {
    case "GET_ALL_COMMENTS":
      return [...action.payload];

    case "ADD_COMMENT":
      return [...state, action.payload];

    case "DELETE_COMMENT":
      return state.filter((comment) => comment._id !== action.payload);

    default:
      return state;
  }
};

export default reducer;
