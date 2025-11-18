const express = require('express');
const cors = require("cors");
const app = express();
const dadosRoutes = require('./routes/dados');

app.use(cors());
app.use(express.json());

app.use('/dados', dadosRoutes);

app.use((err, req, res, next) => {
   console.log("err:" + err)

  res.status(err.statusCode).send({ message: err.message });
});

app.listen(3000, () => console.log(`O servidor está rodando`));
