import { Router } from 'express';
import connection from '../db/connection';
import { SendMail } from '../utils/mailer';

const router = Router();

//==================== New routes ====================//

router.get('/api/status', (_req, res) => {
    res.json({ status: 'success', message: 'API Funkando' });
});

//====================== Groups ======================//

// Create group (primary or secondary) //
router.post('/groups/create/:type', (req, res) => {
    const { type } = req.params;
    const { label, id_tutor, id_primary } = req.body;

    console.log(label, id_tutor, id_primary);

    if (!label || !type) {
        res.json({ status: 'error', message: 'Faltan datos' });
        return;
    }

    switch (type) {
        case 'primary':
            connection.query('INSERT INTO groups_primary (label, id_tutor) VALUES (?,?)', [label, id_tutor], (err, _result) => {
                if (err) throw err;
                connection.query('SELECT id FROM groups_primary WHERE label = ?', [label], (err, result) => {
                    if (err) throw err;
                    const id = result[0].id;
                    connection.query('UPDATE user_accounts SET `group` = ? WHERE id = ?', [id, id_tutor], (err, _result) => {
                        if (err) throw err;
                        res.json({ status: 'success', message: 'Grupo creado correctamente' });
                    });
                });
            });
            break;
        case 'secondary':
            connection.query('INSERT INTO groups_secundary (label, id_primary) VALUES (?,?)', [label, id_primary], (err, _result) => {
                if (err) throw err;
                res.json({ status: 'success', message: 'Grupo creado correctamente' });
            });
            break;
    }
});

// Get all groups (primary or secondary) //
router.get('/groups/:type', (req, res) => {
    const { type } = req.params;

    switch (type) {
        case 'primary':
            connection.query('SELECT id, label, id_tutor FROM groups_primary', (err, result) => {
                if (err) throw err;
                res.json({ status: 'success', message: 'Lista de grupos', data: result });
            });
            break;
        case 'secondary':
            connection.query('SELECT id, label FROM groups_secundary', (err, result) => {
                if (err) throw err;
                res.json({ status: 'success', message: 'Lista de grupos', data: result });
            });
            break;
    }
});

// Update group by id (primary or secondary) //
router.post('/groups/update/:type/:id', (req, res) => {
    const { type, id } = req.params;
    const { label, id_tutor } = req.body;

    if (!label || !type) {
        res.json({ status: 'error', message: 'Faltan datos' });
        return;
    }

    switch (type) {
        case 'primary':
            connection.query('UPDATE groups_primary SET label = ?, id_tutor = ? WHERE id = ?', [label, id_tutor, id], (err, _result) => {
                if (err) throw err;
                res.json({ status: 'success', message: 'Grupo actualizado correctamente' });
            });
            break;
        case 'secondary':
            connection.query('UPDATE groups_secundary SET label = ? WHERE id = ?', [label, id], (err, _result) => {
                if (err) throw err;
                res.json({ status: 'success', message: 'Grupo actualizado correctamente' });
            });
            break;
    }
});

// Get group by id (primary or secondary) //
router.get('/groups/:type/:id', (req, res) => {
    const { type, id } = req.params;

    switch (type) {
        case 'primary':
            connection.query('SELECT id, label, id_tutor FROM groups_primary WHERE id = ?', [id], (err, result) => {
                if (err) throw err;
                res.json({ status: 'success', message: 'Grupo', data: result[0] });
            });
            break;
        case 'secondary':
            connection.query('SELECT id, label FROM groups_secundary WHERE id = ?', [id], (err, result) => {
                if (err) throw err;
                res.json({ status: 'success', message: 'Grupo', data: result[0] });
            });
            break;
    }
});

//====================================================//

//===================== Usuarios =====================//

// Create user //
router.post('/users/register', async (req, res) => {
    const { name, lastname, email, group, subgroup, role } = req.body;

    if (!name || !lastname || !email || !group || !role) {
        res.json({ status: 'error', message: 'Faltan datos' });
        return;
    }

    function generatePassword(log_pass: number): string {
        let password = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < log_pass; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return password;
    }

    let passwordGen: any = await generatePassword(6)

    SendMail(email, name, passwordGen, email);

    connection.query('SELECT * FROM user_accounts WHERE email = ?', [email], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json({ status: 'error', message: 'El usuario ya existe' });
            return;
        } else {
            connection.query('INSERT INTO user_accounts (name, lastname, email, password, `group`, subgroup, `role`) VALUES (?,?,?,?,?,?,?)', [name, lastname, email, passwordGen, group, subgroup, role], (err, _result) => {
                if (err) throw err;
                res.json({ status: 'success', message: 'Usuario creado correctamente' });
            });
        }
    });
});

