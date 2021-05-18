import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homepage from "./pages/HomeScreen";

const App = () => {
	return (
		<>
			<Header />
			<Container>
				<main className="py-3">
					<Homepage />
				</main>
			</Container>
			<Footer />
		</>
	);
};

export default App;
