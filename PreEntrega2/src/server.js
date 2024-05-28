import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js"
import { Server } from "socket.io"

const app = express();
app.use(express.json())
app.use(express.static(__dirname + '/public'))

app.get("/", (req, res) => {
    res.render('websocket');
})

app.engine("handlebars", handlebars.engine()) //iniciamos
app.set("views", `${__dirname}/views`) //decimos donde va a estar
app.set("view engine", "handlebars") //seteamos motor de plantilla


const httpServer = app.listen(8080, () => {
    console.log("Escuchando en el puerto 8080")
})

const socketServer = new Server(httpServer)

const products = [];

socketServer.on("connection", (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log('Usuario desconectado');
    })

    socket.emit("saludoDesdeBack", "bienvenido");

    socket.on("respuestaDesdeFront", (mesagge) => {
        console.log(mesagge);
    })

    socket.on("newProduct", (product) => {
        products.push(product);
        socketServer.emit("products", products);     //emite array c el prod nuevo agregado
    })

})

