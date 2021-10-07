
const user = require('./userRoutes');

function mountedRoutes(app) {
    app.use('/api/users', user);
};

module.exports = mountedRoutes;