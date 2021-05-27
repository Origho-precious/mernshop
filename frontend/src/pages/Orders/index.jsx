import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOrder } from "../../store/slices/order.slice";

const Orders = ({ match }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		match && dispatch(getOrder(match?.params?.id));
	}, [dispatch, match]);

	return <div>Orders</div>;
};

export default Orders;
