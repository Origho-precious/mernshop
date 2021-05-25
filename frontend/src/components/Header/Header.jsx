import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { logout } from "../../store/slices/auth.slice";

const Header = () => {
	const dispatch = useDispatch();
	const { authenticated, userInfo } = useSelector((state) => state.authReducer);

	return (
		<header>
			<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>ProShop</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							<LinkContainer to="/cart">
								<Nav.Link>
									<i className="fas fa-shopping-cart" /> Cart
								</Nav.Link>
							</LinkContainer>
							{authenticated ? (
								<NavDropdown title={userInfo?.name} id="username">
									<LinkContainer to="/profile">
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={() => dispatch(logout())}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to="/login">
									<Nav.Link>
										<i className="fas fa-user" /> Sign in
									</Nav.Link>
								</LinkContainer>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
