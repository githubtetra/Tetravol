import { Router } from 'express';
import connection from '../db/connection';

const router = Router();

router.get('/api/status', (_req, res) => {
    res.json({ status: 'success', message: 'API Funkando' });
});

router.post('/api/create/user', (req, res) => {
    const { username, password, role, group } = req.body;

    connection.query('INSERT INTO user_accounts (username, password, role, `group`) VALUES (?, ?, ?, ?)', [username, password, role, group], (err, _result) => {
        if (err) throw err;
        res.json({ status: 'success', message: 'Usuário creado correctamente' });
    });
});

router.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    let data;

    await connection.query('SELECT id,username,role,`group` FROM user_accounts WHERE username = ? AND password = ?', [username, password], async (err, result) => {
        if (err)
            throw err;
        if (result.length > 0) {
            data = result[0];

            let Id = data.id;

            await connection.query('SELECT * FROM user_levels WHERE id = ?', [Id], (err, result) => {
                if (err) throw err;
                if (result.length > 0) {
                    console.log('Nivel de usuario ya creado');

                } else {
                    connection.query('INSERT INTO user_levels (id) VALUES (?)', [Id], (err, _result) => {
                        if (err) throw err;
                        console.log('Nivel de usuario creado');
                    });
                }
            });
            res.json({ status: 'success', message: 'Login realizado correctamente', data: data });
        } else {
            res.status(401).json({ status: 'error', message: 'Credenciales incorrectas' });
        }
    });
});

router.get('/api/users', (_req, res) => {
    connection.query('SELECT id,username,role,password,label AS `group`,id_group FROM user_accounts INNER JOIN user_groups ON user_accounts.`group` = user_groups.id_group ORDER BY `role`', (err, result) => {
        if (err) throw err;
        res.json({ status: 'success', message: 'Lista de usuarios', data: result });
    });
});

router.get('/api/users/:type', (req, res) => {
    const { type } = req.params;
    
    switch (type) {
        case 'teacher':
            connection.query('SELECT id,username,role,password,`group` FROM user_accounts WHERE role = 3', (err, result) => {
                if (err) throw err;
                res.json({ status: 'success', message: 'Lista de profesores', data: result });
            });
            break;
        case 'student':
            connection.query('SELECT id,username,role,password,`group` FROM user_accounts WHERE role = 4', (err, result) => {
                if (err) throw err;
                res.json({ status: 'success', message: 'Lista de estudiantes', data: result });
            });
            break;
            case 'group':
                connection.query('SELECT * FROM user_groups ORDER BY id_group', (err, result) => {
                    if (err) throw err;
                    res.json({ status: 'success', message: 'Lista de grupos', data: result });
                });
                break;
        default:
            break;
    }
});

// router.get('/api/users/teacher', (_req, res) => {
//     connection.query('SELECT id,username,role,password,`group` FROM user_accounts WHERE role = 3', (err, result) => {
//         if (err) throw err;
//         res.json({ status: 'success', message: 'Lista de profesores', data: result });
//     });
// });

// router.get('/api/users/student', (_req, res) => {
//     connection.query('SELECT id,username,role,password,`group` FROM user_accounts WHERE role = 4', (err, result) => {
//         if (err) throw err;
//         res.json({ status: 'success', message: 'Lista de estudiantes', data: result });
//     });
// });

// router.get('/api/users/group', (_req, res) => {
//     connection.query('SELECT * FROM user_groups ORDER BY id_group', (err, result) => {
//         if (err) throw err;
//         res.json({ status: 'success', message: 'Lista de grupos', data: result });
//     });
// });

router.post('/api/group/create', (req, res) => {
    const { label } = req.body;

    connection.query('INSERT INTO user_groups (label) VALUES (?)', [label], (err, _result) => {
        if (err) throw err;
        res.json({ status: 'success', message: 'Grupo creado correctamente' });
    });
});

router.post('/api/group/update/:id', (req, res) => {
    const { id } = req.params;
    const { label } = req.body;

    connection.query('UPDATE user_groups SET label = ? WHERE id_group = ?', [label, id], (err, _result) => {
        if (err) throw err;
        res.json({ status: 'success', message: 'Grupo actualizado correctamente' });
    });
});

router.post('/api/users/group/delete/:id', (req, res) => {
    const { id } = req.params;

    connection.query('DELETE FROM user_groups WHERE id_group = ?', [id], (err, _result) => {
        if (err) throw err;
        res.json({ status: 'success', message: 'Grupo eliminado correctamente' });
    });
});

