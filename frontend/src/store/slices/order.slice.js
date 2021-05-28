import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const orderSlice = createSlice({
	name: "orders",
	initialState: {
		loading: false,
		success: false,
		orderId: null,
		failed: false,
		order: null,
	},
	reducers: {
		setLoading: (state) => {
			state.loading = true;
		},
		setOrderSuccess: (state, { payload }) => {
			state.loading = false;
			state.success = true;
			state.failed = false;
			state.orderId = payload;
		},
		setOrderFailed: (state, { payload }) => {
			state.loading = false;
			state.success = false;
			state.failed = payload;
			state.orderId = null;
		},
		setOrderDetails: (state, { payload }) => {
			state.order = payload;
		},
	},
});

const { setOrderSuccess, setOrderFailed, setLoading, setOrderDetails } =
	orderSlice.actions;

export const createOrder = (order) => async (dispatch, getState) => {
	const token = getState().authReducer.userInfo.token;

	const updatedOrderItems = order?.orderItems.map((item) => {
		return {
			product: item.id,
			name: item.name,
			image: item.image,
			price: item.price,
			countInStock: item.countInStock,
			qty: item.qty,
		};
	});

	order.orderItems = updatedOrderItems;

	try {
		dispatch(setLoading(true));

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await axios.post(
			"/api/orders",
			JSON.stringify(order),
			config
		);

		data && dispatch(setOrderSuccess(data));
	} catch (error) {
		console.error(error);
		dispatch(
			setOrderFailed(
				error?.response?.data?.message
					? error.response.data.message
					: error.message
			)
		);
	}
};

export const getOrder = (id) => async (dispatch, getState) => {
	const token = getState().authReducer.userInfo.token;

	try {
		dispatch(setLoading(true));

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await axios.get(`/api/orders/${id}`, config);

		data && dispatch(setOrderDetails(data));
	} catch (error) {
		console.error(error);
	}
};

export default orderSlice.reducer;
