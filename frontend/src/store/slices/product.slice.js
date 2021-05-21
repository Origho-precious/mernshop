import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productSlice = createSlice({
	name: "productDetails",
	initialState: {
		product: {
			reviews: [],
		},
	},
	reducers: {
		setIsLoading: (state) => {
			state.loading = true;
		},
		setProductDetailsSuccess: (state, { payload }) => {
			state.loading = false;
			state.error = null;
			state.product = payload;
		},
		setProductDetailsFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
	},
});

const { setIsLoading, setProductDetailsFailed, setProductDetailsSuccess } =
	productSlice.actions;

export const getProductDetails = (id) => async (dispatch) => {
	try {
		dispatch(setIsLoading());

		const { data } = await axios.get(`/api/products/${id}`);
		dispatch(setProductDetailsSuccess(data));
	} catch (error) {
		dispatch(
			setProductDetailsFailed(
				error?.response?.data?.message
					? error.response.data.message
					: error.message
			)
		);
	}
};

export default productSlice.reducer;
