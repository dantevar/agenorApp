const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index');
const ocevidniciRouter = require('./routes/ocevidnici');

const app = express();

// Služi statičke fajlove iz public/ direktorija
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.urlencoded({ extended: true }));
// Root ruta - šalje index.html

app.use('/', indexRouter);
app.use('/', ocevidniciRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server radi na http://localhost:${PORT}`);
});