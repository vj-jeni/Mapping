const express = require('express')
const conn = require('./db')
const routes = require('./router')

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/cine', routes)

const port = process.env.PORT || 7500;
app.listen(port, ()=> {
    console.log("Server Connected")
});

conn()
.then(() => {
    console.log("Database Connected")
})
.catch((err) => {
    console.log("Connection error:", err)
})