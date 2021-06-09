import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import Message from "../../../components/Message/Message";
import Loader from "../../../components/Loader/Loader";
import { editProduct } from "../../../store/slices/product.slice";
import FormContainer from "../../../components/FormContainer/FormContainer";

const EditUser = ({ match, history }) => {
	const productId = match?.params?.id;
	const dispatch = useDispatch();
	const {
		authReducer: { authenticated, userInfo },
		productReducer: {
			createdProduct,
			loading,
			productUpdateSuccess,
			productUpdateError: error,
		},
	} = useSelector((state) => state);

	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState("");
	const [brand, setBrand] = useState("");
	const [category, setCategory] = useState("");
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState("");
	const [canSubmitForm, setCanSubmitForm] = useState(false);
	// const [uploading, setUploading] = useState(false);

	useEffect(() => {
		!authenticated && history.push("/login");
		!userInfo?.isAdmin && history.push("/");
	}, [history, authenticated, userInfo]);

	useEffect(() => {
		setName(createdProduct?.name);
		setPrice(createdProduct?.price);
		setBrand(createdProduct?.brand);
		setImage(createdProduct?.image);
		setCategory(createdProduct?.category);
		setCountInStock(createdProduct?.countInStock);
		setDescription(createdProduct?.description);
	}, [createdProduct, dispatch, productId]);

	useEffect(() => {
		if (
			name ||
			price ||
			brand ||
			image ||
			category ||
			countInStock ||
			description
		) {
			setCanSubmitForm(true);
		} else {
			setCanSubmitForm(false);
		}
	}, [brand, category, countInStock, description, image, name, price]);

	useEffect(() => {
		productUpdateSuccess && history.push("/admin/productList");
	}, [history, productUpdateSuccess]);

	const handleSubmit = (e) => {
		e.preventDefault();

		let newProduct = {
			name,
			price,
			brand,
			image,
			category,
			countInStock,
			description,
		};

		canSubmitForm && dispatch(editProduct(productId, newProduct));
	};

	return (
		<>
			<Link className="btn btn-light my-3" to="/admin/productlists">
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit Product</h1>
				{error && <Message variant="danger">{error}</Message>}
				{loading ? (
					<Loader />
				) : (
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="name">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="name"
								placeholder="Enter name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="price">
							<Form.Label>Price</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter price"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="image">
							<Form.Label>Image</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter image url"
								value={image}
								onChange={(e) => setImage(e.target.value)}
							/>
							{/* <Form.File
								id="image-file"
								label="Choose File"
								custom
								onChange={uploadFileHandler}
							/> */}
							{/* {uploading && <Loader />} */}
						</Form.Group>

						<Form.Group controlId="brand">
							<Form.Label>Brand</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter brand"
								value={brand}
								onChange={(e) => setBrand(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="countInStock">
							<Form.Label>Count In Stock</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter countInStock"
								value={countInStock}
								onChange={(e) => setCountInStock(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="category">
							<Form.Label>Category</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter category"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="description">
							<Form.Label>Description</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</Form.Group>

						<Button disabled={!canSubmitForm} type="submit" variant="primary">
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default EditUser;
