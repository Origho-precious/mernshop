import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomeScreen from "./pages/HomeScreen";
import ProductScreen from "./pages/ProductScreen";

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<main className="py-3">
				<Container>
					<Switch>
						<Route exact path="/" component={HomeScreen} />
						<Route exact path="/product/:id" component={ProductScreen} />
					</Switch>
				</Container>
			</main>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
