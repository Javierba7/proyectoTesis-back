const mongoose = require('mongoose');

const url = 'mongodb+srv://Javier:batman159@cluster0.rrxdi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(url,  {useNewUrlParser: true, useUnifiedTopology: true })
.then(db => {
    console.log('database is connected');
})
.catch(e => {
    console.log(e);
})

module.exports = mongoose;