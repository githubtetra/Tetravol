import React, { useEffect } from "react";
import axios from "axios";
import api from "../hooks/hooks"
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
	// tutor_id: number;
	label: string;
}

const Admin = () => {
	const [users, setUsers] = React.useState<User[]>([]);
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
		// tutor_id: 0,
		label: "",
	});

	const [editCurrentGroup, setEditCurrentGroup] = React.useState<Group>({
		id_group: 0,
		// tutor_id: 0,
		label: "",
	});

	const [groups, setGroups] = React.useState<Group[]>([]);

	const getUsers: Function = async (): Promise<void> => {
		const res = await axios.get("http://192.100.20.167:3000/api/users");
		setUsers(res.data.data);

		console.log(res.data);
	};

	const getGroups: Function = async (): Promise<void> => {
		const link = "http://192.100.20.167:3000/api/users/group";
		const res = await axios.get(link);
		setGroups(res.data.data);
	};

	const editUser: Function = async (user: User): Promise<void> => {
		const res = await axios.post(
			`http://192.100.20.167:3000/api/user/update/${user.id}`,
			{
				username: user.username,
				password: user.password,
				role: user.role,
				group: user.group,
			}
		);
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
		const res = await axios.post(`http://192.100.20.167:3000/api/create/user`, {
			username: user.username,
			password: user.password,
			role: user.role,
			group: user.group,
		});

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
		const link = "http://192.100.20.167:3000/api/group/update/" + id;

		const res = await axios.post(link, {
			label: name
		});
		setEditing(false);
		getGroups();
	}

	const addGroup = async (group: Group): Promise<void> => {
		const link = "http://192.100.20.167:3000/api/group/create"
		const res = await axios.post(link, {
			label: group.label
		});
		setEditing(false);
		getGroups();
	}

	const editStudent: Function = async (id: number): Promise<void> => {
		setEditing(true);
		let gs = await api.getAllGroups();
		let g: any = 0;
		for (let i = 0; i < gs.length; i++) {
			console.log(gs[i].id_group);
			let u = await api.funkipunkitrunki(id, gs[i].id_group);
			if (isNaN(u)) {
				console.log("not a number");
			} else {
				g = u;
			}
		}

		console.log(users.filter((user) => user.id === id)[0].username + " group is " + g + "")

		setNewUser({
			id: id,
			username: users.filter((user) => user.id === id)[0].username,
			password: users.filter((user) => user.id === id)[0].password,
			role: users.filter((user) => user.id === id)[0].role,
			group: g,
		});
	}

	const updateStudent: Function = async (id: number): Promise<void> => {
		setEditing(false);
		await api.editUser(newuser);
		resetnewuser();
		getUsers();
	}

	const cancelEdit: Function = async (): Promise<void> => {
		setEditing(false);
		resetnewuser();
	}

	const resetnewuser: Function = async (): Promise<void> => {
		setNewUser({
			id: 0,
			username: "",
			password: "",
			role: 0,
			group: localStorage.getItem('group_id') === null ? "" : localStorage.getItem('group_id')!,
		});
	}

	useEffect(() => {
		getUsers();
		getGroups();
	}, []);

	return (
		<div>
			<h1>Admin</h1>

			{/* Add users */}
			<div className="add-user">
				<h2>Afegir usuari</h2>
				<form>
					<div className="form-group">
						<label>Nom d'usuari:</label>
						<input type="text" name="username" value={newuser.username} onChange={(e) => setNewUser({ ...newuser, username: e.target.value })} />
					</div>

					<div className="form-group">
						<label>Contrasenya:</label>
						<input type="text" name="password" value={newuser.password} onChange={(e) => setNewUser({ ...newuser, password: e.target.value })} />
					</div>

					<div className="form-group">
						<label>Rol:</label>
						<select name="role" value={newuser.role} onChange={(e) => setNewUser({ ...newuser, role: parseInt(e.target.value) })}>
							{/* <option value="1">Admin</option> */}
							<option value="3">Professor</option>
							<option value="4">Estudiant</option>
						</select>
					</div>
				</form>

				<button onClick={() => { addUser(); }}>Afegir</button>
			</div>

			<h2>Tots els grups</h2>
			<table>
				<thead>
					<tr>
						<th>Grup</th>
						<th>Tutor</th>
						<th>Accions</th>
					</tr>
				</thead>
				<tbody>
					{groups.map((group: Group) => {
						return (
							<tr>
								<td>{group.label}</td>
								{/* api.getGroupTutorById(group.id_group) */}
								<td>humongus</td>
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
			<table>
				<thead>
					<tr>
						<th>Nom d'usuari</th>
						<th>Contrasenya</th>
						<th>Rol</th>
						<th>Grup</th>
						<th>Accions</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user: User) => {
						return (
							<tr>
								<td>{user.username}</td>
								<td>{user.password}</td>
								<td>{api.from_id_to_role(user.role)}</td>
								<td>{user.group}</td>
								<td>
									<button onClick={() => { editStudent(user.id) }}>
									Edita
									</button>
									<button onClick={() => {
										// deleteUser(user.id_user);
									}}>
										Suprimeix
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>

			{/* Edit student */}
			{
				editing === true ? (
					<div className="edit-user">
						<h2>Editar usuario</h2>
						<form>
							<label>Username</label>
							<input type="text" name="username" value={newuser.username} onChange={(e) => setNewUser({ ...newuser, username: e.target.value })} />
							<label>Password</label>
							<input type="text" name="password" value={newuser.password} onChange={(e) => setNewUser({ ...newuser, password: e.target.value })} />
							<label>Rol</label>
							<select name="role" value={newuser.role} onChange={(e) => setNewUser({ ...newuser, role: parseInt(e.target.value) })}>
								{/* <option value="1">Admin</option> */}
								<option value="3">Profesor</option>
								<option value="4">Estudiante</option>
							</select>

							<label>Grupo</label>
							<select name="group" value={parseInt(newuser.group)} onChange={(e) => setNewUser({ ...newuser, group: e.target.value })}>
								{groups.map((group: Group) => {
									return (
										<option value={group.id_group}>{group.label}</option>
									)
								})}
							</select>
						</form>

						<button onClick={() => { updateStudent() }}>Guardar</button>
						<button onClick={() => { cancelEdit() }}>Cancelar</button>
					</div>
				) : (
					<div> </div>
				)
			}
		</div>
	);
};

export default Admin;
