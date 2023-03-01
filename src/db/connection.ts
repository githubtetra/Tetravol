import pool from 'mysql';

const connection = pool.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ccitub_api'
});

connection.connect((err) => {
    if (err) {
        console.log("[MYSQL-ERROR] " + err.message);
    }
    console.log('[MYSQL] mysql connected');
});

export default connection;