// Reset password //
router.post('/users/reset/:id', async (req, res) => {
    const { id } = req.params;

    function generatePassword(log_pass: number): string {
        let password = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < log_pass; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return password;
    }

    let passwordGen: any = await generatePassword(6)
    let data: any = [];

    connection.query('SELECT email, name FROM user_accounts WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            data = result[0];
            connection.query('UPDATE user_accounts SET password = ? WHERE id = ?', [passwordGen, id], (err, _result) => {
                if (err) throw err;
                SendMail(data.email, data.name, passwordGen, data.email);
                res.json({ status: 'success', message: 'Contraseña actualizada correctamente' });
            });
        }
    });
});

// Get all users //
router.get('/users', (_req, res) => {
    connection.query('SELECT id, name,lastname, email, `group`, subgroup, `role` FROM user_accounts', (err, result) => {
        if (err) throw err;
        res.json({ status: 'success', message: 'Lista de usuarios', data: result });
    });
});

// Get user by id //
router.get('/users/:id', (req, res) => {
    const { id } = req.params;

    connection.query('SELECT id, name, lastname, email, `group`, subgroup, `role` FROM user_accounts WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.json({ status: 'success', message: 'Usuario', data: result[0] });
    });
});

// Update user by id //
router.post('/users/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, lastname, email, group, subgroup, role } = req.body;

    if (!name || !lastname || !email || !group || !role) {
        res.json({ status: 'error', message: 'Faltan datos' });
        return;
    }

    connection.query('UPDATE user_accounts SET name = ?, lastname = ?, email = ?, `group` = ?, subgroup = ?, `role` = ? WHERE id = ?', [name, lastname, email, group, subgroup, role, id], (err, _result) => {
        if (err) throw err;
        res.json({ status: 'success', message: 'Usuario actualizado correctamente' });
    });
});

// Delete user by id //
router.post('/users/delete/:id', (req, res) => {
    const { id } = req.params;

    connection.query('SELECT * FROM user_accounts WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            res.json({ status: 'error', message: 'El usuario no existe' });
            return;
        } else if (result[0].role === 2) {
            res.json({ status: 'error', message: 'No se puede eliminar un administrador' });
            return;
        }
    });


    connection.query('DELETE FROM user_levels WHERE id = ?', [id], (err, _result) => {
        if (err) throw err;
        connection.query('DELETE FROM user_accounts WHERE id = ?', [id], (err, _result) => {
            if (err) throw err;
            res.json({ status: 'success', message: 'Usuario eliminado correctamente' });
        });
    });
});

// Login //
router.post('/users/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.json({ status: 'error', message: 'Faltan datos' });
        return;
    }

    connection.query('SELECT id,name,lastname,email,`group`,subgroup,`role` FROM user_accounts WHERE email = ? AND password = ?', [email, password], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            // res.json({ status: 'error', message: 'Usuario o contraseña incorrectos' });
            res.status(401).json({ status: 'error', message: 'Usuario o contraseña incorrectos' });
            return;
        } else {
            let data = result[0];
            connection.query('SELECT * FROM user_levels WHERE id = ?', [data.id], (err, result) => {
                if (err) throw err;
                if (result.length === 0) {
                    connection.query('INSERT INTO user_levels (id) VALUES (?)', [data.id], (err, _result) => {
                        if (err) throw err;
                        console.log('Niveles creados');
                        res.json({
                            status: 'success', message: 'Bienvenido', data: data, "levels": { "id": data.id, "level_1": 1, "level_2": 0, "level_3": 0 }
                        });
                    });
                } else {
                    res.json({ status: 'success', message: 'Bienvenido', data: data, levels: result[0] });
                }
            });
        }
    });
});

//====================================================//

//===================== Niveles =====================//