router.post('/api/users/group/:id', (req, res) => {
    const { id } = req.params;
    let data: any = [];

    connection.query('SELECT id,username,role,password,`group` FROM user_accounts WHERE `group` = ? AND role = 4', [id], (err, result) => {
        if (err) throw err;
        data = result;
        connection.query('SELECT id,username,role,password,`group` FROM user_accounts WHERE `group` = ? AND role = 3', [id], (err, result1) => {
            if (err) throw err;
            res.json({ status: 'success', message: 'Lista de usuarios en grupo', data: data, "teacher": result1[0] });
        });
    });
});

router.post('/api/get/group/id', (req, res) => {
    const { label } = req.body;

    console.log(label);

    connection.query('SELECT id_group FROM user_groups WHERE label = ?', [label], (err, result) => {
        if (err) throw err;
        console.log(result[0]);
        res.json(result[0]);
    });
});

router.get('/api/get/teacher', (_req, res) => {
    connection.query('SELECT id,username,role,`group` FROM user_accounts WHERE role = 3', (err, result) => {
        if (err) throw err;
        res.json({ status: 'success', message: 'Profesor encontrado', data: result });
    });
});

router.post('/api/get/group/:id', (req, res) => {
    const { id } = req.params;

    connection.query('SELECT label FROM user_groups WHERE id_group = ?', [id], (err, result) => {
        if (err) throw err;
        res.json({ status: 'success', message: 'Grupo encontrado', data: result[0] });
    });
});

router.get('/api/user/:id', (req, res) => {
    const { id } = req.params;

    connection.query('SELECT id,username,role,group FROM user_accounts WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.json({ status: 'success', message: 'Usuario encontrado', data: result[0] });
    });
});

router.post('/api/user/update/:id', (req, res) => {
    const { id } = req.params;
    const { username, password, role, group } = req.body;
    let group_id: any;

    connection.query('UPDATE user_accounts SET username = ?, password = ?, role = ?, `group` = ? WHERE id = ?', [username, password, role, group, id], (err, _result) => {
        if (err) {
            connection.query('SELECT id_group FROM user_groups WHERE label = ?', [group], (err, result) => {
                if (err) throw err;
                group_id = result[0];
                connection.query('UPDATE user_accounts SET username = ?, password = ?, role = ?, `group` = ? WHERE id = ?', [username, password, role, group_id.id_group, id], (err, _result) => {
                    if (err) throw err;
                    return console.log('Usuario actualizado correctamente');
                });
            });
        }
        res.json({ status: 'success', message: 'Usuario actualizado correctamente' });
    });
});

router.post('/api/user/delete/:id', async (req, res) => {
    const { id } = req.params;

    await connection.query('DELETE FROM user_levels WHERE id = ?', [id], (err, _result) => { if (err) throw err; });

    await connection.query('DELETE FROM user_accounts WHERE id = ?', [id], (err, _result) => { if (err) throw err; });

    res.json({ status: 'success', message: 'Usuario eliminado correctamente' });
});

router.post('/api/user/level_1/update/:id', (req, res) => {
    const { id } = req.params;

    connection.query('UPDATE user_levels SET level_1 = 1 WHERE id_user = ?', [id], (err, _result) => {
        if (err) throw err;
        res.json({ status: 'success', message: 'Nivel 1 actualizado correctamente' });
    });
});

router.post('/api/user/level_2/update/:id', (req, res) => {
    const { id } = req.params;

    connection.query('UPDATE user_levels SET level_2 = 1 WHERE id_user = ?', [id], (err, _result) => {
        if (err) throw err;
        res.json({ status: 'success', message: 'Nivel 2 actualizado correctamente' });
    });
});

router.post('/api/user/level_3/update/:id', (req, res) => {
    const { id } = req.params;

    connection.query('UPDATE user_levels SET level_3 = 1 WHERE id_user = ?', [id], (err, _result) => {
        if (err) throw err;
        res.json({ status: 'success', message: 'Nivel 3 actualizado correctamente' });
    });
});

router.post('/api/levels/reset/:id', (req, res) => {
    const { id } = req.params;

    connection.query('UPDATE user_levels SET level_1 = 1, level_2 = 0, level_3 = 0 WHERE id_user = ?', [id], (err, _result) => {
        if (err) throw err;
        res.json({ status: 'success', message: 'Niveles reseteados correctamente' });
    });
});

export default router;