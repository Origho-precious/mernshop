import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Form,
} from "react-bootstrap";
import Rating from "../../components/Rating/Rating";
import { getProductDetails } from "../../store/slices/product.slice";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";

const Productpage = ({ match, history }) => {
	const dispatch = useDispatch();
	const { loading, product, error } = useSelector(
		(state) => state.productReducer
	);
	const [qty, setQty] = useState(1);

	useEffect(() => {
		dispatch(getProductDetails(match?.params?.id));
	}, [dispatch, match]);

	const addToCart = () => {
		history.push(`/cart/${match?.params?.id}?qty=${qty}`);
	};

	const qtyOptions = (count) => {
		let options = [];
		for (let i = 1; i <= count; i++) {
			options.push(i);
		}

		return options;
	};

	return (
		<>
			<Link to="/" className="btn btn-light my-3">
				Go back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image fluid src={product?.image} alt={product?.name} />
					</Col>
					<Col md={3}>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h3 className="pb-2">{product?.name}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating
									value={product?.rating}
									text={`${product?.numReviews} reviews`}
								/>
							</ListGroup.Item>
							<ListGroup.Item>Price: ${product?.price}</ListGroup.Item>
							<ListGroup.Item>
								Description: ${product?.description}
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>${product?.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>
											{product?.countInStock > 0 ? "In Stock" : "Out Of Stock"}
										</Col>
									</Row>
								</ListGroup.Item>
								{product?.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Qty</Col>
											<Col>
												<Form.Control
													as="select"
													value={qty}
													onChange={(e) => setQty(e.target.value)}
												>
													{qtyOptions(product?.countInStock)?.map(
														(option, id) => (
															<option key={id} value={option}>
																{option}
															</option>
														)
													)}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}
								<ListGroup.Item>
									<Button
										onClick={addToCart}
										disabled={!product?.countInStock > 0}
										type="button"
										className="btn-block"
									>
										ADD TO CART
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	);
};

export default Productpage;
