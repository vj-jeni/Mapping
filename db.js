const mongoose = require('mongoose')
const db = "mongodb://localhost:27017/cine_db"

module.exports = () => {
    return mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}