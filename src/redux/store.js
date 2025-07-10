import { configureStore, combineReducers } from "@reduxjs/toolkit";
import depositSlice from "./depositReducer";
import contactSlice from "./contactReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { quranApi } from "./quranApi";
import { postApi } from "./postApi";

const rootReducer = combineReducers({
  depositReducer: depositSlice,
  contactReducer: contactSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    [quranApi.reducerPath]: quranApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quranApi.middleware, postApi.middleware),
});

export const persistedStore = persistStore(store);
