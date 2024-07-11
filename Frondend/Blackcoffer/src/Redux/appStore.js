import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import intensityReducer from "./intensitySlice";
import { persistReducer, persistStore } from "redux-persist";
import start_yearReducer from "./start_yearSlice";




const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  intensity : intensityReducer,
  start_year : start_yearReducer
});


const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { persistor, store };