// Update level //
router.post('/levels/update/:level/:id', (req, res) => {
    const { level, id } = req.params;

    switch (level) {
        case "1":
            connection.query('UPDATE user_levels SET level_1 = 1 WHERE id = ?', [id], (err, _result) => {
                if (err) throw err;
                res.json({ status: 'success', message: 'Nivel 1 desbloqueado' });
            });
            break;
        case "2":
            connection.query('UPDATE user_levels SET level_2 = 1 WHERE id = ?', [id], (err, _result) => {
                if (err) throw err;
                res.json({ status: 'success', message: 'Nivel 2 desbloqueado' });
            });
            break;
        case "3":
            connection.query('UPDATE user_levels SET level_3 = 1 WHERE id = ?', [id], (err, _result) => {
                if (err) throw err;
                res.json({ status: 'success', message: 'Nivel 3 desbloqueado' });
            });
            break;
    }
});

// Get level by id //
router.get('/levels/:id', (req, res) => {
    const { id } = req.params;

    connection.query('SELECT * FROM user_levels WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.json({ status: 'success', message: 'Niveles', data: result[0] });
    });
});

// Reset levels //
router.post('/levels/reset/:id', (req, res) => {
    const { id } = req.params;

    connection.query('UPDATE user_levels SET level_1 = 1, level_2 = 0, level_3 = 0 WHERE id = ?', [id], (err, _result) => {
        if (err) throw err;
        res.json({ status: 'success', message: 'Niveles reiniciados' });
    });
});

//====================================================//

//=================== Gestion Grupos =================//

// Get groups //
router.get('/group/:id', (req, res) => {
    const { id } = req.params;
    let teacher_list: any = [];

    connection.query('SELECT id,NAME,lastname,email,`role`,`group`,subgroup FROM user_accounts WHERE subgroup = ? AND `role` = 3', [id], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            res.json({ status: 'error', message: 'No hay profesores' });
            return;
        } else {
            teacher_list = result;
            connection.query('SELECT id,NAME,lastname,email,`role`,`group`,subgroup FROM user_accounts WHERE subgroup = ? AND `role` = 4', [id], (err, result) => {
                if (err) throw err;
                if (result.length === 0) {
                    res.json({ status: 'error', message: 'No hay alumnos' });
                    return;
                } else {
                    res.json({ status: 'success', message: 'Lista de grupo', teachers: teacher_list, students: result });
                }
            });
        }
    });
});

// Get group by type //
router.get('/group/:type/:id', (req, res) => {
    const { id, type } = req.params;

    switch (type) {
        case "teacher":
            connection.query('SELECT id,NAME,lastname,email,`role`,`group`,subgroup FROM user_accounts WHERE subgroup = ? AND `role` = 3', [id], (err, result) => {
                if (err) throw err;
                if (result.length === 0) {
                    res.json({ status: 'error', message: 'No hay profesores' });
                    return;
                } else {
                    res.json({ status: 'success', message: 'Lista de profesores', teachers: result });
                }
            });
            break;
        case "student":
            connection.query('SELECT id,NAME,lastname,email,`role`,`group`,subgroup FROM user_accounts WHERE subgroup = ? AND `role` = 4', [id], (err, result) => {
                if (err) throw err;
                if (result.length === 0) {
                    res.json({ status: 'error', message: 'No hay alumnos' });
                    return;
                } else {
                    res.json({ status: 'success', message: 'Lista de alumnos', students: result });
                }
            });
            break;
    }
});

// Get group by id //
router.post('/group/tutor/:id', (req, res) => {
    const { id } = req.params;
    let data: any = [];
    let data2: any = [];

    connection.query('SELECT id,NAME,lastname,email,`role`,`group`,`subgroup` FROM user_accounts WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            res.json({ status: 'error', message: 'No existe el usuario' });
            return;
        } else {
            data = result[0];
            connection.query('SELECT id,label FROM groups_primary WHERE id_tutor = ?', [data.id], (err, result) => {
                if (err) throw err;
                if (result.length === 0) {
                    res.json({ status: 'error', message: 'No es tutor' });
                    return;
                } else {
                    data2 = result[0];
                    connection.query('SELECT id,label FROM groups_secundary WHERE id_primary = ?', [data2.id], (err, result) => {
                        if (err) throw err;
                        if (result.length === 0) {
                            res.json({ status: 'error', message: 'No tiene grupos' });
                            return;
                        } else {
                            res.json({ status: 'success', message: 'Tutor', data: data, group: result });
                        }
                    });
                }
            });
        }
    });
});

