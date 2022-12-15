import bcrypt from "bcrypt";
const saltRounds = 10;
import admin from "firebase-admin";
import serviceAccount from "../../node-firebase-usuarios-firebase-adminsdk-hdxlq-70b0fb0713.json" assert { type: "json" };

//var serviceAccount = require("../../node-firebase-usuarios-firebase-adminsdk-hdxlq-70b0fb0713.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://node-firebase-usuarios-default-rtdb.firebaseio.com/'
});

const db =admin.database();

export async function crearCuenta(req, res){
    
    try {
        //Verificar
        var Id = 0;
        var si = 0;
        db.ref('users').once('value', (snapshot)=>{
            var conta = 0;
            
            snapshot.forEach(element => {
                if(element.val().email == req.body.email){
                    conta++;
                }
                Id = element.val().id_user;
            });

            if(conta>0){
                si++;
            }

            if(si==0){
                const {id_user, first_name, last_name, email, password, passwordConfirm} = req.body;
    
                    if(password == passwordConfirm){
                        //Encryptar la clave
                        //const hashed = await bcrypt.hash (password, saltRounds);
                        
                        const newUser = {
                            id_user: Id + 1,
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            email: req.body.email,
                            password: req.body.password
                        };
        
                        db.ref('users').push(newUser);
                        res.json({isOk: true, msj: "Usuario almacenado"})
                    }else{
                        //Enviar mensaje de error
                        res.json({isOk: false, msj: "La contraseña y su confirmación no coinciden"})
                    }
                }else{
                    res.json({isOk: false, msj: "Email Existente"})
                }
                
            });
        
    } catch (error) {
        
    }

}


export function iniciarSesion(req, res){
    try {
        console.log(req.body);
        db.ref('users').once('value', (snapshot)=>{
            const data = snapshot.val();
            var conta = 0;
            var id_user;
            var fname;
            var lname;
            
            snapshot.forEach(element => {
                if(element.val().email == req.body.email&& element.val().password==req.body.password){
                    conta++;
                    fname = element.val().first_name;
                    lname = element.val().last_name;
                    id_user = element.val().id_user;
                }
            });

            if(conta>0){
                console.log(lname)
                res.json({isOk: true, id_usuario: id_user, email: req.body.email, first_name: fname, last_name : lname})
                
            }else{
                res.json({isOk: false, msj: "La contraseña o email incorrectos"})
            }    
        });
    } catch (error) {
        
    }
}

export function getUsers(req, res){
    try {

        db.ref('users').once('value', (snapshot)=>{
            const data = snapshot.val();
            res.json({users: data})
        });
    } catch (error) {
        
    }
}

export async function crearVenta(req, res){
    
    try {
        //Verificar
        var Id = 0;
        var productsall;
        db.ref('venta').once('value', (snapshot)=>{
            
            snapshot.forEach(element => {
                Id = element.val().id_venta;
            });

            const {id_user, total, products} = req.body;
            const newVenta = {
                id_venta: Id + 1,
                id_user: req.body.id_user,
                total: req.body.total
            };

            db.ref('venta').push(newVenta);
            res.json({isOk: true, msj: "Venta almacenado"});
        
            for(var product in products){
                console.log(product);
                const newDetalleVenta = {
                    id_product: product.id_product,
                    id_venta: newVenta.id_venta,
                    precio: product.precio,
                    cantidad: product.cantidad,
                    subtotal: product.subtotal,
                    descuento: product.descuento
                };


                db.ref('detalle_venta').push(newDetalleVenta);
                res.json({isOk: true, msj: "Detalle Venta almacenado"});
            }
        })
        
    } catch (error) {
        
    }
}
