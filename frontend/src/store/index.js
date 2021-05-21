import {
	configureStore,
	combineReducers,
	getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
	persistReducer,
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";
import autoMergeLevel1 from "reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1";
import authSlice from "./slices/auth.slice";
import productsSlice from './slices/products.slice';

const persistConfig = {
	key: "proshop",
	storage,
	stateReconciler: autoMergeLevel1,
};

const reducers = combineReducers({
	auth: authSlice,
	productList: productsSlice
});

const _persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: _persistedReducer,
	middleware: getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	}),
});

export const persistor = persistStore(store);

export default store;
