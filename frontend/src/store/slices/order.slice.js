import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const orderSlice = createSlice({
	name: "orders",
	initialState: {
		loading: false,
		success: false,
		order: null,
		failed: false,
	},
	reducers: {
		setLoading: (state) => {
			state.loading = true;
		},
		setOrderSuccess: (state, { payload }) => {
			state.loading = false;
			state.success = true;
			state.failed = false;
			state.order = payload;
		},
		setOrderFailed: (state, { payload }) => {
			state.loading = false;
			state.success = false;
			state.failed = payload;
			state.order = null;
		},
	},
});

const { setOrderSuccess, setOrderFailed, setLoading } = orderSlice.actions;

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

export default orderSlice.reducer;
