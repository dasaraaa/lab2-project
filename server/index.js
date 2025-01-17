const express = require("express")
const app = express()
const mongoose  = require("mongoose");
const port = process.env.PORT || 5000
require('dotenv').config();



async function main() {
    await mongoose.connect(process.env.DB_URL)
    app.use("/" , (req,res) => {
        res.send("Hello world!")
    })
}
// dion2006.
main().then(() => console.log("MongoDB connected successfully!")).catch(err => console.log(err));
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})