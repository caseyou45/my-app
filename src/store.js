import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";

import userReducer from "./reducers/userReducer";
import categoryReducer from "./reducers/categoryReducer";

const reducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
