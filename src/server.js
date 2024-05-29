import express from "express";
import handlebars from "express-handlebars";
import http from "http";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import routes from "./routes/routes.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.engine("handlebars", handlebars());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use('/', routes(io));

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});




// import express from "express";
// import handlebars from "express-handlebars";
// import http from "http";
// import { __dirname } from "./utils.js";
// import { Server } from "socket.io";

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// app.use(express.json());
// app.use(express.static(__dirname + '/public'));

// const products = [
//     {
//         "id": "1535ae88-7825-44b0-bd91-8791c42022ad",
//         "status": true,
//         "title": "Mate Moli 2",
//         "description": "color borgoña",
//         "code": "6655",
//         "price": 2000,
//         "stock": 20,
//         "category": "XL"
//     },
//     {
//         "id": "431d2cf8-522d-4fcd-8dd9-4e35b0a7bf05",
//         "status": true,
//         "title": "Mate Moli 1",
//         "description": "color verde",
//         "code": "6699",
//         "price": 2000,
//         "stock": 20,
//         "category": "XL"
//     },
//     {
//         "id": "8af7d6e1-c929-46c5-af61-0ecf27c008b5",
//         "status": true,
//         "title": "Mate Moli Map",
//         "description": "color blanco",
//         "code": "9980",
//         "price": 2000,
//         "stock": 20,
//         "category": "map"
//     },
//     {
//         "id": "03a6d513-f55f-4ac1-8a07-886c68f97aba",
//         "status": true,
//         "title": "Mate Moli P",
//         "description": "color blanco",
//         "code": "9900",
//         "price": 2000,
//         "stock": 20,
//         "category": "personalizado"
//     },
//     {
//         "id": "54c1a7ec-e4ea-42f3-b0bc-f39779f912ef",
//         "status": true,
//         "title": "Mate Arg Campeon 2",
//         "description": "color negro",
//         "code": "4457",
//         "price": 2000,
//         "stock": 20,
//         "category": "campeon"
//     },
//     {
//         "id": "73b0e329-7316-4e79-87b1-eb31ef10ea7d",
//         "status": true,
//         "title": "Mate Arg Campeon 1",
//         "description": "color azul",
//         "code": "4458",
//         "price": 2000,
//         "stock": 20,
//         "category": "campeon"
//     }
// ];

// app.engine("handlebars", handlebars());
// app.set("views", `${__dirname}/views`);
// app.set("view engine", "handlebars");

// app.get('/', (req, res) => {
//     res.render('home', { products });
// });

// // ruta para la vista de productos en tiempo real
// app.get('/realtimeproducts', (req, res) => {
//     res.render('realTimeProducts', { products });
// });

// io.on("connection", (socket) => {
//     console.log(`Cliente conectado: ${socket.id}`);

//     socket.on("disconnect", () => {
//         console.log(`Cliente desconectado: ${socket.id}`);
//     });

//     //nuevos productos
//     socket.on("newProduct", (product) => {
//         products.push(product);
//         //lista actualizada de productos
//         io.emit("products", products);
//     });

// });

// app.post('/createproduct', (req, res) => {
//     const newProduct = req.body; // Suponiendo que los datos del producto se envían en el cuerpo de la solicitud POST
//     //agrega el nuevo producto a la lista de productos
//     products.push(newProduct);
//     //informa sobre el nuevo producto
//     io.emit("newProduct", newProduct);
//     res.send('Producto creado exitosamente');
// });

// const PORT = process.env.PORT || 8080;
// server.listen(PORT, () => {
//     console.log(`Servidor escuchando en el puerto ${PORT}`);
// });
