import express from "express";
import handlebars from 'express-handlebars';
import path from 'path';
import productsRouter from "../src/routers/products.router.js";
import cartsRouter from "../src/routers/carts.router.js";
import homeRouter from './routers/home.router.js';
import { __dirname } from './utils.js';

// Configuración Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Configuración Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');


app.use('/', homeRouter);
app.use('/api', productsRouter, cartsRouter);


app.use((error, req, res, next) => {
    const message = `😨 Ah ocurrido un error desconocido: ${error.message}`;
    console.log(message);
    res.status(500).json({ status: 'error', message });
});


export default app;

