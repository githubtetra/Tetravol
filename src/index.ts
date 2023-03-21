import express from 'express';
import router from './routes/routes';
import cors from 'cors';
import morgam from 'morgan';
import http from 'http';
import ngrok from 'ngrok';
const PORT = 3000;

const app = express();
const server = http.createServer(app);
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(cors());
app.use(morgam('dev'));
app.use(router);

server.listen(PORT, () => {
    console.log(`[server]: Server is running at https://localhost:${PORT}`);
});

(async function () {
    const url = await ngrok.connect({
        addr: PORT,
        authtoken: "2NH23uGCm1SLgcV99MHYWzMgxwD_6TjhcteG2Tb9FMuL3gWNV",
        
    });
    console.log(`[ngrok]: Server is running at ${url}`);
})();