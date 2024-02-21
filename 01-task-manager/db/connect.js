const mongoose = require('mongoose');

const dbConnect = (mongoUrl) => {
    return mongoose.connect(mongoUrl).then(() => console.log('DB Connected')).catch(e => console.log(e)) ;
}

module.exports = dbConnect;