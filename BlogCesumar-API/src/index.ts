import express, {Request, Response} from "express";
import mysql from "mysql2/promise";

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const connection = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mudar123",
    database: "unicesumar"
});

// Middleware para permitir dados no formato JSON
app.use(express.json());
// Middleware para permitir dados no formato URLENCODED
app.use(express.urlencoded({ extended: true }));

app.get('/users', async function(req:Request, res:Response){
    const [colunas] = await connection.query('SELECT id, nome, email, papel, dt_cadastro FROM users;');
    return res.render('index', {users: colunas});
});

app.listen('5000', () => console.log("Rodando na porta 5000"));