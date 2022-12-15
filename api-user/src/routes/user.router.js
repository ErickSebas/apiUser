import * as ctrUser from "../controllers/user.controller.js";
import { Router } from "express";

const routerUser = Router ();

//User
routerUser.post("/crear-usuario", ctrUser.crearCuenta);

routerUser.post("/iniciar-sesion", ctrUser.iniciarSesion);

routerUser.get("/getusers", ctrUser.getUsers);

//Venta
routerUser.post("/crear-venta", ctrUser.crearVenta);

//Detalle Venta

export default routerUser;
