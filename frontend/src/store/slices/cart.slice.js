import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import axios from "axios";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		cartItems: [],
	},
	reducers: {
		setCart: (state, { payload }) => {
			state.cart = payload;
		},
	},
});

const { setCart } = cartSlice.actions;

export const addToCart = (id, getState) => async (dispatch) => {
	try {
		const { newProduct } = await axios.get(`/api/products/${id}`);

		const previousState = getState()?.cartReducer?.cartItems;
		const existingItem = previousState.find(
			(item) => item.id === newProduct.id
		);

		if (existingItem) {
			const existingItemId = previousState.findIndex(
				(item) => item.id === newProduct.id
			);

			dispatch(
				setCart([
					...previousState,
					(previousState[existingItemId] = newProduct),
				])
			);
		} else {
			dispatch(setCart(...previousState, newProduct));
		}
	} catch (error) {
		dispatch(setCart(getState().cart));
	}
};

export default cartSlice.reducer;
