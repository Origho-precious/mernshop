import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../../components/Product/Product";
import { getProductList } from "../../store/slices/products.slice";

const HomePage = () => {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state.productList);

	useEffect(() => {
		dispatch(getProductList());
	}, [dispatch]);

	return (
		<>
			<h1 className="mt-3 mb-4">Latest Products</h1>
			<Row>
				{products?.map((product) => (
					<Col key={product?._id} sm={12} md={6} lg={4} xl={3}>
						<Product product={product} />
					</Col>
				))}
			</Row>
		</>
	);
};

export default HomePage;
