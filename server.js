const express = require('express');
const mountedRoutes = require('./routes');
const db = require('./database');
const app = express();

app.set('port', process.env.PORT || 5000);
app.use(express.json());

mountedRoutes(app);

app.listen(app.get('port'), () => {
  console.log(`server running on port ${app.get('port')}`);
});

