const express = require('express');
const path = require('path');
const app = express();

// Define el puerto
const PORT = 3001;

// Sirve los archivos estáticos de la carpeta "public" o tu carpeta de frontend
app.use(express.static(path.join(__dirname)));

// Ruta para el archivo principal (opcional si quieres redirigir a index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
