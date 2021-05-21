import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
	name: "productList",
	initialState: {
		products: [],
	},
	reducers: {
		setIsLoading: (state) => {
			state.loading = true;
		},
		setProductListSuccess: (state, { payload }) => {
			state.loading = false;
			state.products = payload;
		},
		setProductListFail: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
	},
});

const { setIsLoading, setProductListFail, setProductListSuccess } =
	productsSlice.actions;

export const getProductList = () => async (dispatch) => {
	try {
		dispatch(setIsLoading());

		const { data } = await axios.get("/api/products");
		dispatch(setProductListSuccess(data));
	} catch (error) {
		dispatch(
			setProductListFail(
				error?.response?.data?.message
					? error.response.data.message
					: error.message
			)
		);
	}
};

export default productsSlice.reducer;
