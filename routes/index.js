const user = require('./userRoutes');
const products = require('./productsRoute');

function mountedRoutes(app) {
    app.use('/api/users', user);
    app.use('/api/product', products);
};

module.exports = mountedRoutes;