//====================================================//

//====================== Foro ========================//

router.post('/forum/send', (req, res) => {
    const { username_id, message, id_subgroup } = req.body;

    if (!username_id || !message || !id_subgroup) {
        res.json({ status: 'error', message: 'Faltan datos' });
        return;
    }

    connection.query('SELECT id FROM user_accounts WHERE id = ?', [username_id], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            res.json({ status: 'error', message: 'No existe el usuario' });
            return;
        } else {
            connection.query('SELECT id FROM groups_secundary WHERE id = ?', [id_subgroup], (err, result) => {
                if (err) throw err;
                if (result.length === 0) {
                    res.json({ status: 'error', message: 'No existe el grupo' });
                    return;
                } else {
                    // ✅ Defining a reusable function
                    function padTo2Digits(num: number) {
                        return num.toString().padStart(2, '0');
                    }

                    // 👇️ format as "YYYY-MM-DD hh:mm:ss"
                    // You can tweak the format easily
                    function formatDate(date: Date) {
                        return (
                            [
                                date.getFullYear(),
                                padTo2Digits(date.getMonth() + 1),
                                padTo2Digits(date.getDate()),
                            ].join('-') +
                            ' ' +
                            [
                                padTo2Digits(date.getHours()),
                                padTo2Digits(date.getMinutes()),
                                padTo2Digits(date.getSeconds()),
                            ].join(':')
                        );
                    }

                    const date = formatDate(new Date());

                    connection.query('INSERT INTO foro_messages (username_id, message, id_subgroup, `time`) VALUES (?,?,?,?)', [username_id, message, id_subgroup, date], (err, _result) => {
                        if (err) throw err;
                        res.json({ status: 'success', message: 'Mensaje enviado' });
                    });
                }
            });
        }
    });
});

router.get('/forum/:id', (req, res) => {
    const { id } = req.params;

    connection.query('SELECT foro_messages.id,user_accounts.id AS id_user, user_accounts.name,user_accounts.lastname,message,`time` FROM foro_messages INNER JOIN user_accounts ON foro_messages.username_id = user_accounts.id WHERE foro_messages.id_subgroup = ? LIMIT 100', [id], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            res.json({ status: 'error', message: 'No hay mensajes' });
            return;
        } else {
            res.json({ status: 'success', message: 'Mensajes', data: result });
        }
    });
});

router.post('/forum/delete/:id', (req, res) => {
    const { id } = req.params;

    connection.query('SELECT id FROM foro_messages WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            res.json({ status: 'error', message: 'No existe el mensaje' });
            return;
        } else {
            connection.query('DELETE FROM foro_messages WHERE id = ?', [id], (err, _result) => {
                if (err) throw err;
                res.json({ status: 'success', message: 'Mensaje eliminado' });
            });
        }
    });
});

//====================================================//

//====================== Quests ======================//

router.post('/quests/create', (req, res) => {
    const { id_group, label, active } = req.body;

    if (!id_group || !label || !active) {
        res.json({ status: 'error', message: 'Faltan datos' });
        return;
    }

    connection.query('SELECT id FROM groups_primary WHERE id = ?', [id_group], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            res.json({ status: 'error', message: 'No existe el grupo' });
            return;
        } else {
            connection.query('INSERT INTO quest (id_group, label, status) VALUES (?,?,?)', [id_group, label, active], (err, _result) => {
                if (err) throw err;
                res.json({ status: 'success', message: 'Misión creada' });
            });
        }
    });
});

router.get('/quests/:id', (req, res) => {
    const { id } = req.params;

    connection.query('SELECT * FROM quest WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            res.json({ status: 'error', message: 'No hay misiones' });
            return;
        } else {
            res.json({ status: 'success', message: 'Misiones', data: result[0] });
        }
    });
});

router.post('/quests/delete/:id', (req, res) => {
    const { id } = req.params;

    connection.query('SELECT id FROM quest WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            res.json({ status: 'error', message: 'No existe la misión' });
            return;
        } else {
            connection.query('DELETE FROM quest WHERE id = ?', [id], (err, _result) => {
                if (err) throw err;
                res.json({ status: 'success', message: 'Misión eliminada' });
            });
        }
    });
});

