import { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { fetchAllUsers } from "../../store/slices/user.slice";

const AllUsers = () => {
	const dispatch = useDispatch();
	const {
		users,
		usersListLoading,
		fetchUsersError: error,
	} = useSelector((state) => state.userReducer);

	useEffect(() => {
		dispatch(fetchAllUsers());
  }, [dispatch]);
  
  const deleteHandler = () => {

  }

	return (
		<div>
			<h1>Users</h1>
			{usersListLoading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Table className="table-sm" striped bordered hover responsive>
					<thead>
						<tr>
							<td>ID</td>
							<td>NAME</td>
							<td>EMAIL</td>
							<td>ADMIN</td>
							<td></td>
						</tr>
					</thead>
					<tbody>
						{users?.length ? (
							users?.map((user) => (
								<tr key={user?._id}>
									<td>{user?._id}</td>
									<td>{user?.name}</td>
									<td>
										<a href={`mailto:${user?.email}`}>{user?.email}</a>
									</td>
									<td>
										{user?.isAdmin ? (
											<i className="fas fa-check text-success" />
										) : (
											<i className="fas fa-times text-danger" />
										)}
									</td>
									<td>
										<LinkContainer to={`/user/${user._id}/edit`}>
											<Button className="btn-sm" variant="light">
												<i className="fas fa-edit" />
											</Button>
										</LinkContainer>
										<Button
											onClick={() => deleteHandler(user?._id)}
											className="btn-sm"
											variant="danger"
										>
											<i className="fas fa-trash" />
										</Button>
									</td>
								</tr>
							))
						) : (
							<Message variant="info">No User</Message>
						)}
					</tbody>
				</Table>
			)}
		</div>
	);
};

export default AllUsers;
