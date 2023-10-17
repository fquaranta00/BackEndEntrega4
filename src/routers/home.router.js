import { Router } from 'express';
import ProductManager from '../utils.js';


const router = Router();

// router.get('/', (req, res) => {
//   res.render('home');
// });

// // Endpoint para obtener productos
// router.get('/products', async (req, res) => {
//   try {
//       const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;
//       const products = await ProductManager.getJSONFromFile();

//       if (limit !== null) {
//           res.json(products.slice(0, limit));
//       } else {
//           res.json(products);
//       }
//   } catch (error) {
//       res.status(500).json({ error: error.message });
//   }
// });

router.get('/', async (req, res) => {
  try {
    const products = await ProductManager.getJSONFromFile();
    res.render('home', { products }); // Pasamos los productos como contexto para la vista
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await ProductManager.getJSONFromFile();
    res.render('realTimeProducts', { products }); // Pasamos los productos como contexto para la vista
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



export default router;