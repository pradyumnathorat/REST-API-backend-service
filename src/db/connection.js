const mongoose = require('mongoose');
const app = require("../app");
const port = 3000;
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/assignment" );



app.listen(port , () => {
    console.log(`listening on port ${port}`);
})