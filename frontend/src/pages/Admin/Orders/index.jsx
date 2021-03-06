import { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";
import Message from "../../../components/Message/Message";
import { getAllOrders } from "../../../store/slices/order.slice";
import Loader from "../../../components/Loader/Loader";

const AllOrders = ({ history }) => {
	const dispatch = useDispatch();
	const {
		authReducer: { authenticated, userInfo },
		orderReducer: { loading, getAllOrdersError: error, allOrders },
	} = useSelector((state) => state);

	useEffect(() => {
		!authenticated
			? history.push("/login")
			: !userInfo.isAdmin
			? history.push("/")
			: dispatch(getAllOrders());
	}, [authenticated, dispatch, history, userInfo]);

	return (
    <>
      <h1>Orders</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Table className="table-sm" striped bordered hover responsive>
					<thead>
						<tr>
							<th>ID</th>
							<th>USER</th>
							<th>DATE</th>
							<th>TOTAL</th>
							<th>PAID</th>
							<th>DELIVERED</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{allOrders?.map((order) => (
							<tr key={order?._id}>
								<td>{order?._id}</td>
								<td>{order?.user && order?.user?.name}</td>
								<td>{order?.createdAt.substring(0, 10)}</td>
								<td>${order?.totalPrice}</td>
								<td>
									{order?.isPaid ? (
										order?.paidAt.substring(0, 10)
									) : (
										<i className="fas fa-times" style={{ color: "red" }}></i>
									)}
								</td>
								<td>
									{order?.isDelivered ? (
										order?.deliveredAt.substring(0, 10)
									) : (
										<i className="fas fa-times" style={{ color: "red" }}></i>
									)}
								</td>
								<td>
									<LinkContainer to={`/order/${order?._id}`}>
										<Button variant="light" className="btn-sm">
											Details
										</Button>
									</LinkContainer>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
			{!allOrders?.length && <Message variant="info">No Order</Message>}
		</>
	);
};

export default AllOrders;
