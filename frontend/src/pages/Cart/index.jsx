import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cart.slice";

const Cart = ({ match, location, history }) => {
	const dispatch = useDispatch();
	const productId = match?.params?.id;
	const qty = location.search ? Number(location.search.split("=")[1]) : 1;

	useEffect(() => {
		productId && dispatch(addToCart(productId, qty));
	}, [dispatch, productId, qty]);

	return <div>Cart</div>;
};

export default Cart;
