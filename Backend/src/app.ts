import config from "./config/config";
import bodyParser from "body-parser";
import express from "express";
import BookRoutes from "./routes/book.routes";
import UserRoutes from "./routes/user.routes";
import cors from "cors";
import cookies from "cookie-parser"
const app  = express();

//CORS
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
    })
);


//Middleware
app.use(cookies());

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());


app.use('/api/books', BookRoutes);
app.use('/api/user', UserRoutes);

app.set('port', config.PORT);


export default app