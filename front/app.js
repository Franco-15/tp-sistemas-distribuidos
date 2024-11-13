const express = require('express');
const path = require('path');
const app = express();


const PORT = 3001;

app.use(express.static(path.join(__dirname)));
console.log(__dirname);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// inicia servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
