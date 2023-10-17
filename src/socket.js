import { Server } from 'socket.io';
import ProductManager from './utils.js';

let io;

export const init = (httpServer) => {
  io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.log(`Nuevo cliente conectado 🎉 (${socket.id})`);

    socket.on('new-product', async (data) => {
      try {
        console.log('Nuevo producto recibido:', data);
        await ProductManager.addProduct(data);
        const updatedProducts = await ProductManager.getJSONFromFile();
        io.emit('updated-product-list', updatedProducts);
        socket.emit('product-added', 'Producto agregado exitosamente');
      } catch (error) {
        console.error('Error al agregar producto:', error);
        socket.emit('product-add-error', 'Error al agregar el producto');
      }
    });


    //borrar producto
    socket.on('delete-product', async (productId) => {
        try {
          // Eliminar el producto utilizando ProductManager
          await ProductManager.deleteProduct(productId);
    
          // Obtener la lista actualizada de productos y enviarla a todos los clientes
          const updatedProducts = await ProductManager.getJSONFromFile();
          io.emit('updated-product-list', updatedProducts);
    
          // Emitir un mensaje de confirmación
          socket.emit('product-deleted', 'Producto eliminado exitosamente');
        } catch (error) {
          console.error('Error al eliminar producto:', error);
          socket.emit('product-delete-error', 'Error al eliminar el producto');
        }
      });
    
    socket.on('disconnect', () => {
      console.log(`Cliente desconectado (${socket.id}) 😨.`);
    });
  });

  console.log('Server socket running 🚀');
};

