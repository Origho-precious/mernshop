import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, FormControl } from "react-bootstrap";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { fetchProfile, updateProfile } from "../../store/slices/user.slice";

const Profile = ({ history }) => {
	const dispatch = useDispatch();
	const { userProfileError, loading, profile, updateProfileError } =
		useSelector((state) => state.userReducer);
	const { authenticated } = useSelector((state) => state.authReducer);

	const [name, setName] = useState(profile?.name || "");
	const [email, setEmail] = useState(profile?.email || "");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);

	useEffect(() => {
		!authenticated && history.push("/login");
		!profile?.name && dispatch(fetchProfile());
		profile?.name && setName(profile?.name);
		profile?.email && setEmail(profile?.email);
	}, [history, authenticated, profile?.name, dispatch, profile?.email]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage("Passwords do not match");
		} else {
			console.log(name, email, password);
			dispatch(updateProfile({ name, email, password }));
		}
	};

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				{loading && <Loader />}
				{updateProfileError && (
					<Message variant="danger">{updateProfileError}</Message>
				)}
				{userProfileError && (
					<Message variant="danger">{userProfileError}</Message>
				)}
				{message && <Message variant="danger">{message}</Message>}
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter your name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="email">
						<Form.Label>Email Address</Form.Label>
						<FormControl
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="password">
						<Form.Label>Password</Form.Label>
						<FormControl
							type="password"
							placeholder="Enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="confirmPassword">
						<Form.Label>Confirm password</Form.Label>
						<FormControl
							type="password"
							placeholder="Confirm password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</Form.Group>
					<Button type="submit" variant="primary">
						Update
					</Button>
				</Form>
			</Col>
		</Row>
	);
};

export default Profile;
