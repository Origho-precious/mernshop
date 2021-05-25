import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Homepage from "./pages/Homepage";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Loginpage from "./pages/Loginpage";
import Signuppage from "./pages/Signuppage";

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<main className="py-3">
				<Container>
					<Switch>
						<Route exact path="/" component={Homepage} />
						<Route path="/product/:id" component={ProductDetails} />
						<Route exact path="/cart" component={Cart} />
						<Route exact path="/cart/:id" component={Cart} />
						<Route exact path="/login" component={Loginpage} />
						<Route exact path="/register" component={Signuppage} />
					</Switch>
				</Container>
			</main>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
