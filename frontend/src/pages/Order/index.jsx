import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";

const Orders = ({ history }) => {
	const dispatch = useDispatch();
	const {
		cartReducer: { shippingAddress, paymentMethod, cartItems },
		authReducer: { authenticated },
	} = useSelector((state) => state);

	useEffect(() => {
		!authenticated && history.push("/login");
		!paymentMethod && history.push("/payment");
  }, [authenticated, history, paymentMethod]);
  
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

	let cartPrice = cartItems
		.map((item) => item.price * item.qty)
		.reduce((acc, curPrice) => acc + curPrice);

	addDecimal(Number(cartPrice));

	const shippingPrice = addDecimal(cartPrice > 100 ? 0 : 100);

	const taxPrice = addDecimal(Number((0.15 * cartPrice).toFixed(2)));

	const totalPrice = addDecimal(
		Number(cartPrice + shippingPrice + taxPrice).toFixed(2)
	);

	const placeOrder = () => {
		console.log(111222333);
	};

	return (
		<>
			<CheckoutSteps strp1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address: &nbsp;</strong>
								{shippingAddress?.address}, {shippingAddress?.city},{" "}
								{shippingAddress?.postalCode}, {shippingAddress?.country}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: &nbsp;</strong>
								{paymentMethod}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Orders</h2>
							{!cartItems?.length ? (
								<Message>Your cart is empty!</Message>
							) : (
								<ListGroup variant="flush">
									{cartItems.map((item) => (
										<ListGroup.Item key={item?.id}>
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
													<Link to={item?.id}>{item?.name}</Link>
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
									<Col>${cartPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>${shippingPrice}.00</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>${taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>${totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type="button"
									className="btn-block"
									disabled={cartItems.length === 0}
									onClick={placeOrder}
								>
									Checkout
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default Orders;
