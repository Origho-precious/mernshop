import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		cartItems: [],
	},
	reducers: {
		setCart: (state, { payload }) => {
			state.cartItems = payload;
		},
	},
});

const { setCart } = cartSlice.actions;

export const addToCart = (id, qty) => async (dispatch, getState) => {
	try {
		const { data } = await axios.get(`/api/products/${id}`);

		const newProduct = {
			id: data._id,
			name: data.name,
			image: data.image,
			price: data.price,
			countInStock: data.countInStock,
			qty,
		};

		const previousState = getState()?.cartReducer?.cartItems;
		const existingItem = previousState.find(
			(item) => item.id === newProduct.id
		);

		if (existingItem) {
			const existingItemId = previousState.findIndex(
				(item) => item.id === newProduct.id
			);
			
			const state = [...previousState]
			state.splice(existingItemId, 1, newProduct)

			dispatch(setCart([...state]));
		} else {
			dispatch(setCart([...previousState, newProduct]));
		}
	} catch (error) {
		dispatch(setCart(getState()?.cartReducer?.cartItems));
		console.log(error);
	}
};

export default cartSlice.reducer;
