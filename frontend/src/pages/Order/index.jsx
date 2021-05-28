import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { getOrder } from "../../store/slices/order.slice";

const Order = ({ history, match }) => {
	const dispatch = useDispatch();
	const {
		authReducer: { authenticated },
		orderReducer: { order, orderDetailsFailed, loading },
	} = useSelector((state) => state);

	useEffect(() => {
		!match?.params?.id && history.push("/");
		!authenticated && history.push("/login");
	}, [authenticated, history, match]);

	useEffect(() => {
		match?.params?.id && dispatch(getOrder(match.params.id));
	}, [dispatch, match.params.id]);

	return (
		<>
			{loading ? (
				<Loader />
			) : orderDetailsFailed ? (
				<Message variant="danger">{orderDetailsFailed}</Message>
			) : (
				<>
					<h1>{order?._id}</h1>
					<Row>
						<Col md={8}>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<h2>Shipping</h2>
									<p>
										<strong>Name: </strong> {order?.user?.name}
									</p>
									<p>
										<strong>Email: </strong>
										<a href={`mailto:${order?.user?.email}`}>
											{order?.user?.email}
										</a>
									</p>
									<p>
										<strong>Address: &nbsp;</strong>
										{order?.shippingAddress?.address},{" "}
										{order?.shippingAddress?.city},{" "}
										{order?.shippingAddress?.postalCode},{" "}
										{order?.shippingAddress?.country}
									</p>
									{order?.isDelivered ? (
										<Message variant="success">Delivered on {order?.deliveredAt}</Message>
									) : (
										<Message variant="danger"> Not Delivered</Message>
									)}
								</ListGroup.Item>

								<ListGroup.Item>
									<h2>Payment Method</h2>
									<p>
										<strong>Method: &nbsp;</strong>
										{order?.paymentMethod}
									</p>
									{order?.isPaid ? (
										<Message variant="success">Paid on {order?.paidAt}</Message>
									) : (
										<Message variant="danger"> Not Paid</Message>
									)}
								</ListGroup.Item>

								<ListGroup.Item>
									<h2>Orders</h2>
									{!order?.orderItems?.length ? (
										<Message>Your order is empty!</Message>
									) : (
										<ListGroup variant="flush">
											{order?.orderItems.map((item) => (
												<ListGroup.Item key={item?._id}>
													<Row>
														<Col md={1}>
															<Image
																src={item?.image}
																alt={item?.name}
																fluid
																rounded
															/>
														</Col>
														<Col>
															<Link to={item?._id}>{item?.name}</Link>
														</Col>
														<Col md={4}>
															{item?.qty} x ${item?.price} = $
															{item.price * item.qty}
														</Col>
													</Row>
												</ListGroup.Item>
											))}
										</ListGroup>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={4}>
							<Card>
								<ListGroup variant="flush">
									<ListGroup.Item>
										<h2>Order Summary</h2>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Items</Col>
											<Col>${order?.itemsPrice}</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Shipping</Col>
											<Col>${order?.shippingPrice}</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Tax</Col>
											<Col>${order?.taxPrice}</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Total</Col>
											<Col>${order?.totalPrice}</Col>
										</Row>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default Order;