router.post('/quests/suscribe/group', (req, res) => {
    const { id_group, id_quest } = req.body;

    if (!id_group || !id_quest) {
        res.json({ status: 'error', message: 'Faltan datos' });
        return;
    }

    connection.query('SELECT id FROM groups_primary WHERE id = ?', [id_group], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            res.json({ status: 'error', message: 'No existe el grupo' });
            return;
        } else {
            connection.query('SELECT id FROM quest WHERE id = ?', [id_quest], (err, result) => {
                if (err) throw err;
                if (result.length === 0) {
                    res.json({ status: 'error', message: 'No existe la misión' });
                    return;
                } else {
                    connection.query('INSERT INTO quest_groups (id_group, id_quest) VALUES (?,?)', [id_group, id_quest], (err, _result) => {
                        if (err) throw err;
                        res.json({ status: 'success', message: 'Misión suscrita' });
                    });
                }
            });
        }
    });
});

router.get('/quests/get/:type', (req, res) => {
    const { type } = req.params;

    switch (type) {
        case 'quests':
            connection.query('SELECT * FROM quest', (err, result) => {
                if (err) throw err;
                if (result.length === 0) {
                    res.json({ status: 'error', message: 'No hay misiones' });
                    return;
                } else {
                    res.json({ status: 'success', message: 'Misiones', data: result });
                }
            });
            break;
        case 'groups':
            connection.query('SELECT * FROM quest_groups', (err, result) => {
                if (err) throw err;
                if (result.length === 0) {
                    res.json({ status: 'error', message: 'No hay misiones' });
                    return;
                } else {
                    res.json({ status: 'success', message: 'Misiones', data: result });
                }
            });
            break;
        default:
    }
});

router.post('/quests/update', (req, res) => {
    const { id_group, id_quest, status } = req.body;

    console.log("id_group: " + id_group + " id_quest: " + id_quest + " status: " + status);

    connection.query('SELECT id FROM quest_groups WHERE id_group = ? AND id_quest = ?', [id_group, id_quest], (err, result) => {
        if (err) throw err;
        if (result.length <= 0) {
            connection.query('INSERT INTO quest_groups (id_group, id_quest, status) VALUES (?,?,?)', [id_group, id_quest, status], (err, _result) => {
                if (err) throw err;
                res.json({ status: 'success', message: 'Misión creada' });
                return;
            });
        } else if (result.length > 0) {
            connection.query('UPDATE quest_groups SET status = ? WHERE id = ?', [status, result[0].id], (err, _result) => {
                if (err) throw err;
                res.json({ status: 'success', message: 'Misión actualizada' });
                return;
            });
        }
    });
});

router.get('/quests/get/activity/:id_subgroup/:id_quest', (req, res) => {
    const { id_subgroup, id_quest } = req.params;

    connection.query('SELECT * FROM groups_secundary WHERE id = ?', [id_subgroup], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            res.json({ status: 'error', message: 'No hay actividades' });
            return;
        }
        connection.query('SELECT quest_activity_status.id,quest_activity_status.`status`,quest_activity.title,quest_activity.description,quest_activity.id AS id_actividad FROM quest_activity_status INNER JOIN quest_activity ON quest_activity_status.id_quest = quest_activity.id WHERE quest_activity_status.id_subgroup = ? AND quest_activity_status.`id activity` = ?', [id_subgroup, id_quest], (err, result) => {
            if (err) throw err;
            if (result.length === 0) {
                res.json({ status: 'error', message: 'No hay actividades' });
                return;
            } else {
                res.json({ status: 'success', message: 'Actividades', data: result });
            }
        });
    });
});

router.post('/quests/update/activity', (req, res) => {
    const { id_subgroup, id_quest, status } = req.body;

    console.log("=================================== id_subgroup: " + id_subgroup + " id_quest: " + id_quest + " status: " + status);
    
    connection.query('SELECT id FROM quest_activity_status WHERE id_subgroup = ? AND id_quest = ?', [id_subgroup, id_quest], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            connection.query('UPDATE quest_activity_status SET status = ? WHERE id = ?', [status, result[0].id], (err, _result) => {
                if (err) throw err;
                res.json({ status: 'success', message: 'Actividad actualizada' });
                return;
            });
        } else if (result.length <= 0) {
            res.json({ status: 'error', message: 'No existe la actividad' });
            return;
        }
    });
});

//====================================================//

export default router;