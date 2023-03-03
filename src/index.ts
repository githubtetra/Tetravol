import express from 'express';
import router from './routes/routes';
import cors from 'cors';
import morgam from 'morgan';
import http from 'http';

const app = express();
const PORT = 3000;
const server = http.createServer(app);
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(cors());
app.use(morgam('dev'));
app.use(router);

server.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});