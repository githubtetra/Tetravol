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
	tutor_id: number;
	label: string;
}

const Admin = () => {
	const [users, setUsers] = React.useState<User[]>([]);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [editing, setEditing] = React.useState<boolean>(false);
	const [editingGroup, setEditingGroup] = React.useState<boolean>(false);

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
		tutor_id: 0,
		label: "",
	});

	const [editCurrentGroup, setEditCurrentGroup] = React.useState<Group>({
		id_group: 0,
		tutor_id: 0,
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

	const editGroup: Function = async (name: string, id: number): Promise<void> => {
		setLoading(true);
		const link = "http://192.100.20.167:3000/api/group/update/" + id;

		const res = await axios.post(link, {
			label: name
		});
		setLoading(false);
		setEditing(false);
		getGroups();
	}

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
					<option value="2">Tutor</option>
					<option value="3">Profesor</option>
					<option value="4">Estudiante</option>
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
			<table>
				<thead>
					<tr>
						<th>Group</th>
						<th>Tutor</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{groups.map((group: Group) => {
						return (
							<tr>
								<td>{group.label}</td>
								<td>{group.tutor_id}</td>
								<td>
									<button onClick={() => {
										editGroup(group.label, group.id_group);
									}}>Edit</button>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>


			{/* Admin can see all users, edit and delete */}
			<h2>All Users</h2>
			<button
				onClick={() => {
					getUsers();
				}}
			>
				Update
			</button>

			<table>
				<thead>
					<tr>
						<th>Username</th>
						<th>Password</th>
						<th>Role</th>
						<th>Group</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user: User) => {
						return (
							<tr>
								<td>{user.username}</td>
								<td>{user.password}</td>
								<td>{user.role}</td>
								<td>{user.group}</td>
								<td>
									<button
										onClick={() => {
											// editUser(user);
										}}
									>
										Edit
									</button>
									<button
										onClick={() => {
											// deleteUser(user.id_user);
										}}
									>
										Delete
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Admin;
