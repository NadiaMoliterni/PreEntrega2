import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', { products });
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { products });
});

router.post('/createproduct', (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    io.emit("newProduct", newProduct);
    res.send('Producto creado exitosamente');
});

export default router;
