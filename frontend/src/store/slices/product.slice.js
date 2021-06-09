import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productSlice = createSlice({
	name: "productDetails",
	initialState: {
		product: {
			reviews: [],
		},
		createdProduct: null,
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
		setCreateProductSuccess: (state, { payload }) => {
			state.loading = false;
			state.createdProduct = payload;
		},
		setResetState: (state) => {
			state.loading = false;
			state.createProduct = null;
		},
		setCreateProductFailed: (state) => {
			state.loading = false;
			state.createProduct = null;
		},
	},
});

const {
	setIsLoading,
	setProductDetailsFailed,
	setProductDetailsSuccess,
	setCreateProductSuccess,
	setCreateProductFailed,
} = productSlice.actions;

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

export const createProduct = () => async (dispatch, getState) => {
	const token = getState().authReducer?.userInfo?.token;

	try {
		dispatch(setIsLoading());

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await axios.post(`/api/products`, {}, config);
		dispatch(setCreateProductSuccess(data));
	} catch (error) {
		console.log(error);
		dispatch(setCreateProductFailed());
	}
};

export default productSlice.reducer;
