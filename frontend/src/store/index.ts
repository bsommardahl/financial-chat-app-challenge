import {
  createStore,
  combineReducers,
  Action,
  applyMiddleware,
  AnyAction,
} from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({});

export type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatchThunk = ThunkDispatch<RootState, any, AnyAction>;

const middlewares = [thunkMiddleware];
const middleWareEnhancer = applyMiddleware(...middlewares);

const store = createStore(rootReducer, composeWithDevTools(middleWareEnhancer));

export type AppDispatch = typeof store.dispatch;

export default store;
