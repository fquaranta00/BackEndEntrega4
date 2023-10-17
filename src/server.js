import http from 'http';
import app from './app.js';
import { init } from './socket.js'; // Importa la función init desde el archivo socket.js

const server = http.createServer(app);
const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}/`);
});

init(server); // Inicializa el socket pasando el servidor HTTP
