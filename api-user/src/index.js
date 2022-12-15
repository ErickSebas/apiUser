import express from "express";
import dotenv from "dotenv";
import routerUser from "./routes/user.router.js";
import exphbs from "express-handlebars";
import morgan from "morgan";
import cors from "cors";



const app = express();
dotenv.config();


app.use(cors({
  origin: '*'
}));

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));


app.get('/', (req, res) => {
  res.send('API USER')
})

app.use(routerUser);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})




