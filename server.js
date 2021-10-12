const express = require('express');
const fileupload = require("express-fileupload");
const mountedRoutes = require('./routes');
const cors = require('cors');
const db = require('./database');
const app = express();

app.set('port', process.env.PORT || 5000);
app.use(express.json());
app.use(cors());

mountedRoutes(app);

app.listen(app.get('port'), () => {
  console.log(`server running on port ${app.get('port')}`);
});

