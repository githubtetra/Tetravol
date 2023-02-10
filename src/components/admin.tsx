import React, { useEffect } from "react";
import axios from "axios";
import "./styles.css";
import { debug, group, time } from "console";

interface User {
	id: number;
	username: string;
	password: string;
	role: number;
	group: string;
}

interface Group {
	id_group: number;
	teacher_id: number;
	label: string;
}

const Admin = () => {
	const [users, setUsers] = React.useState<User[]>([]);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [editing, setEditing] = React.useState<boolean>(false);

	const [editCurrentUser, setEditCurrentUser] = React.useState<User>({
		id: 0,
		username: "",
		password: "",
		role: 0,
		group: "",
	});

	const [newuser, setNewUser] = React.useState<User>({
		id: 0,
		username: "",
		password: "",
		role: 0,
		group: "",
	});

	const [newgroup, setNewGroup] = React.useState<Group>({
		id_group: 0,
		teacher_id: 0,
		label: "",
	});

	const [groups, setGroups] = React.useState<Group[]>([]);

	const getUsers: Function = async (): Promise<void> => {
		setLoading(true);
		const res = await axios.get("http://192.100.20.167:3000/api/users");
		setUsers(res.data.data);
		setLoading(false);

		console.log(res.data);
	};

	const getGroups: Function = async (): Promise<void> => {
		setLoading(true);
		const link = "http://192.100.20.167:3000/api/users/group";
		const res = await axios.get(link);
		setGroups(res.data.data);
	};

	const editUser: Function = async (user: User): Promise<void> => {
		setLoading(true);
		const res = await axios.post(
			`http://192.100.20.167:3000/api/user/update/${user.id}`,
			{
				username: user.username,
				password: user.password,
				role: user.role,
				group: user.group,
			}
		);
		setLoading(false);
		setEditing(false);
		getUsers();

		setEditCurrentUser({
			id: 0,
			username: "",
			password: "",
			role: 0,
			group: "",
		});
	};

	const addUser: Function = async (user: User): Promise<void> => {
		setLoading(true);
		const res = await axios.post(`http://192.100.20.167:3000/api/create/user`, {
			username: user.username,
			password: user.password,
			role: user.role,
			group: user.group,
		});

		setLoading(false);
		setEditing(false);
		getUsers();

		setNewUser({
			id: 0,
			username: "",
			password: "",
			role: 0,
			group: "",
		});
	};

	const addGroup = async (group: Group): Promise<void> => {
		setLoading(true);
		const link = "http://192.100.20.167:3000/api/group/create"
		const res = await axios.post(link, {
			label: group.label
		});
		setLoading(false);
		setEditing(false);
		getGroups();
	}

	useEffect(() => {
		getUsers();
		getGroups();
	}, []);

	return (
		<div>
			<h1>Admin</h1>
			<div className="AddUser">
				<h2>Add User</h2>
				<input
					type="text"
					placeholder="Username"
					value={newuser.username}
					onChange={(e) => {
						setNewUser({ ...newuser, username: e.target.value });
					}}
				/>
				<input
					type="text"
					placeholder="Password"
					value={newuser.password}
					onChange={(e) => {
						setNewUser({ ...newuser, password: e.target.value });
					}}
				/>
				{/* <input type="number" placeholder="Role" value={newuser.role} onChange={(e) => { setNewUser({ ...newuser, role: parseInt(e.target.value) }) }} /> */}
				<select
					value={newuser.role}
					onChange={(e) => {
						setNewUser({ ...newuser, role: parseInt(e.target.value) });
					}}
				>
					<option value="1">Admin</option>
					<option value="2">Teacher</option>
					<option value="3">Student</option>
				</select>
				<select value={newuser.group} onChange={(e) => {
					setNewUser({ ...newuser, group: e.target.value });
				}}
				>
					{groups.map((group: Group) => {
						return (
							<option value={group.id_group}>{group.label}</option>
						)
					})}
				</select>
				<button
					onClick={() => {
						addUser(newuser);
					}}
				>
					Add
				</button>
			</div>

			<div className="AddGroup">
				<h2>Add group</h2>
				<input type="text" placeholder="Group name" value={newgroup.label} onChange={(e) => {
					setNewGroup({ ...newgroup, label: e.target.value });
				}} />
				<button onClick={() => {
					addGroup(newgroup);
				}}>Add</button>
			</div>

			<h2>All Groups</h2>
			<ul className="AllGroups">
				{groups.map((group: Group) => {
					return (
						<li key={group.id_group}>
							<div className="Group">
								<div className="GroupInformation">
									<h2>{group.label}</h2>
									<h3>{group.teacher_id}</h3>
								</div>
								<div className="GroupButtons">
									<button>Edit</button>
									<button>Delete</button>
								</div>
							</div>
						</li>
					);
				})}
			</ul>

			{/* Admin can see all users, edit and delete */}
			<h2>All Users</h2>
			<button
				onClick={() => {
					getUsers();
				}}
			>
				Update
			</button>
			{loading ? (
				<h2>Loading...</h2>
			) : (
				<>
					<ul className="AllUsers">
						{users.map((user: User) => {
							return (
								<li key={user.id}>
									<div className="User">
										<div className="UserInformation">
											<h2>{user.username}</h2>
											<h3>
												{
													<>
														{" "}
														{user.role === 1
															? "Admin"
															: user.role === 2
																? "Teacher"
																: "Student"}
													</>
												}
											</h3>
											<div className="UserGroup"> {user.group} </div>
										</div>
										<div className="UserActions">
											{editing ? (
												<>
													<button disabled>Edit</button>
													<button disabled>Delete</button>
												</>
											) : (
												<>
													<button
														onClick={() => {
															setEditCurrentUser(user);
															setEditing(true);
														}}
													>
														Edit
													</button>
													<button onClick={() => { }}>Delete</button>
												</>
											)}
										</div>
									</div>
								</li>
							);
						})}
					</ul>
				</>
			)}

			{/* Edit user popup */}
			{
				// Use on change to update the editCurrentUser object
				editing ? (
					<div className="EditUser">
						<div className="EditUserContainer">
							<h2>Edit User</h2>
							<input
								type="text"
								placeholder="Username"
								value={editCurrentUser.username}
								onChange={(e) => {
									setEditCurrentUser({
										...editCurrentUser,
										username: e.target.value,
									});
								}}
							/>
							<input
								type="text"
								placeholder="Password"
								value={editCurrentUser.password}
								onChange={(e) => {
									setEditCurrentUser({
										...editCurrentUser,
										password: e.target.value,
									});
								}}
							/>
							<input
								type="text"
								placeholder="Role"
								value={editCurrentUser.role}
								onChange={(e) => {
									setEditCurrentUser({
										...editCurrentUser,
										role: parseInt(e.target.value),
									});
								}}
							/>
							<input
								type="text"
								placeholder="Group"
								value={editCurrentUser.group}
								onChange={(e) => {
									setEditCurrentUser({
										...editCurrentUser,
										group: e.target.value,
									});
								}}
							/>
							<button
								onClick={() => {
									editUser(editCurrentUser);
								}}
							>
								Save
							</button>
							<button
								onClick={() => {
									setEditing(false);
								}}
							>
								Cancel
							</button>
						</div>
					</div>
				) : null
			}
		</div>
	);
};

export default Admin;
